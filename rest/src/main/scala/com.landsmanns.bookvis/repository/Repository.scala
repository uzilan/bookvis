package com.landsmanns.bookvis.repository

import scala.collection.mutable._
import com.landsmanns.bookvis.{JsonStuff, JsonRoute}

/**
 * Created by uzilan on 2014-02-15.
 */
class Repository {
  private val bks = ArrayBuffer[Book]()

  def books = bks.toList

  def addBook(book: Book) {
    bks += book
  }
}

object Repository {

  def jsonBooks(repo: Repository) = {
    val bookNames = for (book <- repo.books) yield book.name
    JsonStuff.gson.toJson(bookNames.toArray)
  }
}