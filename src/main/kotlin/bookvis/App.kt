package bookvis

import org.neo4j.graphdb.factory.GraphDatabaseFactory
import org.neo4j.graphdb.factory.GraphDatabaseSettings
import org.neo4j.ogm.drivers.embedded.driver.EmbeddedDriver
import org.neo4j.ogm.session.SessionFactory
import java.io.File

val databaseDirectory = File("db")

object App {
    private val db = GraphDatabaseFactory()
            .newEmbeddedDatabaseBuilder(databaseDirectory)
            .setConfig(GraphDatabaseSettings.pagecache_memory, "512M")
            .newGraphDatabase()

    private val driver = EmbeddedDriver(db)

    private val sessionFactory = SessionFactory(driver, "bookvis")

    val session = sessionFactory.openSession()!!
}
