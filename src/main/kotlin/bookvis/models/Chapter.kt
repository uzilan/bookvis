package bookvis.models

import kotlinx.serialization.Serializable

@Serializable
data class Chapter(
    val book: Book,
    val title: String,
    val index: Int,
)
