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
import org.anormcypher.Cypher

/**
 * DB-related relation help functions
 */
private[db] object DBRelation {

  /**
   * Saves a relation between two characters in a given book
   * @param book the book
   * @param relation the relation
   * @return true if saving went well, or false otherwise
   */
  def saveRelation(book: Book, relation: Relation) = {
    val create = Cypher(
      """
        MATCH (f:Character) -[r1:IN_BOOK]-> (b:Book) <-[ar:AUTHOR_OF]- (a:Author)
        WHERE f.name = '%s'
        AND b.title = '%s'
        AND a.name = '%s'
        WITH f, b
        MATCH (t:Character) -[r2:IN_BOOK]-> (b)
        WHERE t.name = '%s'
        CREATE (f) -[r3:BETWEEN_CHARS {description: "%s"}]-> (t)
        RETURN r3
      """ %(relation.from.name, book.title, book.author.name, relation.to.name, relation.description))

    create.execute()
  }

  /**
   * Retrieves all the relations between characters in a given book
   * @param book the book
   * @return all the relations between characters in the book
   */
  def getRelations(book: Book) = {
    val fetch = Cypher(
      """
        MATCH (f:Character) -[r1:IN_BOOK]-> (b:Book) <-[ar:AUTHOR_OF]- (a:Author)
        WHERE b.title = '%s'
        AND a.name = '%s'
        WITH f, b
        MATCH (t:Character) -[r2:IN_BOOK]-> (b)
        WITH f, t
        MATCH (f) -[r3:BETWEEN_CHARS]-> (t)
        RETURN f.name as from, t.name as to, r3.description as description
      """ %(book.title, book.author.name))

    fetch.apply().map(row =>
      Relation(Character(row[String]("from"), null), Character(row[String]("to"), null), row[String]("description"))
    ).toList

  }

}


}
