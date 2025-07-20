package bookvis

import bookvis.dsl.book
import bookvis.dsl.chapter
import bookvis.models.Faction
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test

class DslTest {
    @Test
    fun `should create book with DSL`() {
        val bookData =
            book {
                author("J.R.R. Tolkien")
                title("The Hobbit")
            }

        assertNotNull(bookData.book)
        assertEquals("J.R.R. Tolkien", bookData.book.author.name)
        assertEquals("The Hobbit", bookData.book.title)
        assertEquals(0, bookData.chapters.size)
        assertEquals(0, bookData.characters.size)
        assertEquals(0, bookData.relationships.size)
        assertEquals(0, bookData.factions.size)
    }

    @Test
    fun `should create book with chapters using nested DSL`() {
        val bookData =
            book {
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
        assertEquals(0, bookData.factions.size)
    }

    @Test
    fun `should create book with factions using nested DSL`() {
        val bookData =
            book {
                author("J.R.R. Tolkien")
                title("The Hobbit")
                factions {
                    faction {
                        title("Dwarves")
                        id("dwarves")
                        description("A proud race of miners and craftsmen")
                    }
                    faction {
                        title("Wizards")
                        id("wizards")
                        description("Mystical beings with great power")
                    }
                    faction {
                        title("Hobbits")
                        id("hobbits")
                        description("Small, peaceful folk who love comfort")
                    }
                }
            }

        assertNotNull(bookData.book)
        assertEquals("J.R.R. Tolkien", bookData.book.author.name)
        assertEquals("The Hobbit", bookData.book.title)
        assertEquals(0, bookData.chapters.size)
        assertEquals(0, bookData.characters.size)
        assertEquals(0, bookData.relationships.size)
        assertEquals(3, bookData.factions.size)

        assertEquals("Dwarves", bookData.factions[0].title)
        assertEquals("dwarves", bookData.factions[0].id)
        assertEquals("A proud race of miners and craftsmen", bookData.factions[0].description)
        assertEquals("Wizards", bookData.factions[1].title)
        assertEquals("wizards", bookData.factions[1].id)
        assertEquals("Mystical beings with great power", bookData.factions[1].description)
        assertEquals("Hobbits", bookData.factions[2].title)
        assertEquals("hobbits", bookData.factions[2].id)
        assertEquals("Small, peaceful folk who love comfort", bookData.factions[2].description)
    }

    @Test
    fun `should create book with characters using nested DSL`() {
        val bookData =
            book {
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
        assertEquals(emptyList<String>(), bookData.characters[0].factions)
        assertEquals(emptyList<String>(), bookData.characters[0].attributes)
        assertEquals("Gandalf", bookData.characters[1].name)
        assertEquals("gandalf", bookData.characters[1].id)
        assertEquals(listOf("Grey Wizard", "Mithrandir"), bookData.characters[1].aliases)
        assertEquals("A wise wizard", bookData.characters[1].description)
        assertEquals(1, bookData.characters[1].firstAppearanceChapter)
        assertEquals(emptyList<String>(), bookData.characters[1].factions)
        assertEquals(emptyList<String>(), bookData.characters[1].attributes)
        assertEquals("Thorin Oakenshield", bookData.characters[2].name)
        assertEquals("thorin", bookData.characters[2].id)
        assertEquals(emptyList<String>(), bookData.characters[2].aliases)
        assertEquals("The leader of the dwarves", bookData.characters[2].description)
        assertEquals(2, bookData.characters[2].firstAppearanceChapter)
        assertEquals(emptyList<String>(), bookData.characters[2].factions)
        assertEquals(emptyList<String>(), bookData.characters[2].attributes)
        assertEquals(0, bookData.relationships.size)
        assertEquals(0, bookData.factions.size)
    }

    @Test
    fun `should create book with characters and attributes`() {
        val bookData =
            book {
                author("J.R.R. Tolkien")
                title("The Hobbit")
                characters {
                    character {
                        name("Bilbo Baggins")
                        id("bilbo")
                        description("A hobbit")
                        firstAppearance(1)
                        attributes("brave", "curious", "loyal")
                    }
                    character {
                        name("Gandalf")
                        id("gandalf")
                        description("A wizard")
                        firstAppearance(1)
                        attributes("wise", "powerful", "mysterious")
                    }
                    character {
                        name("Thorin Oakenshield")
                        id("thorin")
                        description("A dwarf")
                        firstAppearance(2)
                        attributes("proud", "stubborn", "noble")
                    }
                }
            }

        assertNotNull(bookData.book)
        assertEquals("J.R.R. Tolkien", bookData.book.author.name)
        assertEquals("The Hobbit", bookData.book.title)
        assertEquals(0, bookData.chapters.size)
        assertEquals(3, bookData.characters.size)
        assertEquals(0, bookData.relationships.size)
        assertEquals(0, bookData.factions.size)

        // Check character attributes
        val bilbo = bookData.characters.find { it.id == "bilbo" }
        assertNotNull(bilbo)
        assertEquals(3, bilbo!!.attributes.size)
        assertEquals("brave", bilbo.attributes[0])
        assertEquals("curious", bilbo.attributes[1])
        assertEquals("loyal", bilbo.attributes[2])

        val gandalf = bookData.characters.find { it.id == "gandalf" }
        assertNotNull(gandalf)
        assertEquals(3, gandalf!!.attributes.size)
        assertEquals("wise", gandalf.attributes[0])
        assertEquals("powerful", gandalf.attributes[1])
        assertEquals("mysterious", gandalf.attributes[2])

        val thorin = bookData.characters.find { it.id == "thorin" }
        assertNotNull(thorin)
        assertEquals(3, thorin!!.attributes.size)
        assertEquals("proud", thorin.attributes[0])
        assertEquals("stubborn", thorin.attributes[1])
        assertEquals("noble", thorin.attributes[2])
    }

    @Test
    fun `should create book with characters and factions`() {
        val bookData =
            book {
                author("J.R.R. Tolkien")
                title("The Hobbit")
                factions {
                    faction {
                        title("Dwarves")
                        id("dwarves")
                        description("A proud race of miners and craftsmen")
                    }
                    faction {
                        title("Wizards")
                        id("wizards")
                        description("Mystical beings with great power")
                    }
                    faction {
                        title("Hobbits")
                        id("hobbits")
                        description("Small, peaceful folk who love comfort")
                    }
                }
                characters {
                    character {
                        name("Bilbo Baggins")
                        id("bilbo")
                        description("A hobbit")
                        firstAppearance(1)
                        factions("hobbits")
                    }
                    character {
                        name("Gandalf")
                        id("gandalf")
                        description("A wizard")
                        firstAppearance(1)
                        factions("wizards")
                    }
                    character {
                        name("Thorin Oakenshield")
                        id("thorin")
                        description("A dwarf")
                        firstAppearance(2)
                        factions("dwarves")
                    }
                    character {
                        name("Balin")
                        id("balin")
                        description("A dwarf")
                        firstAppearance(2)
                        factions("dwarves")
                    }
                }
            }

        assertNotNull(bookData.book)
        assertEquals("J.R.R. Tolkien", bookData.book.author.name)
        assertEquals("The Hobbit", bookData.book.title)
        assertEquals(0, bookData.chapters.size)
        assertEquals(4, bookData.characters.size)
        assertEquals(3, bookData.factions.size)

        // Check character faction membership
        val bilbo = bookData.characters.find { it.id == "bilbo" }
        assertNotNull(bilbo)
        assertEquals(1, bilbo!!.factions.size)
        assertEquals("hobbits", bilbo.factions[0])

        val gandalf = bookData.characters.find { it.id == "gandalf" }
        assertNotNull(gandalf)
        assertEquals(1, gandalf!!.factions.size)
        assertEquals("wizards", gandalf.factions[0])

        val thorin = bookData.characters.find { it.id == "thorin" }
        assertNotNull(thorin)
        assertEquals(1, thorin!!.factions.size)
        assertEquals("dwarves", thorin.factions[0])

        val balin = bookData.characters.find { it.id == "balin" }
        assertNotNull(balin)
        assertEquals(1, balin!!.factions.size)
        assertEquals("dwarves", balin.factions[0])
    }

    @Test
    fun `should create book with relationships using nested DSL`() {
        val bookData =
            book {
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
                        character1("bilbo")
                        character2("gandalf")
                        description("Mentor and mentee relationship")
                        chapter("An Unexpected Party")
                    }
                    relationship {
                        character1("bilbo")
                        character2("thorin")
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
        assertEquals(0, bookData.factions.size)

        val bilboGandalf =
            bookData.relationships.find {
                it.character1.id == "bilbo" &&
                    it.character2.id == "gandalf" ||
                    it.character1.id == "gandalf" &&
                    it.character2.id == "bilbo"
            }
        assertNotNull(bilboGandalf)
        assertEquals("Mentor and mentee relationship", bilboGandalf!!.description)
        assertEquals("An Unexpected Party", bilboGandalf.chapter.title)

        val bilboThorin =
            bookData.relationships.find {
                it.character1.id == "bilbo" &&
                    it.character2.id == "thorin" ||
                    it.character1.id == "thorin" &&
                    it.character2.id == "bilbo"
            }
        assertNotNull(bilboThorin)
        assertEquals("Reluctant allies", bilboThorin!!.description)
        assertEquals("Roast Mutton", bilboThorin.chapter.title)
    }

    @Test
    fun `should create book with both chapters and characters`() {
        val bookData =
            book {
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
        assertEquals(0, bookData.factions.size)
    }

    @Test
    fun `should create chapter with DSL`() {
        val bookData =
            book {
                author("J.R.R. Tolkien")
                title("The Hobbit")
            }

        val chapter =
            chapter {
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
