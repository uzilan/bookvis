package com.landsmanns.bookvis.repository

import com.google.gson.{JsonObject, JsonSerializationContext, JsonSerializer}
import java.lang.reflect.Type
import org.anormcypher.Cypher
import com.landsmanns.bookvis.json.JsonStuff


/**
 * A character in a book
 * @param name the name of the character
 * @param appearsInChapter indicator for in which chapter the character first appears
 */
case class Character(name: String, appearsInChapter: Chapter)

package serializers {

import com.landsmanns.bookvis.repository.json.JsonChapter

/**
 * Character json serializer
 */
class CharacterSerializer extends JsonSerializer[Character] {
  override def serialize(character: Character, typeOfSrc: Type, context: JsonSerializationContext) = {
    val json = new JsonObject
    json.addProperty("name", character.name)
    json.addProperty("appearsInChapter", JsonChapter.jsonChapter(character.appearsInChapter))
    json
  }
}

}

package json {

/**
 * Json-related character help functions
 */
object JsonCharacter {

  /**
   * Transform a given character into json form
   * @param character the character
   * @return the character in json form
   */
  def jsonCharacter(character: Character) = {
    JsonStuff.gson.toJson(character)
  }
}

}

package db {

/**
 * DB-related character help functions
 */
object DBCharacter {

  import com.landsmanns.bookvis.BFString._
  import JsonStuff._


  /**
   * Saves a character in the DB, as well as an INBOOK relation to the book and an APPEARSIN relation to the chapter
   * @param book the book where the character lives in
   * @param chapter the first chapter where the character appears
   * @param character the character to save
   * @return true if saving went well, or false otherwise
   */
  def saveCharacter(book: Book, chapter: Chapter, character: Character) = {
    val create = Cypher(
      """
        MATCH ((ch:Chapter) -[br:%s]-> (b:Book))
        WHERE b.title = '%s'
        AND b.author = '%s'
        AND ch.name = '%s'
        AND ch.index = %d
        CREATE (c:Character {name: "%s"}) -[r:%s]-> (b),
               (c) -[r2:%s]-> (ch)
        RETURN r
      """ %(INBOOK, book.title, book.author, chapter.name, chapter.index, character.name, INBOOK, APPEARSIN))

    create.execute()
  }

  /**
   * Retrieves all characters in a given book and a chapter
   * @param book the book
   * @param chapter the chapter
   * @return all characters
   */
  def getCharacters(book: Book, chapter: Chapter) = {
    val fetch = Cypher(
      """
        MATCH ((char:Character) -[charr:%s]-> (chap:Chapter) -[chapr:%s]-> (b:Book))
        WHERE chap.name = '%s'
        AND chap.index = %d
        AND b.title = '%s'
        AND b.author = '%s'
        RETURN char.name as name
      """ %(JsonStuff.APPEARSIN, JsonStuff.INBOOK, chapter.name, chapter.index, book.title, book.author))

    fetch.apply().map(row =>
      Character(row[String]("name"), chapter)
    ).toList
  }
}

}