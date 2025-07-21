package bookvis.dsl

import bookvis.models.Author
import bookvis.models.Book
import bookvis.models.BookData
import bookvis.models.Chapter
import bookvis.models.Character
import bookvis.models.Faction
import bookvis.models.Relationship

@DslMarker
annotation class BookDsl

@BookDsl
class BookBuilder {
    private var authorId: String = ""
    private var authorName: String = ""
    private var bookTitle: String = ""
    private var chaptersList = mutableListOf<Chapter>()
    private var charactersList = mutableListOf<Character>()
    private var relationshipsList = mutableListOf<Relationship>()
    private var factionsList = mutableListOf<Faction>()

    fun author(
        id: String,
        name: String,
    ) {
        authorId = id
        authorName = name
    }

    fun title(title: String) {
        bookTitle = title
    }

    fun chapters(init: ChaptersBuilder.() -> Unit) {
        val book = Book(Author(authorId, authorName), bookTitle)
        val chaptersBuilder = ChaptersBuilder(book)
        chaptersBuilder.init()
        chaptersList.addAll(chaptersBuilder.getChapters())
    }

    fun characters(init: CharactersBuilder.() -> Unit) {
        val charactersBuilder = CharactersBuilder()
        charactersBuilder.init()
        charactersList.addAll(charactersBuilder.getCharacters())
    }

    fun relationships(init: RelationshipsBuilder.() -> Unit) {
        val relationshipsBuilder = RelationshipsBuilder(charactersList.toList(), chaptersList.toList())
        relationshipsBuilder.init()
        relationshipsList.addAll(relationshipsBuilder.getRelationships())
    }

    fun factions(init: FactionsBuilder.() -> Unit) {
        val factionsBuilder = FactionsBuilder()
        factionsBuilder.init()
        factionsList.addAll(factionsBuilder.getFactions())
    }

    fun build(): Book {
        val author = Author(authorId, authorName)
        return Book(author, bookTitle)
    }

    fun getChapters(): List<Chapter> = chaptersList.toList()

    fun getCharacters(): List<Character> = charactersList.toList()

    fun getRelationships(): List<Relationship> = relationshipsList.toList()

    fun getFactions(): List<Faction> = factionsList.toList()
}

fun book(init: BookBuilder.() -> Unit): BookData {
    val builder = BookBuilder().apply(init)
    return BookData(
        book = builder.build(),
        chapters = builder.getChapters(),
        characters = builder.getCharacters(),
        relationships = builder.getRelationships(),
        factions = builder.getFactions(),
    )
}
