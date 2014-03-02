package com.landsmanns.bookvis.repository.db

import com.landsmanns.bookvis.repository._

/**
 * Created by uzilan on 2014-03-02.
 */
object DB {

  /* Authors */

  /**
   * Saves an author in the DB
   * @param author the author to save
   * @return true if saving went well, or false otherwise
   */
  def saveAuthor(author: Author) = DBAuthor.saveAuthor(author)

  /**
   * Retrieves all authors in the DB
   * @return all authors in the DB
   */
  def getAllAuthors = DBAuthor.getAllAuthors

  /**
   * Retrieves all books in the DB, written by a given author
   * @param author the author
   * @return all books in the DB, written by the author
   */
  def getAuthorBooks(author: Author) = DBAuthor.getAuthorBooks(author)


  /* Books */

  /**
   * Saves a book in the DB
   * @param book the book to save
   * @return true if saving went well, or false otherwise
   */
  def saveBook(book: Book) = DBBook.saveBook(book)

  /**
   * Retrieves all the books in the DB
   * @return all the books in the DB
   */
  def getAllBooks = DBBook.getAllBooks


  /* Chapters */

  /**
   * Saves a chapter in the DB, as well as an IN_BOOK relation between the chapter and the book
   * @param book the book where the chapter resides
   * @param chapter the chapter to save
   * @return true if saving went well, or false otherwise
   */
  def saveChapter(book: Book, chapter: Chapter) = DBChapter.saveChapter(book, chapter)

  /**
   * Retrieves all chapters in a given book
   * @param book the book
   * @return all chapters
   */
  def getChapters(book: Book) = DBChapter.getChapters(book)


  /* Characters */

  /**
   * Saves a character in the DB, as well as an IN_BOOK relation to the book and an APPEARS_IN relation to the chapter
   * @param book the book where the character lives in
   * @param chapter the first chapter where the character appears
   * @param character the character to save
   * @return true if saving went well, or false otherwise
   */
  def saveCharacter(book: Book, chapter: Chapter, character: Character) = DBCharacter.saveCharacter(book, chapter, character)

  /**
   * Retrieves all characters in a given book and a chapter
   * @param book the book
   * @param chapter the chapter
   * @return all characters
   */
  def getCharacters(book: Book, chapter: Chapter) = DBCharacter.getCharacters(book, chapter)


  /* Relations */

  /**
   * Saves a relation between two characters in a given book
   * @param book the book
   * @param relation the relation
   * @return true if saving went well, or false otherwise
   */
  def saveRelation(book: Book, relation: Relation) = DBRelation.saveRelation(book, relation)

  /**
   * Retrieves all the relations between characters in a given book
   * @param book the book
   * @return all the relations between characters in the book
   */
  def getRelations(book: Book) = DBRelation.getRelations(book)
}
