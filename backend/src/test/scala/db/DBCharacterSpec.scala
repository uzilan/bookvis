package db

import com.landsmanns.bookvis.repository.db.{DBAuthor, DBCharacter, DBChapter, DBBook}
import com.landsmanns.bookvis.repository.{Author, Character, Chapter, Book}
import testdata.TestData._

/**
 * Created by uzilan on 2014-02-22.
 */
class DBCharacterSpec extends DBSpecBase {
  "Characters" should "be saveable and retrieveable" in {

    val author = Author(aaMilne)
    val book = Book(winnieThePooh, author)
    val chap = Chapter(chapterOne, 1)
    val char1 = Character(winnieThePooh, chap)
    val char2 = Character(christopherRobin, chap)

    DBAuthor.saveAuthor(author)
    DBBook.saveBook(book)
    DBChapter.saveChapter(book, chap)
    DBCharacter.saveCharacter(book, chap, char1)
    DBCharacter.saveCharacter(book, chap, char2)

    val chars = DBCharacter.getCharacters(book, chap)

    chars(0).name should be(winnieThePooh)
    chars(1).name should be(christopherRobin)
  }


}
