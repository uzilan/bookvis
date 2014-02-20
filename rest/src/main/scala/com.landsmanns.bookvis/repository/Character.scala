package com.landsmanns.bookvis.repository

import com.landsmanns.bookvis.JsonStuff
import com.google.gson.{JsonObject, JsonSerializationContext, JsonSerializer}
import java.lang.reflect.Type
import org.anormcypher.Cypher


/**
 * Created by uzilan on 2014-02-15.
 */
case class Character(name: String, appearsInChapter: Chapter)

class CharacterSerializer extends JsonSerializer[Character] {
  override def serialize(character: Character, typeOfSrc: Type, context: JsonSerializationContext) = {
    val json = new JsonObject
    json.addProperty("name", character.name)
    json.addProperty("appearsInChapter", JsonChapter.jsonChapter(character.appearsInChapter))
    json
  }
}

object JsonCharacter {
  def jsonCharacter(character: Character) = {
    JsonStuff.gson.toJson(character)
  }
}

object DBCharacter {

  import com.landsmanns.bookvis.BFString._

  def createCharacter(book: Book, chapter: Chapter, character: Character) = {
    val create =
      """
        MATCH ((ch:Chapter) -[br:INBOOK]-> (b:Book))
        WHERE b.name = '%s'
        AND b.author = '%s'
        AND ch.name = '%s'
        AND ch.index = '%d'
        CREATE (c:Character {name: "%s"})-[r:INBOOK]->(b),
               (c)-[r2:APPEARSIN]->(ch)
        RETURN c
      """ %(book.name, book.author, chapter.name, chapter.index, character.name)
    Cypher(create).execute()
  }
}
