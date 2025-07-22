package bookvis.services

import bookvis.models.Author
import bookvis.models.Book
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Test

class BookServiceTest {
    @Test
    fun `should create book with author and title`() {
        val author = Author(id = "tolkien", name = "J.R.R. Tolkien")
        val title = "The Lord of the Rings"
        val bookService = BookService()
        val book = bookService.createBook(author, title)
        assertEquals(author, book.author)
        assertEquals(title, book.title)
    }

    @Test
    fun `should fetch book by title`() {
        val author = Author(id = "tolkien", name = "J.R.R. Tolkien")
        val bookService = BookService()
        val book = bookService.createBook(author, "The Hobbit")
        val fetched = bookService.getBookByTitle("The Hobbit")
        assertEquals(book, fetched)
        assertNull(bookService.getBookByTitle("Nonexistent"))
    }

    @Test
    fun `should fetch all books by author id`() {
        val author1 = Author(id = "tolkien", name = "J.R.R. Tolkien")
        val author2 = Author(id = "asimov", name = "Isaac Asimov")
        val bookService = BookService()
        val book1 = bookService.createBook(author1, "The Hobbit")
        val book2 = bookService.createBook(author1, "The Lord of the Rings")
        val book3 = bookService.createBook(author2, "Foundation")
        val booksByTolkien = bookService.getBooksByAuthorId("tolkien")
        assertEquals(listOf(book1, book2), booksByTolkien)
        val booksByAsimov = bookService.getBooksByAuthorId("asimov")
        assertEquals(listOf(book3), booksByAsimov)
        val booksByUnknown = bookService.getBooksByAuthorId("unknown")
        assertEquals(emptyList<Book>(), booksByUnknown)
    }
}
