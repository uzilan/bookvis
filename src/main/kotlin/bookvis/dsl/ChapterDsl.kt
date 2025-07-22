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
    private var parent: Chapter? = null
    private var level: Int? = null
    private var type: String? = null
    private var partTitle: String? = null
    private var globalIndex: Int? = null
    private var path: List<String>? = null

    fun book(book: Book) { this.book = book }
    fun title(title: String) { chapterTitle = title }
    fun index(index: Int) { chapterIndex = index }
    fun parent(parent: Chapter?) { this.parent = parent }
    fun level(level: Int?) { this.level = level }
    fun type(type: String?) { this.type = type }
    fun partTitle(partTitle: String?) { this.partTitle = partTitle }
    fun globalIndex(globalIndex: Int?) { this.globalIndex = globalIndex }
    fun path(path: List<String>?) { this.path = path }

    fun build(): Chapter {
        require(book != null) { "Book must be specified" }
        return Chapter(
            book = book!!,
            title = chapterTitle,
            index = chapterIndex,
            parent = parent,
            level = level,
            type = type,
            partTitle = partTitle,
            globalIndex = globalIndex,
            path = path,
        )
    }
}

fun chapter(init: ChapterBuilder.() -> Unit): Chapter = ChapterBuilder().apply(init).build()
