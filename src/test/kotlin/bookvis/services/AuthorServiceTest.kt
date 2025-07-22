package bookvis.services

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertNull
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

    @Test
    fun `should get author by id when author exists`() {
        val createdAuthor = authorService.createAuthor("tolkien", "J.R.R. Tolkien")
        val retrievedAuthor = authorService.getAuthor("tolkien")

        assertNotNull(retrievedAuthor)
        assertEquals(createdAuthor, retrievedAuthor)
        assertEquals("tolkien", retrievedAuthor?.id)
        assertEquals("J.R.R. Tolkien", retrievedAuthor?.name)
    }

    @Test
    fun `should return null when author does not exist`() {
        val retrievedAuthor = authorService.getAuthor("nonexistent")
        assertNull(retrievedAuthor)
    }
}
