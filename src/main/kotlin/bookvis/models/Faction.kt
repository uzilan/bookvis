package bookvis.models

import kotlinx.serialization.Serializable

@Serializable
data class Faction(
    val id: String,
    val title: String,
    val description: String,
)
