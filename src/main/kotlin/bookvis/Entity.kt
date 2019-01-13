package bookvis

import org.neo4j.ogm.annotation.GeneratedValue
import org.neo4j.ogm.annotation.Id

abstract class Entity {

    @Id
    @GeneratedValue
    var id: Long = -1L
}