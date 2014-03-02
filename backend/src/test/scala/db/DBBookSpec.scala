package db

import com.landsmanns.bookvis.repository.{Author, Book}
import com.landsmanns.bookvis.repository.db.{DBAuthor, DBBook}
import testdata.TestData._

/**
 * Created by uzilan on 2014-02-21.
 */
class DBBookSpec extends DBSpecBase {

  "Books" should "be saveable and retrieveable" in {
    val author = Author(aaMilne)
    val book1 = Book(winnieThePooh, author)
    val book2 = Book(theHouseAtPoohCorner, author)
    DBAuthor.saveAuthor(author)
    DBBook.saveBook(book1)
    DBBook.saveBook(book2)

    val retrieved = DBBook.getAllBooks

    retrieved(0).title should be(winnieThePooh)
    retrieved(0).author.name should be(aaMilne)
    retrieved(1).title should be(theHouseAtPoohCorner)
    retrieved(1).author.name should be(aaMilne)
  }

}
