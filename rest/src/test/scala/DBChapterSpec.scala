import com.landsmanns.bookvis.repository.{Chapter, Book}
import com.landsmanns.bookvis.repository.db.{DBBook, DBChapter}

/**
 * Created by uzilan on 2014-02-22.
 */
class DBChapterSpec extends DBSpecBase {
  "Chapters" should "be saveable and retieveable" in {

    val book = Book(winnieThePooh, aaMilne)
    val ch1 = Chapter(chapterOne, 1)
    val ch2 = Chapter(chapterTwo, 2)
    val ch3 = Chapter(chapterThree, 3)

    DBBook.saveBook(book)
    DBChapter.saveChapter(book, ch1)
    DBChapter.saveChapter(book, ch2)
    DBChapter.saveChapter(book, ch3)

    val retrieved = DBChapter.getChapters(book)

    retrieved(0).name should be(chapterOne)
    retrieved(0).index should be(1)
    retrieved(1).name should be(chapterTwo)
    retrieved(1).index should be(2)
    retrieved(2).name should be(chapterThree)
    retrieved(2).index should be(3)
  }
}