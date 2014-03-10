package com.landsmanns.bookvis.repository

/**
 * An author
 * @param name the author's name
 */
case class Author(name: String)

package serializers {

import com.google.gson.{JsonObject, JsonSerializationContext, JsonSerializer}
import java.lang.reflect.Type

/**
 * Author json serializer
 */
class AuthorSerializer extends JsonSerializer[Author] {
  override def serialize(author: Author, typeOfSrc: Type, context: JsonSerializationContext) = {
    val json = new JsonObject
    json.addProperty("name", author.name)
    json
  }
}

}

package db {

import org.anormcypher.Cypher


/**
 * DB-related author functions
 */
object DBAuthor {

  import com.landsmanns.bookvis.BFString._

  /**
   * Saves an author in the DB
   * @param author the author to save
   * @return true if saving went well, or false otherwise
   */
  def saveAuthor(author: Author) = {
    val create = Cypher(
      """
        create (a:Author {name: "%s"})
      """ % (author.name))

    create.execute()
  }

  /**
   * Retrieves all authors in the DB
   * @return all authors in the DB
   */
  def getAllAuthors = {
    val fetch = Cypher(
      """
        MATCH (a:Author)
        return a.name as name
      """)

    fetch.apply().map(row =>
      Author(row[String]("name"))
    ).toList
  }

  /**
   * Retrieves all books in the DB, written by a given author
   * @param author the author
   * @return all books in the DB, written by the author
   */
  def getAuthorBooks(author: Author) = {
    val fetch = Cypher(
      """
        MATCH (a:Author) -[r:AUTHOR_OF]-> (b:Book)
        WHERE a.name = '%s'
        RETURN b.title as title
      """ % (author.name))

    fetch.apply().map(row =>
      Book(row[String]("title"), author)
    ).toList
  }
}

}

package json {

import com.landsmanns.bookvis.json.JsonStuff._


/**
 * Json-related book help functions
 */
object JsonAuthor {

  /**
   * Transform a list of authors into json form
   * @param authors the authors to transform
   * @return the authors in json form
   */
  def jsonAuthors(authors: List[Author]) = {
    val authorNames = for (author <- authors) yield author.name
    gson.toJson(authorNames.toArray)
  }
}

}