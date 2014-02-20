import groovyx.net.http.RESTClient
import spock.lang.Specification


/**
 * Created by uzilan on 2014-02-19.
 */
class BooksRestTest extends Specification {
    def client = new RESTClient('http://localhost:4567/')
    def resp = client.get('books')

    def "should see two books"() {
        println(resp)
    }
}