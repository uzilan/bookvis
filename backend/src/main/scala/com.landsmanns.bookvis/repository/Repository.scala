package com.landsmanns.bookvis.repository

import scala.collection.mutable._

/**
 * A repository of books
 */
class Repository {
  private val bks = ArrayBuffer[Book]()

  /**
   * Retrieves the list of books in this repository
   * @return the list of books in this repository
   */
  def books = bks.toList

  /**
   * Add a book in the repository
   * @param book the book to add
   */
  def addBook(book: Book) {
    bks += book
  }
}

package json {

import com.landsmanns.bookvis.json.JsonStuff

/**
 * Json-related repository help functions
 */
object JsonRepository {

  def jsonBooks(repo: Repository) = {
    val bookNames = for (book <- repo.books) yield book.title
    JsonStuff.gson.toJson(bookNames.toArray)
  }
}

}