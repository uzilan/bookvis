package bookvis.models

import kotlinx.serialization.Serializable

@Serializable
data class Relationship(
    val character1: Character,
    val character2: Character,
    val description: String,
    val chapter: Chapter,
)
