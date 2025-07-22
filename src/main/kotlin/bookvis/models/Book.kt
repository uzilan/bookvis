package bookvis.models

import kotlinx.serialization.Serializable

@Serializable
data class Book(
    val id: String,
    val author: Author,
    val title: String,
)
