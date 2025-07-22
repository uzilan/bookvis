package bookvis.routes

import bookvis.services.AuthorService
import io.github.smiley4.ktoropenapi.get
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
private val authorService = AuthorService()

fun Route.authorRoutes() {
    route("/api/authors") {
        get({
            description = "Get all authors"
            response {
                HttpStatusCode.OK to {
                    description = "List of all authors"
                    body<List<bookvis.models.Author>>()
                }
            }
        }) {
            try {
                val authors = authorService.getAllAuthors()
                call.respond(HttpStatusCode.OK, authors)
            } catch (e: Exception) {
                logger.error("Error fetching all authors", e)
                call.respond(
                    HttpStatusCode.InternalServerError,
                    ErrorResponse(e.message ?: "Error fetching all authors"),
                )
            }
        }

        get("/{id}", {
            description = "Get an author by ID"
            response {
                HttpStatusCode.OK to {
                    description = "Author found"
                    body<bookvis.models.Author> {
                        example("default") {
                            value = bookvis.models.Author("tolkien", "J.R.R. Tolkien")
                        }
                    }
                }
                HttpStatusCode.NotFound to {
                    description = "Author not found"
                    body<ErrorResponse> {
                        example("default") {
                            value = ErrorResponse("Author not found")
                        }
                    }
                }
            }
        }) {
            try {
                val authorId = call.parameters["id"]
                if (authorId == null) {
                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("Author ID is required"))
                    return@get
                }

                val author = authorService.getAuthor(authorId)
                if (author != null) {
                    call.respond(HttpStatusCode.OK, author)
                } else {
                    call.respond(HttpStatusCode.NotFound, ErrorResponse("Author not found"))
                }
            } catch (e: Exception) {
                logger.error("Error fetching author", e)
                call.respond(HttpStatusCode.InternalServerError, ErrorResponse(e.message ?: "Error fetching author"))
            }
        }

        post("/create", {
            description = "Create an author"
            response {
                HttpStatusCode.Created to {
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
                val author = authorService.createAuthor(request.id, request.name)
                call.respond(HttpStatusCode.Created, author)
            } catch (e: Exception) {
                logger.error("Error creating author", e)
                call.respond(HttpStatusCode.BadRequest, ErrorResponse(e.message ?: "Error creating author"))
            }
        }
    }
}
