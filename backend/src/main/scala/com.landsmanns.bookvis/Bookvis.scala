package com.landsmanns.bookvis

import com.landsmanns.bookvis.repository._
import spark.Spark._
import spark._
import org.anormcypher.Neo4jREST
import com.landsmanns.bookvis.repository.db.{DBBook, DBChapter, DBCharacter}
import com.landsmanns.bookvis.repository.json.JsonRepository
import com.landsmanns.bookvis.json.JsonRoute

/**
 * The Bookvis back-end application, which presents a REST interface which allows the users to save and retrieve
 * authors, books, chapters, charactes and relations and save them into the DB
 */
object Bookvis extends App {

  private val repo = new Repository
  Neo4jREST.setServer("localhost", 7474, "/db/data/")

  get(new JsonRoute("/books") {
    override def handle(request: Request, response: Response) = {
      JsonRepository.jsonBooks(repo)
    }

  })
}
