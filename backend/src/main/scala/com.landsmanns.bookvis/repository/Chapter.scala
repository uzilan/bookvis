package com.landsmanns.bookvis.repository

import com.google.gson.{JsonObject, JsonSerializationContext, JsonSerializer}
import java.lang.reflect.Type
import org.anormcypher.Cypher
import com.landsmanns.bookvis.json.JsonStuff

/**
 * A chapter in a book
 * @param name the chapter's name
 * @param index the chapter's index
 */
case class Chapter(name: String, index: Int)

package serializer {

/**
 * Chapter json serializer
 */
class ChapterSerializer extends JsonSerializer[Chapter] {
  override def serialize(chapter: Chapter, typeOfSrc: Type, context: JsonSerializationContext) = {
    val json = new JsonObject
    json.addProperty("name", chapter.name)
    json.addProperty("index", chapter.index)
    json
  }
}

}

package json {

/**
 * Json-related chapter help functions
 */
object JsonChapter {

  /**
   * Transform a given chapter into json form
   * @param chapter the chapter
   * @return the chapter in json form
   */
  def jsonChapter(chapter: Chapter) = {
    JsonStuff.gson.toJson(chapter)
  }
}

}

package db {

/**
 * DB-related chapter help functions
 */
object DBChapter {

  import com.landsmanns.bookvis.BFString._

  /**
   * Saves a chapter in the DB, as well as an IN_BOOK relation between the chapter and the book
   * @param book the book where the chapter resides
   * @param chapter the chapter to save
   * @return true if saving went well, or false otherwise
   */
  def saveChapter(book: Book, chapter: Chapter) = {
    val create = Cypher(
      """
        MATCH (a:Author) -[r:AUTHOR_OF]-> (b:Book)
        WHERE a.name = '%s'
        AND b.title = '%s'
        CREATE (c:Chapter {name: "%s", index: %d}) -[r2:IN_BOOK]-> (b)
        RETURN r2
      """ %(book.author.name, book.title, chapter.name, chapter.index))

    create.execute()
  }

  /**
   * Retrieves all chapters in a given book
   * @param book the book
   * @return all chapters
   */
  def getChapters(book: Book) = {
    val fetch = Cypher(
      """
        MATCH (c:Chapter) -[r:IN_BOOK]-> (b:Book) <-[r2:AUTHOR_OF]- (a:Author)
        WHERE b.title = '%s'
        AND a.name = '%s'
        RETURN c.name as name, c.index as index
      """ %(book.title, book.author.name))

    fetch.apply().map(row =>
      Chapter(row[String]("name"), row[Int]("index"))
    ).toList
  }
}

}