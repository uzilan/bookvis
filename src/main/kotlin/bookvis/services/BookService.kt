package bookvis.services

import bookvis.models.Author
import bookvis.models.Book

class BookService {
    fun createBook(
        author: Author,
        title: String,
    ): Book = Book(author = author, title = title)
}
