package bookvis.dsl

import bookvis.models.Book
import bookvis.models.Chapter

@DslMarker
annotation class ChapterDsl

@ChapterDsl
class ChapterBuilder {
    private var book: Book? = null
    private var chapterTitle: String = ""
    private var chapterIndex: Int = 0
    
    fun book(book: Book) {
        this.book = book
    }
    
    fun title(title: String) {
        chapterTitle = title
    }
    
    fun index(index: Int) {
        chapterIndex = index
    }
    
    fun build(): Chapter {
        require(book != null) { "Book must be specified" }
        return Chapter(book!!, chapterTitle, chapterIndex)
    }
}

fun chapter(init: ChapterBuilder.() -> Unit): Chapter {
    return ChapterBuilder().apply(init).build()
} 