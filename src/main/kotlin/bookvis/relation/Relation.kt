package bookvis.relation

import bookvis.Entity
import bookvis.character.Character
import org.neo4j.ogm.annotation.EndNode
import org.neo4j.ogm.annotation.RelationshipEntity
import org.neo4j.ogm.annotation.StartNode

@RelationshipEntity(type = "RELATION")
data class Relation(
        @StartNode var from: Character,
        @EndNode var to: Character,
        val description: String
) : Entity() {
    init {
        from.relations.add(this)
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Relation

        if (id != other.id) return false

        return true
    }
}