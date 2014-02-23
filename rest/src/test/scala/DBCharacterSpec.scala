import com.landsmanns.bookvis.repository.db.{DBCharacter, DBChapter, DBBook}
import com.landsmanns.bookvis.repository.{Character, Chapter, Book}

/**
 * Created by uzilan on 2014-02-22.
 */
class DBCharacterSpec extends DBSpecBase {
  "Characters" should "be saveable and retrieveable" in {

    val book = Book(winnieThePooh, aaMilne)
    val chap = Chapter(chapterOne, 1)
    val char1 = Character(winnieThePooh, chap)
    val char2 = Character(christopherRobin, chap)

    DBBook.saveBook(book)
    DBChapter.saveChapter(book, chap)
    DBCharacter.saveCharacter(book, chap, char1)
    DBCharacter.saveCharacter(book, chap, char2)
    val chars = DBCharacter.getCharacters(book, chap)

    chars(0).name should be(winnieThePooh)
    chars(1).name should be(christopherRobin)
  }


}
