package bookvis

import bookvis.dsl.book
import bookvis.dsl.chapter
import bookvis.models.Book
import bookvis.models.BookData
import bookvis.models.Chapter

object Example {
    fun demonstrateSimpleDsl(): BookData =
        book {
            author("tolkien", "J.R.R. Tolkien")
            title("The Lord of the Rings")
        }

    fun createMultipleBooks(): List<BookData> =
        listOf(
            book {
                author("rowling", "J.K. Rowling")
                title("Harry Potter and the Philosopher's Stone")
            },
            book {
                author("rowling", "J.K. Rowling")
                title("Harry Potter and the Chamber of Secrets")
            },
        )

    fun createBookWithChapters(): BookData =
        book {
            author("tolkien", "J.R.R. Tolkien")
            title("The Hobbit")
            chapters {
                title("An Unexpected Party")
                title("Roast Mutton")
                title("A Short Rest")
                title("Over Hill and Under Hill")
                title("Riddles in the Dark")
            }
        }

    fun createBookWithCharacters(): BookData =
        book {
            author("tolkien", "J.R.R. Tolkien")
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
                character {
                    name("Smaug")
                    id("smaug")
                    description("A fearsome dragon")
                    firstAppearance(12)
                    aliases("The Dragon")
                }
            }
        }

    fun createBookWithEverything(): BookData =
        book {
            author("tolkien", "J.R.R. Tolkien")
            title("The Hobbit")
            chapters {
                title("An Unexpected Party")
                title("Roast Mutton")
                title("A Short Rest")
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
        }

    fun createBookWithAttributes(): BookData =
        book {
            author("tolkien", "J.R.R. Tolkien")
            title("The Hobbit")
            characters {
                character {
                    name("Bilbo Baggins")
                    id("bilbo")
                    description("A hobbit")
                    firstAppearance(1)
                    attributes("brave", "curious", "loyal", "homesick")
                }
                character {
                    name("Gandalf")
                    id("gandalf")
                    description("A wizard")
                    firstAppearance(1)
                    attributes("wise", "powerful", "mysterious", "kind")
                }
                character {
                    name("Thorin Oakenshield")
                    id("thorin")
                    description("A dwarf")
                    firstAppearance(2)
                    attributes("proud", "stubborn", "noble", "greedy")
                }
                character {
                    name("Smaug")
                    id("smaug")
                    description("A dragon")
                    firstAppearance(12)
                    attributes("greedy", "cunning", "fearsome", "vain")
                }
            }
        }

    fun createBookWithFactions(): BookData =
        book {
            author("tolkien", "J.R.R. Tolkien")
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
                faction {
                    title("Dragons")
                    id("dragons")
                    description("Ancient, greedy creatures who hoard treasure")
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
                character {
                    name("Smaug")
                    id("smaug")
                    description("A dragon")
                    firstAppearance(12)
                    factions("dragons")
                }
            }
        }

    fun createBookWithRelationships(): BookData =
        book {
            author("tolkien", "J.R.R. Tolkien")
            title("The Hobbit")
            chapters {
                title("An Unexpected Party")
                title("Roast Mutton")
                title("A Short Rest")
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
                character {
                    name("Smaug")
                    id("smaug")
                    description("A dragon")
                    firstAppearance(12)
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
                    description("Reluctant allies who grow to respect each other")
                    chapter("Roast Mutton")
                }
                relationship {
                    character1("bilbo")
                    character2("smaug")
                    description("Adversaries in a battle of wits")
                    chapter("Riddles in the Dark")
                }
            }
        }

    fun createBookWithChapter(): Pair<Book, Chapter> {
        val bookData =
            book {
                author("tolkien", "J.R.R. Tolkien")
                title("The Hobbit")
            }

        val chapter =
            chapter {
                book(bookData.book)
                title("An Unexpected Party")
                index(1)
            }

        return Pair(bookData.book, chapter)
    }
}
