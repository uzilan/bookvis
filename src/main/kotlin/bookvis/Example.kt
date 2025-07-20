package bookvis

import bookvis.models.Book
import bookvis.models.BookData
import bookvis.models.Chapter
import bookvis.models.Character
import bookvis.dsl.book
import bookvis.dsl.chapter

object Example {
    
    fun demonstrateSimpleDsl(): BookData {
        return book {
            author("J.R.R. Tolkien")
            title("The Lord of the Rings")
        }
    }
    
    fun createMultipleBooks(): List<BookData> {
        return listOf(
            book {
                author("J.K. Rowling")
                title("Harry Potter and the Philosopher's Stone")
            },
            book {
                author("J.K. Rowling")
                title("Harry Potter and the Chamber of Secrets")
            }
        )
    }
    
    fun createBookWithChapters(): BookData {
        return book {
            author("J.R.R. Tolkien")
            title("The Hobbit")
            chapters {
                title("An Unexpected Party")
                title("Roast Mutton")
                title("A Short Rest")
                title("Over Hill and Under Hill")
                title("Riddles in the Dark")
            }
        }
    }
    
    fun createBookWithCharacters(): BookData {
        return book {
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
                character {
                    name("Smaug")
                    description("A fearsome dragon")
                    firstAppearance(12)
                    aliases("The Dragon")
                }
            }
        }
    }
    
    fun createBookWithEverything(): BookData {
        return book {
            author("J.R.R. Tolkien")
            title("The Hobbit")
            chapters {
                title("An Unexpected Party")
                title("Roast Mutton")
                title("A Short Rest")
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
                character {
                    name("Thorin Oakenshield")
                    description("A dwarf")
                    firstAppearance(2)
                }
            }
        }
    }
    
    fun createBookWithChapter(): Pair<Book, Chapter> {
        val bookData = book {
            author("J.R.R. Tolkien")
            title("The Hobbit")
        }
        
        val chapter = chapter {
            book(bookData.book)
            title("An Unexpected Party")
            index(1)
        }
        
        return Pair(bookData.book, chapter)
    }
} 