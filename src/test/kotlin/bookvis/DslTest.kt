package bookvis

import bookvis.models.Book
import bookvis.models.BookData
import bookvis.models.Chapter
import bookvis.models.Character
import bookvis.dsl.book
import bookvis.dsl.chapter
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull

class DslTest {
    
    @Test
    fun `should create book with DSL`() {
        val bookData = book {
            author("J.R.R. Tolkien")
            title("The Hobbit")
        }
        
        assertNotNull(bookData.book)
        assertEquals("J.R.R. Tolkien", bookData.book.author.name)
        assertEquals("The Hobbit", bookData.book.title)
        assertEquals(0, bookData.chapters.size)
        assertEquals(0, bookData.characters.size)
    }
    
    @Test
    fun `should create book with chapters using nested DSL`() {
        val bookData = book {
            author("J.R.R. Tolkien")
            title("The Hobbit")
            chapters {
                title("An Unexpected Party")
                title("Roast Mutton")
                title("A Short Rest")
            }
        }
        
        assertNotNull(bookData.book)
        assertEquals("J.R.R. Tolkien", bookData.book.author.name)
        assertEquals("The Hobbit", bookData.book.title)
        assertEquals(3, bookData.chapters.size)
        assertEquals("An Unexpected Party", bookData.chapters[0].title)
        assertEquals(1, bookData.chapters[0].index)
        assertEquals("Roast Mutton", bookData.chapters[1].title)
        assertEquals(2, bookData.chapters[1].index)
        assertEquals("A Short Rest", bookData.chapters[2].title)
        assertEquals(3, bookData.chapters[2].index)
        assertEquals(0, bookData.characters.size)
    }
    
    @Test
    fun `should create book with characters using nested DSL`() {
        val bookData = book {
            author("J.R.R. Tolkien")
            title("The Hobbit")
            characters {
                character {
                    name("Bilbo Baggins")
                    description("A hobbit who goes on an adventure")
                    firstAppearance(1)
                    aliases("Burglar", "Mr. Baggins")
                }
                character {
                    name("Gandalf")
                    description("A wise wizard")
                    firstAppearance(1)
                    aliases("Grey Wizard", "Mithrandir")
                }
                character {
                    name("Thorin Oakenshield")
                    description("The leader of the dwarves")
                    firstAppearance(2)
                }
            }
        }
        
        assertNotNull(bookData.book)
        assertEquals("J.R.R. Tolkien", bookData.book.author.name)
        assertEquals("The Hobbit", bookData.book.title)
        assertEquals(0, bookData.chapters.size)
        assertEquals(3, bookData.characters.size)
        assertEquals("Bilbo Baggins", bookData.characters[0].name)
        assertEquals(listOf("Burglar", "Mr. Baggins"), bookData.characters[0].aliases)
        assertEquals("A hobbit who goes on an adventure", bookData.characters[0].description)
        assertEquals(1, bookData.characters[0].firstAppearanceChapter)
        assertEquals("Gandalf", bookData.characters[1].name)
        assertEquals(listOf("Grey Wizard", "Mithrandir"), bookData.characters[1].aliases)
        assertEquals("A wise wizard", bookData.characters[1].description)
        assertEquals(1, bookData.characters[1].firstAppearanceChapter)
        assertEquals("Thorin Oakenshield", bookData.characters[2].name)
        assertEquals(emptyList<String>(), bookData.characters[2].aliases)
        assertEquals("The leader of the dwarves", bookData.characters[2].description)
        assertEquals(2, bookData.characters[2].firstAppearanceChapter)
    }
    
    @Test
    fun `should create book with both chapters and characters`() {
        val bookData = book {
            author("J.R.R. Tolkien")
            title("The Hobbit")
            chapters {
                title("An Unexpected Party")
                title("Roast Mutton")
            }
            characters {
                character {
                    name("Bilbo Baggins")
                    description("A hobbit")
                    firstAppearance(1)
                }
                character {
                    name("Gandalf")
                    description("A wizard")
                    firstAppearance(1)
                }
            }
        }
        
        assertNotNull(bookData.book)
        assertEquals("J.R.R. Tolkien", bookData.book.author.name)
        assertEquals("The Hobbit", bookData.book.title)
        assertEquals(2, bookData.chapters.size)
        assertEquals(2, bookData.characters.size)
        assertEquals("An Unexpected Party", bookData.chapters[0].title)
        assertEquals("Roast Mutton", bookData.chapters[1].title)
        assertEquals("Bilbo Baggins", bookData.characters[0].name)
        assertEquals(1, bookData.characters[0].firstAppearanceChapter)
        assertEquals("Gandalf", bookData.characters[1].name)
        assertEquals(1, bookData.characters[1].firstAppearanceChapter)
    }
    
    @Test
    fun `should create chapter with DSL`() {
        val bookData = book {
            author("J.R.R. Tolkien")
            title("The Hobbit")
        }
        
        val chapter = chapter {
            book(bookData.book)
            title("An Unexpected Party")
            index(1)
        }
        
        assertNotNull(chapter)
        assertEquals("An Unexpected Party", chapter.title)
        assertEquals(1, chapter.index)
        assertEquals(bookData.book, chapter.book)
    }
} 