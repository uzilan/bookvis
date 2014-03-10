package rest

import testdata.TestData._
import com.landsmanns.bookvis.repository.{Book, Author}
import com.sun.jersey.api.client.{ClientResponse, Client}
import db.DBCleaner
import com.landsmanns.bookvis.repository.db.DBAuthor._
import com.landsmanns.bookvis.repository.db.DBBook._
import com.landsmanns.bookvis.json.JsonStuff
import java.net.URLEncoder


/**
 * Created by uzilan on 2014-02-24.
 */
class RestSpec extends DBCleaner {

  val baseUrl = "http://localhost:4567/"

  def getJson(path: String) = {
    val client = Client.create()
    val webResource = client.resource(baseUrl + path)
    val response = webResource.accept("application/json").get(classOf[ClientResponse])

    response.getStatus should be(200)

    val entity = response.getEntity(classOf[String])
    JsonStuff.gson.fromJson(entity, classOf[String])
  }

  def jsonish(strings: List[String]) = {
    val wrapped = for (s <- strings) yield "\"" + s + "\""
    wrapped.mkString("[", ",", "]")
  }

  "Authors" should "be retrieveable" in {

    val astrid = Author(ASTRID_LINDGREN)
    val aaMilne = Author(A_A_MILNE)

    saveAuthor(astrid)
    saveAuthor(aaMilne)

    getJson("authors") should be(jsonish(List(ASTRID_LINDGREN, A_A_MILNE)))
  }

  "Books" should "be retrieveable" in {

    val author = Author(A_A_MILNE)
    val book1 = Book(WINNIE_THE_POOH, author)
    val book2 = Book(THE_HOUSE_AT_POOH_CORNER, author)

    saveAuthor(author)
    saveBook(book1)
    saveBook(book2)

    getJson("books") should be(jsonish(List(WINNIE_THE_POOH, THE_HOUSE_AT_POOH_CORNER)))
  }

  "Author books" should "be retrieveable" in {

    val author = Author(A_A_MILNE)
    val book1 = Book(WINNIE_THE_POOH, author)
    val book2 = Book(THE_HOUSE_AT_POOH_CORNER, author)

    saveAuthor(author)
    saveBook(book1)
    saveBook(book2)

    val path = "authors/" + URLEncoder.encode(A_A_MILNE, "ISO-8859-1") + "/books"

    getJson(path) should be(jsonish(List(WINNIE_THE_POOH, THE_HOUSE_AT_POOH_CORNER)))
  }
}
