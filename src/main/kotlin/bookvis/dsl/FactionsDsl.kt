package bookvis.dsl

import bookvis.models.Book
import bookvis.models.Faction

@DslMarker
annotation class FactionsDsl

@FactionsDsl
class FactionBuilder(private val book: Book) {
    private var factionTitle: String = ""
    private var factionId: String = ""
    private var factionDescription: String = ""
    
    fun title(title: String) {
        factionTitle = title
    }
    
    fun id(id: String) {
        factionId = id
    }
    
    fun description(desc: String) {
        factionDescription = desc
    }
    
    fun build(): Faction {
        return Faction(book, factionTitle, factionId, factionDescription)
    }
}

@FactionsDsl
class FactionsBuilder(private val book: Book) {
    private val factions = mutableListOf<Faction>()
    
    fun faction(init: FactionBuilder.() -> Unit) {
        val factionBuilder = FactionBuilder(book)
        factionBuilder.init()
        factions.add(factionBuilder.build())
    }
    
    fun getFactions(): List<Faction> = factions.toList()
} 