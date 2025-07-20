package bookvis.models

import kotlinx.serialization.Serializable

@Serializable
data class Book(
    val author: Author,
    val title: String,
)
