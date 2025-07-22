package bookvis.services

import bookvis.models.Author
import bookvis.models.Book

class BookService {
    private val books = mutableListOf<Book>()

    fun createBook(
        id: String,
        author: Author,
        title: String,
    ): Book {
        val book = Book(id = id, author = author, title = title)
        books.add(book)
        return book
    }

    fun getBookById(id: String): Book? = books.find { it.id == id }

    fun getBooksByAuthorId(authorId: String): List<Book> = books.filter { it.author.id == authorId }
}
