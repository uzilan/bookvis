package bookvis.dsl

import bookvis.models.Book
import bookvis.models.Character
import bookvis.models.Chapter
import bookvis.models.Relationship

@DslMarker
annotation class RelationshipsDsl

@RelationshipsDsl
class RelationshipBuilder(private val book: Book, private val characters: List<Character>, private val chapters: List<Chapter>) {
    private var character1Id: String = ""
    private var character2Id: String = ""
    private var relationshipDescription: String = ""
    private var chapterTitle: String = ""
    
    fun between(character1Id: String, character2Id: String) {
        this.character1Id = character1Id
        this.character2Id = character2Id
    }
    
    fun description(desc: String) {
        relationshipDescription = desc
    }
    
    fun chapter(title: String) {
        chapterTitle = title
    }
    
    fun build(): Relationship? {
        val char1 = characters.find { it.id == character1Id }
        val char2 = characters.find { it.id == character2Id }
        val chapter = chapters.find { it.title == chapterTitle }
        
        if (char1 == null || char2 == null || chapter == null) {
            return null
        }
        
        return Relationship(book, char1, char2, relationshipDescription, chapter)
    }
}

@RelationshipsDsl
class RelationshipsBuilder(private val book: Book, private val characters: List<Character>, private val chapters: List<Chapter>) {
    private val relationships = mutableListOf<Relationship>()
    
    fun relationship(init: RelationshipBuilder.() -> Unit) {
        val relationshipBuilder = RelationshipBuilder(book, characters, chapters)
        relationshipBuilder.init()
        relationshipBuilder.build()?.let { relationships.add(it) }
    }
    
    fun getRelationships(): List<Relationship> = relationships.toList()
} 