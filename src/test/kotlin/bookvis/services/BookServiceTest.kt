package bookvis.services

import bookvis.models.Author
import org.junit.jupiter.api.Assertions.assertEquals
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
} 