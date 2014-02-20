package com.landsmanns.bookvis

import com.landsmanns.bookvis.repository._
import spark.Spark._
import spark._
import org.anormcypher.Neo4jREST
import com.landsmanns.bookvis.repository.db.DBCharacter
import com.landsmanns.bookvis.repository.json.JsonRepository
import com.landsmanns.bookvis.json.JsonRoute

/**
 * The Bookvis back-end application, which presents a REST interface which allows the users to save and retrieve
 * books, chapters, charactes and relations and save them into the DB
 */
object Bookvis extends App {

  private val repo = new Repository
  Neo4jREST.setServer("localhost", 7474, "/db/data/")

  val b = Book("book1", "author1")
  val c = Chapter("chap1", 1)
  val ch = Character("char1", c)

  //DBBook.createBook(b)
  //DBChapter.createChapter(b, c)
  val r = DBCharacter.createCharacter(b, c, ch)
  println("#####################")
  println("result: " + r)
  println("#####################")

  get(new JsonRoute("/books") {
    override def handle(request: Request, response: Response) = {
      //repo.books
      //("hello" -> "world")
      val chap1 = Chapter("chapter 1", 1)
      val char = Character("test", chap1)
      val chap2 = Chapter("chapter 2", 2)
      val book = Book("testb", "author")
      book.addChapter(chap1)
      book.addChapter(chap2)
      book.addCharacter(char)
      repo.addBook(book)
      val book2 = Book("testb2", "author2")
      val chap21 = Chapter("chap21", 21)
      val char2 = Character("test2", chap21)
      book2.addCharacter(char2)
      repo.addBook(book2)
      //repo//.books.toArray
      JsonRepository.jsonBooks(repo)
    }

  })
}
