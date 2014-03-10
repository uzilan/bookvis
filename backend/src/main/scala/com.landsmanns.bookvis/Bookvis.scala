package com.landsmanns.bookvis

import spark.Spark._
import spark._
import org.anormcypher.Neo4jREST
import com.landsmanns.bookvis.repository.json.JsonAuthor._
import com.landsmanns.bookvis.repository.json.JsonBook._
import com.landsmanns.bookvis.repository.db.DBAuthor._
import com.landsmanns.bookvis.repository.db.DBBook._
import com.landsmanns.bookvis.json.JsonRoute
import com.landsmanns.bookvis.repository.Author
import java.net.URLDecoder

/**
 * The Bookvis back-end application, which presents a REST interface which allows the users to save and retrieve
 * authors, books, chapters, charactes and relations and save them into the DB
 */
object Bookvis extends App {

  Neo4jREST.setServer("localhost", 7474, "/db/data/")

  /* Retrieve all the authors */
  get(new JsonRoute("/authors") {
    override def handle(request: Request, response: Response) = {
      jsonAuthors(getAllAuthors)
    }
  })

  /* Retrieve all the books */
  get(new JsonRoute("/books") {
    override def handle(request: Request, response: Response) = {
      jsonBooks(getAllBooks)
    }
  })

  /* Retrieve all the books written by an author */
  get(new JsonRoute("authors/:name/books") {
    override def handle(request: Request, response: Response) = {
      val author = Author(URLDecoder.decode(request.params(":name"), "ISO-8859-1"))
      jsonBooks(getAuthorBooks(author))
    }
  })

}
