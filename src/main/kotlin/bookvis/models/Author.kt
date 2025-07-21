package bookvis.models

import kotlinx.serialization.Serializable

@Serializable
data class Author(
    val id: String,
    val name: String,
)
