package rest

import org.scalatest.{Matchers, FlatSpec}
import testdata.TestData._
import com.landsmanns.bookvis.repository.{Book, Author}
import com.landsmanns.bookvis.repository.db.DB
import com.sun.jersey.api.client.{ClientResponse, Client, WebResource}
import db.DBCleaner


/**
 * Created by uzilan on 2014-02-24.
 */
class RestSpec extends DBCleaner {

  val booksUrl = "http://localhost:4567/books"

  "Books" should "be retrieveable" in {

    val author = Author(A_A_MILNE)
    val book1 = Book(WINNIE_THE_POOH, author)
    val book2 = Book(THE_HOUSE_AT_POOH_CORNER, author)

    DB.saveAuthor(author)
    DB.saveBook(book1)
    DB.saveBook(book2)

    val client = Client.create()
    val webResource = client.resource(booksUrl)
    val response = webResource.accept("application/json").get(classOf[ClientResponse])

    response.getStatus should be(200)

    val entity = response.getEntity(classOf[String])

    println(entity)
  }
}
