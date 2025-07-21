package bookvis.routes

import bookvis.models.Author
import io.github.smiley4.ktoropenapi.post
import io.ktor.http.HttpStatusCode
import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.route
import kotlinx.serialization.Serializable
import org.slf4j.LoggerFactory

@Serializable
data class AuthorRequest(
    val id: String,
    val name: String,
)

@Serializable
data class ErrorResponse(
    val error: String,
)

private val logger = LoggerFactory.getLogger("AuthorRoutes")

fun Route.authorRoutes() {
    route("/api/authors") {
        post("/create", {
            description = "Create an author"
            response {
                HttpStatusCode.OK to {
                    description = "Author created"
                    body<AuthorRequest> {
                        example("default") {
                            value = AuthorRequest("tolkien", "J.R.R. Tolkien")
                        }
                    }
                }
            }
        }) {
            try {
                val request = call.receive<AuthorRequest>()
                logger.info("Creating author: ${request.name} with id: ${request.id}")

                val author = Author(request.id, request.name)

                call.respond(HttpStatusCode.Created, author)
            } catch (e: Exception) {
                logger.error("Error creating author", e)
                call.respond(
                    HttpStatusCode.BadRequest,
                    ErrorResponse(e.message ?: "Error creating author"),
                )
            }
        }
    }
}
