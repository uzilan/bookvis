package bookvis.services

import bookvis.models.Author
import org.slf4j.LoggerFactory

class AuthorService {
    private val logger = LoggerFactory.getLogger(AuthorService::class.java)

    fun createAuthor(
        id: String,
        name: String,
    ): Author {
        logger.info("Creating author: $name with id: $id")
        return Author(id, name)
    }
} 
