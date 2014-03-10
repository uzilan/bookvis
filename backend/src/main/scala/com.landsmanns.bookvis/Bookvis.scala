package com.landsmanns.bookvis

import spark.Spark._
import spark._
import org.anormcypher.Neo4jREST
import com.landsmanns.bookvis.repository.db.DB
import com.landsmanns.bookvis.repository.json.JsonBook
import com.landsmanns.bookvis.json.JsonRoute

/**
 * The Bookvis back-end application, which presents a REST interface which allows the users to save and retrieve
 * authors, books, chapters, charactes and relations and save them into the DB
 */
object Bookvis extends App {

  Neo4jREST.setServer("localhost", 7474, "/db/data/")

  get(new JsonRoute("/books") {
    override def handle(request: Request, response: Response) = {
      JsonBook.jsonBooks(DB.getAllBooks)
    }

  })
}
