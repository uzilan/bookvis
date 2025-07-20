package bookvis

import bookvis.models.Book
import bookvis.models.BookData
import bookvis.models.Chapter
import bookvis.models.Character
import bookvis.models.Relationship
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
        assertEquals(0, bookData.relationships.size)
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
        assertEquals(0, bookData.relationships.size)
    }
    
    @Test
    fun `should create book with characters using nested DSL`() {
        val bookData = book {
            author("J.R.R. Tolkien")
            title("The Hobbit")
            characters {
                character {
                    name("Bilbo Baggins")
                    id("bilbo")
                    description("A hobbit who goes on an adventure")
                    firstAppearance(1)
                    aliases("Burglar", "Mr. Baggins")
                }
                character {
                    name("Gandalf")
                    id("gandalf")
                    description("A wise wizard")
                    firstAppearance(1)
                    aliases("Grey Wizard", "Mithrandir")
                }
                character {
                    name("Thorin Oakenshield")
                    id("thorin")
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
        assertEquals("bilbo", bookData.characters[0].id)
        assertEquals(listOf("Burglar", "Mr. Baggins"), bookData.characters[0].aliases)
        assertEquals("A hobbit who goes on an adventure", bookData.characters[0].description)
        assertEquals(1, bookData.characters[0].firstAppearanceChapter)
        assertEquals("Gandalf", bookData.characters[1].name)
        assertEquals("gandalf", bookData.characters[1].id)
        assertEquals(listOf("Grey Wizard", "Mithrandir"), bookData.characters[1].aliases)
        assertEquals("A wise wizard", bookData.characters[1].description)
        assertEquals(1, bookData.characters[1].firstAppearanceChapter)
        assertEquals("Thorin Oakenshield", bookData.characters[2].name)
        assertEquals("thorin", bookData.characters[2].id)
        assertEquals(emptyList<String>(), bookData.characters[2].aliases)
        assertEquals("The leader of the dwarves", bookData.characters[2].description)
        assertEquals(2, bookData.characters[2].firstAppearanceChapter)
        assertEquals(0, bookData.relationships.size)
    }
    
    @Test
    fun `should create book with relationships using nested DSL`() {
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
                    id("bilbo")
                    description("A hobbit")
                    firstAppearance(1)
                }
                character {
                    name("Gandalf")
                    id("gandalf")
                    description("A wizard")
                    firstAppearance(1)
                }
                character {
                    name("Thorin Oakenshield")
                    id("thorin")
                    description("A dwarf")
                    firstAppearance(2)
                }
            }
            relationships {
                relationship {
                    between("bilbo", "gandalf")
                    description("Mentor and mentee relationship")
                    chapter("An Unexpected Party")
                }
                relationship {
                    between("bilbo", "thorin")
                    description("Reluctant allies")
                    chapter("Roast Mutton")
                }
            }
        }
        
        assertNotNull(bookData.book)
        assertEquals("J.R.R. Tolkien", bookData.book.author.name)
        assertEquals("The Hobbit", bookData.book.title)
        assertEquals(2, bookData.chapters.size)
        assertEquals(3, bookData.characters.size)
        assertEquals(2, bookData.relationships.size)
        
        val bilboGandalf = bookData.relationships.find { 
            it.character1.id == "bilbo" && it.character2.id == "gandalf" ||
            it.character1.id == "gandalf" && it.character2.id == "bilbo"
        }
        assertNotNull(bilboGandalf)
        assertEquals("Mentor and mentee relationship", bilboGandalf!!.description)
        assertEquals("An Unexpected Party", bilboGandalf.chapter.title)
        
        val bilboThorin = bookData.relationships.find { 
            it.character1.id == "bilbo" && it.character2.id == "thorin" ||
            it.character1.id == "thorin" && it.character2.id == "bilbo"
        }
        assertNotNull(bilboThorin)
        assertEquals("Reluctant allies", bilboThorin!!.description)
        assertEquals("Roast Mutton", bilboThorin.chapter.title)
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
                    id("bilbo")
                    description("A hobbit")
                    firstAppearance(1)
                }
                character {
                    name("Gandalf")
                    id("gandalf")
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
        assertEquals("bilbo", bookData.characters[0].id)
        assertEquals(1, bookData.characters[0].firstAppearanceChapter)
        assertEquals("Gandalf", bookData.characters[1].name)
        assertEquals("gandalf", bookData.characters[1].id)
        assertEquals(1, bookData.characters[1].firstAppearanceChapter)
        assertEquals(0, bookData.relationships.size)
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