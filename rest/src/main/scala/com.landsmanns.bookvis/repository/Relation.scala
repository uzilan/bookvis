package com.landsmanns.bookvis.repository

import com.google.gson.{JsonObject, JsonSerializationContext, JsonSerializer}
import java.lang.reflect.Type
import com.landsmanns.bookvis.repository.json.JsonCharacter

/**
 * A relation between two characters
 * @param from the first character
 * @param to the second character
 * @param description the description of the relation
 */
case class Relation(from: Character, to: Character, description: String)

package serializers {

/**
 * Relation json serializer
 */
class RelationSerializer extends JsonSerializer[Relation] {
  override def serialize(relation: Relation, typeOfSrc: Type, context: JsonSerializationContext) = {
    val json = new JsonObject
    json.addProperty("from", JsonCharacter.jsonCharacter(relation.from))
    json.addProperty("to", JsonCharacter.jsonCharacter(relation.to))
    json.addProperty("description", relation.description)
    json
  }
}

}

package db {

import com.landsmanns.bookvis.BFString._
import com.landsmanns.bookvis.json.JsonStuff
import JsonStuff._
import org.anormcypher.Cypher

/**
 * DB-related relation help functions
 */
object DBRelation {

  /**
   * Saves a relation between two characters in a given book
   * @param book the book
   * @param relation the relation
   * @return true if saving went well, or false otherwise
   */
  def saveRelation(book: Book, relation: Relation) = {
    val create = Cypher(
      """
        MATCH (f:Character) -[r1:%s]-> (b:Book)
        WHERE f.name = '%s'
        AND b.title = '%s'
        AND b.author = '%s'
        WITH f, b
        MATCH (t:Character) -[r2:%s]-> (b)
        WHERE t.name = '%s'
        CREATE (f) -[r3:%s {description: "%s"}]-> (t)
        RETURN r3
      """ %(INBOOK, relation.from.name, book.title, book.author, INBOOK, relation.to.name, BETWEENCHARS, relation.description))

    create.execute()
  }

  def getRelations(book: Book) = {
    val fetch = Cypher(
      """
        MATCH (f:Character) -[r1:%s]-> (t:Character)
        WITH f, t, r1
        MATCH (f) -[r2:%s]-> (b:Book)
        WHERE b.title = '%s'
        AND b.author = '%s'
        WITH f, t, b, r1
        MATCH (t) -[r3:%s]-> (b:Book)
        RETURN f.name as from, t.name as to, r1.description as description
      """ %(BETWEENCHARS, INBOOK, book.title, book.author, INBOOK))

    fetch.apply().map(row =>
      Relation(Character(row[String]("from"), null), Character(row[String]("to"), null), row[String]("description"))
    ).toList

  }

}


}
