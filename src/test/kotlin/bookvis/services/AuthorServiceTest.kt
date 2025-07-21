package bookvis.services

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

class AuthorServiceTest {
    private lateinit var authorService: AuthorService

    @BeforeEach
    fun setUp() {
        authorService = AuthorService()
    }

    @Test
    fun `should create author successfully`() {
        val author = authorService.createAuthor("tolkien", "J.R.R. Tolkien")
        assertNotNull(author)
        assertEquals("tolkien", author.id)
        assertEquals("J.R.R. Tolkien", author.name)
    }
} 
