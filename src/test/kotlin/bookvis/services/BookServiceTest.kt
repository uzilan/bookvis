package bookvis.services

import bookvis.models.Author
import bookvis.models.Book
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Test

class BookServiceTest {
    @Test
    fun `should create book with id, author and title`() {
        val author = Author(id = "tolkien", name = "J.R.R. Tolkien")
        val title = "The Lord of the Rings"
        val bookId = "lotr"
        val bookService = BookService()
        val book = bookService.createBook(bookId, author, title)
        assertEquals(bookId, book.id)
        assertEquals(author, book.author)
        assertEquals(title, book.title)
    }

    @Test
    fun `should fetch book by id`() {
        val author = Author(id = "tolkien", name = "J.R.R. Tolkien")
        val bookService = BookService()
        val book = bookService.createBook("the-hobbit", author, "The Hobbit")
        val fetched = bookService.getBookById("the-hobbit")
        assertEquals(book, fetched)
        assertNull(bookService.getBookById("nonexistent"))
    }

    @Test
    fun `should fetch all books by author id`() {
        val author1 = Author(id = "tolkien", name = "J.R.R. Tolkien")
        val author2 = Author(id = "asimov", name = "Isaac Asimov")
        val bookService = BookService()
        val book1 = bookService.createBook("the-hobbit", author1, "The Hobbit")
        val book2 = bookService.createBook("lotr", author1, "The Lord of the Rings")
        val book3 = bookService.createBook("foundation", author2, "Foundation")
        val booksByTolkien = bookService.getBooksByAuthorId("tolkien")
        assertEquals(listOf(book1, book2), booksByTolkien)
        val booksByAsimov = bookService.getBooksByAuthorId("asimov")
        assertEquals(listOf(book3), booksByAsimov)
        val booksByUnknown = bookService.getBooksByAuthorId("unknown")
        assertEquals(emptyList<Book>(), booksByUnknown)
    }
}
