package db

import org.anormcypher.Cypher
import org.scalatest.{BeforeAndAfter, Matchers, FlatSpec, BeforeAndAfterEach}
import testdata.TestData._
import com.landsmanns.bookvis.repository.db.DBAuthor._
import com.landsmanns.bookvis.repository.db.DBBook._
import com.landsmanns.bookvis.repository.db.DBChapter._
import com.landsmanns.bookvis.repository.db.DBCharacter._
import com.landsmanns.bookvis.repository.db.DBRelation._
import com.landsmanns.bookvis.repository.Author
import com.landsmanns.bookvis.repository.Character
import com.landsmanns.bookvis.repository.Relation
import com.landsmanns.bookvis.repository.Chapter
import com.landsmanns.bookvis.repository.Book

/**
 * Created by uzilan on 2014-03-10.
 */
trait DBTestBase extends FlatSpec with Matchers with BeforeAndAfter {

  val aaMilne = Author(A_A_MILNE)
  val astridLindgren = Author(ASTRID_LINDGREN)
  val winnieThePooh = Book(WINNIE_THE_POOH, aaMilne)
  val theHouseAtPoohCorner = Book(THE_HOUSE_AT_POOH_CORNER, aaMilne)
  val ch1 = Chapter(CHAPTER_ONE, 1)
  val ch2 = Chapter(CHAPTER_TWO, 2)
  val ch3 = Chapter(CHAPTER_THREE, 3)
  val pooh = Character(WINNIE_THE_POOH, ch1)
  val chris = Character(CHRISTOPHER_ROBIN, ch1)
  val friendRelation = Relation(pooh, chris, FRIEND)

  before {
    cleanDB
    setup
  }

  after {
    cleanDB
  }

  def setup {

    saveAuthor(aaMilne)
    saveAuthor(astridLindgren)
    saveBook(winnieThePooh)
    saveBook(theHouseAtPoohCorner)
    saveChapter(winnieThePooh, ch1)
    saveChapter(winnieThePooh, ch2)
    saveChapter(winnieThePooh, ch3)
    saveCharacter(winnieThePooh, ch1, pooh)
    saveCharacter(winnieThePooh, ch1, chris)
    saveRelation(winnieThePooh, friendRelation)
  }

  def cleanDB {
    Cypher("OPTIONAL MATCH (n)-[r]-() DELETE n,r").execute()
    Cypher("MATCH (n) DELETE n").execute()
  }
}
