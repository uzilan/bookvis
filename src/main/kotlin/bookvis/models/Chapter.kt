package bookvis.models

import kotlinx.serialization.Serializable

@Serializable
// Updated to support hierarchy and metadata for chapters
// parent is nullable and not recursive in serialization to avoid cycles
// path is a list of strings representing the full hierarchy
// type is 'chapter', 'part', 'book', or 'volume'
data class Chapter(
    val book: Book,
    val title: String,
    val index: Int,
    val parent: Chapter? = null,
    val level: Int? = null,
    val type: String? = null,
    val partTitle: String? = null,
    val globalIndex: Int? = null,
    val path: List<String>? = null,
)
