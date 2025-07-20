package bookvis.dsl

import bookvis.models.Book
import bookvis.models.Chapter

@DslMarker
annotation class ChaptersDsl

@ChaptersDsl
class ChaptersBuilder(private val book: Book) {
    private val chapters = mutableListOf<Chapter>()
    private var currentIndex = 1
    
    fun title(title: String) {
        chapters.add(Chapter(book, title, currentIndex))
        currentIndex++
    }
    
    fun getChapters(): List<Chapter> = chapters.toList()
} 