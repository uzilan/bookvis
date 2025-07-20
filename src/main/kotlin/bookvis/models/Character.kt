package bookvis.models

import kotlinx.serialization.Serializable

@Serializable
data class Character(
    val name: String,
    val id: String,
    val description: String,
    val firstAppearanceChapter: Int,
    val aliases: List<String>,
    val factions: List<String>,
    val attributes: List<String>,
)
