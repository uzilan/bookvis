package bookvis.author

import bookvis.Entity
import bookvis.book.Book
import org.neo4j.ogm.annotation.NodeEntity
import org.neo4j.ogm.annotation.Relationship

@NodeEntity
data class Author(
        val name: String,
        @Relationship(type = "WROTE_BOOKS") val books: MutableSet<Book> = emptySet<Book>().toMutableSet()
) : Entity()