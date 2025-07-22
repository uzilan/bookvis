package bookvis.services

import bookvis.models.Author
import org.slf4j.LoggerFactory

class AuthorService {
    private val logger = LoggerFactory.getLogger(AuthorService::class.java)
    private val authors = mutableMapOf<String, Author>()

    fun createAuthor(
        id: String,
        name: String,
    ): Author {
        logger.info("Creating author: $name with id: $id")
        val author = Author(id, name)
        authors[id] = author
        return author
    }

    fun getAuthor(id: String): Author? {
        logger.info("Fetching author with id: $id")
        return authors[id]
    }

    fun getAllAuthors(): List<Author> {
        logger.info("Fetching all authors")
        return authors.values.toList()
    }
}
