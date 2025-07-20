package bookvis.models

data class BookData(
    val book: Book,
    val chapters: List<Chapter>,
    val characters: List<Character>
) 