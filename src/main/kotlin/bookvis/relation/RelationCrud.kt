package bookvis.relation

import bookvis.BaseCrud

class RelationCrud : BaseCrud<Relation>() {
    override fun getEntityType(): Class<Relation> {
        return Relation::class.java
    }
}