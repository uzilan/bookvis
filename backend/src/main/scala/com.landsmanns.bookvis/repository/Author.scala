package com.landsmanns.bookvis.repository

/**
 * An author
 */
case class Author(name: String)

package serializers {

import com.landsmanns.bookvis.repository.json.JsonBook
import com.google.gson.{JsonObject, JsonSerializationContext, JsonSerializer}
import java.lang.reflect.Type

/**
 * Book json serializer
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
        RETURN b.title
      """)

    fetch.apply().map(row =>
      Book(row[String]("title"), author)
    ).toList
  }
}

}