import org.anormcypher.Cypher
import org.scalatest.{Matchers, FlatSpec, BeforeAndAfterEach}

/**
 * Created by uzilan on 2014-02-22.
 */
trait DBSpecBase extends FlatSpec with Matchers with BeforeAndAfterEach {

  val aaMilne = "A. A. Milne"
  val winnieThePooh = "Winnie The Pooh"
  val chapterOne = "Chapter One"
  val chapterTwo = "Chapter Two"
  val chapterThree = "Chapter Three"
  val christopherRobin = "Christopher Robin"
  val theHouseAtPoohCorner = "The House at Pooh Corner"
  val friend = "Friend"

  override def beforeEach() {
    cleanDB
  }

  override def afterEach() {
    cleanDB
  }

  def cleanDB {
    Cypher("OPTIONAL MATCH (n)-[r]-() DELETE n,r").execute()
    Cypher("MATCH (n) DELETE n").execute()
  }
}
