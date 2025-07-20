package bookvis.models

data class Character(
    val book: Book,
    val name: String,
    val id: String,
    val aliases: List<String>,
    val description: String,
    val firstAppearanceChapter: Int,
    val factions: List<Faction>,
    val attributes: List<String>
) 