package com.landsmanns.bookvis.repository

import scala.collection.mutable._
import org.anormcypher.Cypher
import com.landsmanns.bookvis.JsonStuff
import com.google.gson.{JsonObject, JsonSerializationContext, JsonSerializer}
import java.lang.reflect.Type

/**
 * Created by uzilan on 2014-02-15.
 */
case class Book(name: String, author: String) {
  private val chars = ArrayBuffer[Character]()
  private val chaps = ArrayBuffer[Chapter]()
  private val rels = ArrayBuffer[Relation]()

  def characters = chars.toList

  def chapters = chaps.toList

  def relations = rels.toList

  def addCharacter(character: Character) {
    chars += character
  }

  def addChapter(chapter: Chapter) {
    chaps += chapter
  }

  def addRelation(relation: Relation) {
    rels += relation
  }
}

class BookSerializer extends JsonSerializer[Book] {
  override def serialize(book: Book, typeOfSrc: Type, context: JsonSerializationContext) = {
    val json = new JsonObject
    json.addProperty("name", book.name)
    json.addProperty("author", book.author)
    json.addProperty("chapters", JsonBook.jsonChapters(book))
    json.addProperty("characters", JsonBook.jsonCharacters(book))
    json.addProperty("relations", JsonBook.jsonRelations(book))
    json
  }
}

object JsonBook {
  def jsonCharacters(book: Book) = {
    JsonStuff.gson.toJson(book.characters.toArray)
  }

  def jsonChapters(book: Book) = {
    JsonStuff.gson.toJson(book.chapters.toArray)
  }

  def jsonRelations(book: Book) = {
    JsonStuff.gson.toJson(book.relations.toArray)
  }
}


object DBBook {

  import com.landsmanns.bookvis.BFString._

  def createBook(book: Book) {
    val create =
      """
        CREATE (b:Book {name: "%s", author: "%s"})
      """ %(book.name, book.author)
    Cypher(create).execute()
  }
}