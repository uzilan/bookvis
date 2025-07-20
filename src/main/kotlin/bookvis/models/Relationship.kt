package bookvis.models

data class Relationship(
    val book: Book,
    val character1: Character,
    val character2: Character,
    val description: String,
    val chapter: Chapter
) 