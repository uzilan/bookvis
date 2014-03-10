package db

import testdata.TestData._
import com.landsmanns.bookvis.repository._
import com.landsmanns.bookvis.repository.db.DBBook._
import com.landsmanns.bookvis.repository.db.DBAuthor._
import com.landsmanns.bookvis.repository.db.DBChapter._
import com.landsmanns.bookvis.repository.db.DBCharacter._
import com.landsmanns.bookvis.repository.db.DBRelation._

/**
 * Created by uzilan on 2014-03-02.
 */
class DBSpec extends DBCleaner {

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

  "Authors" should "be saveable and retrieveable" in {
    saveAuthor(aaMilne)
    saveAuthor(astridLindgren)

    val retrieved = getAllAuthors

    retrieved(0).name should be(A_A_MILNE)
    retrieved(1).name should be(ASTRID_LINDGREN)
  }

  "Author books" should "be saveable and retrieveable" in {
    saveAuthor(aaMilne)
    saveBook(winnieThePooh)
    saveBook(theHouseAtPoohCorner)

    val retrieved = getAuthorBooks(aaMilne)

    retrieved(0).author.name should be(A_A_MILNE)
    retrieved(0).title should be(WINNIE_THE_POOH)
    retrieved(1).author.name should be(A_A_MILNE)
    retrieved(1).title should be(THE_HOUSE_AT_POOH_CORNER)
  }

  "Books" should "be saveable and retrieveable" in {
    saveAuthor(aaMilne)
    saveBook(winnieThePooh)
    saveBook(theHouseAtPoohCorner)

    val retrieved = getAllBooks

    retrieved(0).title should be(WINNIE_THE_POOH)
    retrieved(0).author.name should be(A_A_MILNE)
    retrieved(1).title should be(THE_HOUSE_AT_POOH_CORNER)
    retrieved(1).author.name should be(A_A_MILNE)
  }

  "Chapters" should "be saveable and retieveable" in {

    saveAuthor(aaMilne)
    saveBook(winnieThePooh)
    saveChapter(winnieThePooh, ch1)
    saveChapter(winnieThePooh, ch2)
    saveChapter(winnieThePooh, ch3)

    val retrieved = getChapters(winnieThePooh)

    retrieved(0).name should be(CHAPTER_ONE)
    retrieved(0).index should be(1)
    retrieved(1).name should be(CHAPTER_TWO)
    retrieved(1).index should be(2)
    retrieved(2).name should be(CHAPTER_THREE)
    retrieved(2).index should be(3)
  }

  "Characters" should "be saveable and retrieveable" in {

    saveAuthor(aaMilne)
    saveBook(winnieThePooh)
    saveChapter(winnieThePooh, ch1)
    saveCharacter(winnieThePooh, ch1, pooh)
    saveCharacter(winnieThePooh, ch1, chris)

    val chars = getCharacters(winnieThePooh, ch1)

    chars(0).name should be(WINNIE_THE_POOH)
    chars(1).name should be(CHRISTOPHER_ROBIN)
  }

  "Relations" should "be saveable and retrieveable" in {

    saveAuthor(aaMilne)
    saveBook(winnieThePooh)
    saveChapter(winnieThePooh, ch1)
    saveCharacter(winnieThePooh, ch1, pooh)
    saveCharacter(winnieThePooh, ch1, chris)
    saveRelation(winnieThePooh, friendRelation)

    val relations = getRelations(winnieThePooh)

    relations(0).from.name should be(WINNIE_THE_POOH)
    relations(0).to.name should be(CHRISTOPHER_ROBIN)
    relations(0).description should be(FRIEND)
  }
}
