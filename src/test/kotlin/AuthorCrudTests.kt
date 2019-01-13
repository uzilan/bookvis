
import bookvis.author.AuthorCrud
import io.kotlintest.shouldBe
import io.kotlintest.shouldNotBe
import io.kotlintest.specs.StringSpec

class AuthorCrudTests : StringSpec({

    val authorCrud = AuthorCrud()

    "Author should be created" {
        val author = TestData.Pooh.author
        val created = authorCrud.createOrUpdate(author)
        val returned = authorCrud.findById(created.id)
        returned shouldBe author
        returned.id shouldNotBe -1
    }
})