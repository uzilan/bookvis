package bookvis.models

data class BookData(
    val book: Book,
    val chapters: List<Chapter>,
    val characters: List<Character>,
    val relationships: List<Relationship>,
    val factions: List<Faction>,
)
