package bookvis.book

import bookvis.Entity
import bookvis.author.Author
import bookvis.character.Character
import org.neo4j.ogm.annotation.NodeEntity
import org.neo4j.ogm.annotation.Relationship

@NodeEntity
data class Book(
        val name: String,
        val author: Author,
        @Relationship(type = "HAS_CHARACTERS") val characters: MutableSet<Character> = emptySet<Character>().toMutableSet()
) : Entity()
