package bookvis.routes

import bookvis.models.Author
import io.ktor.http.HttpStatusCode
import io.ktor.server.application.call
import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.routing.route
import kotlinx.serialization.Serializable
import mu.KotlinLogging

private val logger = KotlinLogging.logger {}

@Serializable
data class AuthorRequest(
    val name: String,
)

fun Route.bookRoutes() {
    route("/api/authors") {
        post("/create") {
            try {
                val request = call.receive<AuthorRequest>()
                logger.info { "Creating author: ${request.name}" }

                val author = Author(request.name)

                call.respond(HttpStatusCode.Created, author)
            } catch (e: Exception) {
                logger.error(e) { "Error creating author" }
                call.respond(HttpStatusCode.BadRequest, mapOf("error" to e.message))
            }
        }

        get("/example") {
            val author = Author("J.R.R. Tolkien")
            call.respond(author)
        }
    }
}
