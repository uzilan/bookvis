package bookvis.character

import bookvis.Entity
import bookvis.book.Book
import bookvis.relation.Relation
import org.neo4j.ogm.annotation.NodeEntity
import org.neo4j.ogm.annotation.Relationship

@NodeEntity
data class Character(
        val name: String,
        val book: Book,
        @Relationship(type = "RELATION") val relations: MutableSet<Relation> = mutableSetOf()
) : Entity()