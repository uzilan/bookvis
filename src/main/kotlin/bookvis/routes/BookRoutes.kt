package bookvis.routes

import bookvis.models.Author
import io.github.smiley4.ktoropenapi.get
import io.github.smiley4.ktoropenapi.post
import io.ktor.http.HttpStatusCode
import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.route
import kotlinx.serialization.Serializable
import org.slf4j.LoggerFactory

private val logger = LoggerFactory.getLogger("BookvisRoutes")

@Serializable
data class AuthorRequest(
    val name: String,
)

@Serializable
data class ErrorResponse(
    val error: String,
)

fun Route.bookRoutes() {
    route("/api/authors") {
        post("/create", {
            description = "Create an author"
            response {
                HttpStatusCode.OK to {
                    description = "Author created"
                    body<String>()
                }
            }
        }) {
            try {
                val request = call.receive<AuthorRequest>()
                logger.info("Creating author: ${request.name}")

                val author = Author(request.name)

                call.respond(HttpStatusCode.Created, author)
            } catch (e: Exception) {
                logger.error("Error creating author", e)
                call.respond(HttpStatusCode.BadRequest, ErrorResponse(e.message ?: "Unknown error"))
            }
        }

        get("/example") {
            val author = Author("J.R.R. Tolkien")
            call.respond(author)
        }
    }
}
