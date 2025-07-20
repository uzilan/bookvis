package bookvis.dsl

import bookvis.models.Chapter
import bookvis.models.Character
import bookvis.models.Relationship

@DslMarker
annotation class RelationshipsDsl

@RelationshipsDsl
class RelationshipBuilder(
    private val characters: List<Character>,
    private val chapters: List<Chapter>,
) {
    private var character1Id: String = ""
    private var character2Id: String = ""
    private var relationshipDescription: String = ""
    private var chapterTitle: String = ""

    fun character1(id: String) {
        character1Id = id
    }

    fun character2(id: String) {
        character2Id = id
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

        return Relationship(
            character1 = char1,
            character2 = char2,
            description = relationshipDescription,
            chapter = chapter,
        )
    }
}

@RelationshipsDsl
class RelationshipsBuilder(
    private val characters: List<Character>,
    private val chapters: List<Chapter>,
) {
    private val relationships = mutableListOf<Relationship>()

    fun relationship(init: RelationshipBuilder.() -> Unit) {
        val relationshipBuilder = RelationshipBuilder(characters, chapters)
        relationshipBuilder.init()
        relationshipBuilder.build()?.let { relationships.add(it) }
    }

    fun getRelationships(): List<Relationship> = relationships.toList()
}
