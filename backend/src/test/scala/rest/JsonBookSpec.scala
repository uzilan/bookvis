package rest

import org.scalatest.{Matchers, FlatSpec}
//import dispatch._, Defaults._
import com.landsmanns.bookvis.repository.{Author, Book}
import com.landsmanns.bookvis.repository.db.DB
import testdata.TestData._

/**
 * Created by uzilan on 2014-02-24.
 */
class JsonBookSpec extends FlatSpec with Matchers {

  //val svc = url("http://localhost:4567/books")

  "Books" should "be retrieveable" in {

    val author = Author(A_A_MILNE)
    val book1 = Book(WINNIE_THE_POOH, author)
    val book2 = Book(THE_HOUSE_AT_POOH_CORNER, author)

    DB.saveAuthor(author)
    DB.saveBook(book1)
    DB.saveBook(book2)

    //val books = Http(svc OK as.String)
    //println(books.print)


  }
}
