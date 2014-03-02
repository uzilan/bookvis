package db

import org.anormcypher.Cypher
import org.scalatest.{Matchers, FlatSpec, BeforeAndAfterEach}

/**
 * Created by uzilan on 2014-02-22.
 */
trait DBSpecBase extends FlatSpec with Matchers with BeforeAndAfterEach {

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
