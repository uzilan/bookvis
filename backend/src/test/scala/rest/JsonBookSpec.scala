package rest

import org.scalatest.{Matchers, FlatSpec}
//import dispatch._, Defaults._
import com.landsmanns.bookvis.repository.{Author, Book}
import com.landsmanns.bookvis.repository.db.{DBAuthor, DBBook}
import testdata.TestData._

/**
 * Created by uzilan on 2014-02-24.
 */
class JsonBookSpec extends FlatSpec with Matchers {

  //val svc = url("http://localhost:4567/books")

  "Books" should "be retrieveable" in {

    val author = Author(aaMilne)
    val book1 = Book(winnieThePooh, author)
    val book2 = Book(theHouseAtPoohCorner, author)

    DBAuthor.saveAuthor(author)
    DBBook.saveBook(book1)
    DBBook.saveBook(book2)

    //val books = Http(svc OK as.String)
    //println(books.print)


  }
}
