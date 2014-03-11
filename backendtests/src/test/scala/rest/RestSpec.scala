package rest

import testdata.TestData._
import com.landsmanns.bookvis.repository.{Book, Author}
import com.sun.jersey.api.client.{ClientResponse, Client}
import db.DBTestBase
import com.landsmanns.bookvis.repository.db.DBAuthor._
import com.landsmanns.bookvis.repository.db.DBBook._
import com.landsmanns.bookvis.json.JsonStuff
import java.net.URLEncoder


/**
 * Created by uzilan on 2014-02-24.
 */
class RestSpec extends DBTestBase {

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
    getJson("authors") should be(jsonish(List(A_A_MILNE, ASTRID_LINDGREN)))
  }

  "Books" should "be retrieveable" in {
    getJson("books") should be(jsonish(List(WINNIE_THE_POOH, THE_HOUSE_AT_POOH_CORNER)))
  }

  "Author books" should "be retrieveable" in {
    val path = "authors/" + URLEncoder.encode(A_A_MILNE, "ISO-8859-1") + "/books"
    getJson(path) should be(jsonish(List(WINNIE_THE_POOH, THE_HOUSE_AT_POOH_CORNER)))
  }
}
