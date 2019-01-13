
import bookvis.book.BookCrud
import io.kotlintest.shouldBe
import io.kotlintest.shouldNotBe
import io.kotlintest.specs.StringSpec

class BookCrudTests : StringSpec({

    val bookCrud = BookCrud()

    "Book should be created" {
        val book = TestData.Pooh.book
        val created = bookCrud.createOrUpdate(book)
        val returned = bookCrud.findById(created.id)
        returned shouldBe book
        returned.id shouldNotBe -1
    }
})