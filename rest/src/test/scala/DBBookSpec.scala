import com.landsmanns.bookvis.repository.Book
import com.landsmanns.bookvis.repository.db.DBBook

/**
 * Created by uzilan on 2014-02-21.
 */
class DBBookSpec extends DBSpecBase {

  "Books" should "be saveable and retrieveable" in {
    val book1 = Book(winnieThePooh, aaMilne)
    val book2 = Book(theHouseAtPoohCorner, aaMilne)
    DBBook.saveBook(book1)
    DBBook.saveBook(book2)

    val retrieved = DBBook.getAllBooks
    retrieved(0).title should be(winnieThePooh)
    retrieved(0).author should be(aaMilne)
    retrieved(1).title should be(theHouseAtPoohCorner)
    retrieved(1).author should be(aaMilne)
  }

}
