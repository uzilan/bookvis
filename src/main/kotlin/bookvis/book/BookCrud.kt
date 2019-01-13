package bookvis.book

import bookvis.BaseCrud

class BookCrud : BaseCrud<Book>() {
    override fun getEntityType(): Class<Book> {
        return Book::class.java
    }
}