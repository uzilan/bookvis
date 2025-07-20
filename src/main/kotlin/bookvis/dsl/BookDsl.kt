package bookvis.dsl

import bookvis.models.Author
import bookvis.models.Book
import bookvis.models.BookData
import bookvis.models.Chapter
import bookvis.models.Character

@DslMarker
annotation class BookDsl

@BookDsl
class BookBuilder {
    private var authorName: String = ""
    private var bookTitle: String = ""
    private var chaptersList = mutableListOf<Chapter>()
    private var charactersList = mutableListOf<Character>()
    
    fun author(name: String) {
        authorName = name
    }
    
    fun title(title: String) {
        bookTitle = title
    }
    
    fun chapters(init: ChaptersBuilder.() -> Unit) {
        val book = Book(Author(authorName), bookTitle)
        val chaptersBuilder = ChaptersBuilder(book)
        chaptersBuilder.init()
        chaptersList.addAll(chaptersBuilder.getChapters())
    }
    
    fun characters(init: CharactersBuilder.() -> Unit) {
        val book = Book(Author(authorName), bookTitle)
        val charactersBuilder = CharactersBuilder(book)
        charactersBuilder.init()
        charactersList.addAll(charactersBuilder.getCharacters())
    }
    
    fun build(): Book {
        val author = Author(authorName)
        return Book(author, bookTitle)
    }
    
    fun getChapters(): List<Chapter> = chaptersList.toList()
    
    fun getCharacters(): List<Character> = charactersList.toList()
}

fun book(init: BookBuilder.() -> Unit): BookData {
    val builder = BookBuilder().apply(init)
    return BookData(
        book = builder.build(),
        chapters = builder.getChapters(),
        characters = builder.getCharacters()
    )
} 