package bookvis.dsl

import bookvis.models.Faction

@DslMarker
annotation class FactionsDsl

@FactionsDsl
class FactionBuilder {
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

    fun build(): Faction =
        Faction(
            id = factionId,
            title = factionTitle,
            description = factionDescription,
        )
}

@FactionsDsl
class FactionsBuilder {
    private val factions = mutableListOf<Faction>()

    fun faction(init: FactionBuilder.() -> Unit) {
        val factionBuilder = FactionBuilder()
        factionBuilder.init()
        factions.add(factionBuilder.build())
    }

    fun getFactions(): List<Faction> = factions.toList()
}
