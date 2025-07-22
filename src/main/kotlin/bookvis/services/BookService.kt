package bookvis.services

import bookvis.models.Author
import bookvis.models.Book

class BookService {
    private val books = mutableListOf<Book>()

    fun createBook(
        author: Author,
        title: String,
    ): Book {
        val book = Book(author = author, title = title)
        books.add(book)
        return book
    }

    fun getBookByTitle(title: String): Book? = books.find { it.title == title }

    fun getBooksByAuthorId(authorId: String): List<Book> = books.filter { it.author.id == authorId }
}
