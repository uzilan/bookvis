package db

import com.landsmanns.bookvis.repository.db._
import com.landsmanns.bookvis.repository._
import testdata.TestData._
import com.landsmanns.bookvis.repository.Chapter
import com.landsmanns.bookvis.repository.Book
import com.landsmanns.bookvis.repository.Character
import com.landsmanns.bookvis.repository.Relation
import com.landsmanns.bookvis.repository.Author
import com.landsmanns.bookvis.repository.Character
import com.landsmanns.bookvis.repository.Relation
import com.landsmanns.bookvis.repository.Chapter
import com.landsmanns.bookvis.repository.Book

/**
 * Created by uzilan on 2014-02-22.
 */
class DBRelationSpec extends DBSpecBase {
  "Relations" should "be saveable and retrieveable" in {

    val author = Author(aaMilne)
    val book = Book(winnieThePooh, author)
    val chap = Chapter(chapterOne, 1)
    val char1 = Character(winnieThePooh, chap)
    val char2 = Character(christopherRobin, chap)
    val relation = Relation(char1, char2, friend)

    DBAuthor.saveAuthor(author)
    DBBook.saveBook(book)
    DBChapter.saveChapter(book, chap)
    DBCharacter.saveCharacter(book, chap, char1)
    DBCharacter.saveCharacter(book, chap, char2)
    DBRelation.saveRelation(book, relation)

    val relations = DBRelation.getRelations(book)

    relations(0).from.name should be(winnieThePooh)
    relations(0).to.name should be(christopherRobin)
    relations(0).description should be(friend)
  }
}
