package com.landsmanns.bookvis.repository

import scala.collection.mutable._
import org.anormcypher.Cypher
import com.google.gson.{JsonObject, JsonSerializationContext, JsonSerializer}
import java.lang.reflect.Type
import com.landsmanns.bookvis.json.JsonStuff._


/**
 * A book
 * @param title the book's title
 * @param author the book's author
 */
case class Book(title: String, author: Author) {
  private val chars = ArrayBuffer[Character]()
  private val chaps = ArrayBuffer[Chapter]()
  private val rels = ArrayBuffer[Relation]()

  /**
   * Retrieve the book's characters
   * @return the book's characters
   */
  def characters = chars.toList

  /**
   * Retrieve the book's chapters
   * @return the book's chapters
   */
  def chapters = chaps.toList

  /**
   * Retrieve the book's relations
   * @return the book's relations
   */
  def relations = rels.toList

  /**
   * Add a character to the book
   * @param character the character to add
   */
  def addCharacter(character: Character) {
    chars += character
  }

  /**
   * Add a chapter in the book
   * @param chapter the chapter to add
   */
  def addChapter(chapter: Chapter) {
    chaps += chapter
  }

  /**
   * Add a relation in the book
   * @param relation the relation to add
   */
  def addRelation(relation: Relation) {
    rels += relation
  }
}
package serializers {

import com.landsmanns.bookvis.repository.json.JsonBook

/**
 * Book json serializer
 */
class BookSerializer extends JsonSerializer[Book] {
  override def serialize(book: Book, typeOfSrc: Type, context: JsonSerializationContext) = {
    val json = new JsonObject
    json.addProperty("title", book.title)
    json.addProperty("author", book.author.name)
    json.addProperty("chapters", JsonBook.jsonChapters(book))
    json.addProperty("characters", JsonBook.jsonCharacters(book))
    json.addProperty("relations", JsonBook.jsonRelations(book))
    json
  }
}

}

package json {


/**
 * Json-related book help functions
 */
object JsonBook {

  /**
   * Transform a list of books into json form
   * @param books the books to transform
   * @return the books in json form
   */
  def jsonBooks(books: List[Book]) = {
    val titles = for (book <- books) yield book.title
    gson.toJson(titles.toArray)
  }

  /**
   * Transform a given book's characters into json form
   * @param book the given book
   * @return the book's characters in json form
   */
  def jsonCharacters(book: Book) = {
    gson.toJson(book.characters.toArray)
  }

  /**
   * Transform a given book's chapters into json form
   * @param book the given book
   * @return the book's chapters, ordered by index
   */
  def jsonChapters(book: Book) = {
    gson.toJson(book.chapters.toArray.sortBy(_.index))
  }

  /**
   * Transform a given book's all relations into json form
   * @param book the given book
   * @return the book's relations
   */
  def jsonRelations(book: Book) = {
    gson.toJson(book.relations.toArray)
  }
}

}

package db {

/**
 * DB-related book functions
 */
object DBBook {

  import com.landsmanns.bookvis.BFString._

  /**
   * Saves a book in the DB
   * @param book the book to save
   * @return true if saving went well, or false otherwise
   */
  def saveBook(book: Book) = {
    val create = Cypher(
      """
        MATCH (a:Author)
        WHERE a.name = '%s'
        CREATE a -[r:AUTHOR_OF]-> (b:Book {title: "%s"})
      """ %(book.author.name, book.title))

    create.execute()
  }

  /**
   * Retrieves all the books in the DB
   * @return all the books in the DB
   */
  def getAllBooks = {
    val fetch = Cypher(
      """
        MATCH (a:Author) -[r:AUTHOR_OF]-> (b:Book)
        RETURN b.title as title, a.name as name
      """)

    fetch.apply().map(row =>
      Book(row[String]("title"), Author(row[String]("name")))
    ).toList
  }
}

}