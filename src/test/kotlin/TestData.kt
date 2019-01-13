
import bookvis.author.Author
import bookvis.book.Book
import bookvis.character.Character

object TestData {
    object Pooh {
        val author = Author("A. A. Milne")
        val book = Book("Winnie-the-Pooh", author)
        val winnieThePooh = Character("Winnie-the-Pooh", book)
        val christopherRobin = Character("Christopher Robin", book)
    }
}