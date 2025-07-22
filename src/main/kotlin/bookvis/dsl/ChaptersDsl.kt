package bookvis.dsl

import bookvis.models.Book
import bookvis.models.Chapter

@DslMarker
annotation class ChaptersDsl

@ChaptersDsl
class ChaptersBuilder(
    private val book: Book,
) {
    private val chapters = mutableListOf<Chapter>()
    private var currentIndex = 1

    fun title(
        title: String,
        parent: Chapter? = null,
        level: Int? = null,
        type: String? = null,
        partTitle: String? = null,
        globalIndex: Int? = null,
        path: List<String>? = null,
    ) {
        chapters.add(
            Chapter(
                book = book,
                title = title,
                index = currentIndex,
                parent = parent,
                level = level,
                type = type,
                partTitle = partTitle,
                globalIndex = globalIndex,
                path = path,
            )
        )
        currentIndex++
    }

    fun getChapters(): List<Chapter> = chapters.toList()
}
