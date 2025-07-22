package bookvis.routes

import bookvis.routes.ErrorResponse
import bookvis.services.Services
import io.github.smiley4.ktoropenapi.get
import io.ktor.http.HttpStatusCode
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.route
import org.slf4j.LoggerFactory

private val logger = LoggerFactory.getLogger("BookRoutes")

fun Route.bookRoutes() {
    route("/api/authors/{authorId}/books") {
        get({
            description = "Get all books by author ID"
            response {
                HttpStatusCode.OK to {
                    description = "Books found"
                    body<List<bookvis.models.Book>>()
                }
                HttpStatusCode.NotFound to {
                    description = "Author not found"
                    body<ErrorResponse>()
                }
            }
        }) {
            try {
                val authorId = call.parameters["authorId"]
                if (authorId == null) {
                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("Author ID is required"))
                    return@get
                }

                // First check if author exists
                val author = Services.authorService.getAuthor(authorId)
                if (author == null) {
                    call.respond(HttpStatusCode.NotFound, ErrorResponse("Author not found"))
                    return@get
                }

                val books = Services.bookService.getBooksByAuthorId(authorId)
                call.respond(HttpStatusCode.OK, books)
            } catch (e: Exception) {
                logger.error("Error fetching books by author", e)
                call.respond(
                    HttpStatusCode.InternalServerError,
                    ErrorResponse(
                        e.message ?: "Error fetching books by author",
                    ),
                )
            }
        }

        get("/{bookId}", {
            description = "Get a specific book by ID for an author"
            response {
                HttpStatusCode.OK to {
                    description = "Book found"
                    body<bookvis.models.Book>()
                }
                HttpStatusCode.NotFound to {
                    description = "Book not found"
                    body<ErrorResponse>()
                }
            }
        }) {
            try {
                val authorId = call.parameters["authorId"]
                val bookId = call.parameters["bookId"]

                if (authorId == null) {
                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("Author ID is required"))
                    return@get
                }
                if (bookId == null) {
                    call.respond(HttpStatusCode.BadRequest, ErrorResponse("Book ID is required"))
                    return@get
                }

                // First check if author exists
                val author = Services.authorService.getAuthor(authorId)
                if (author == null) {
                    call.respond(HttpStatusCode.NotFound, ErrorResponse("Author not found"))
                    return@get
                }

                // Then get the book by ID
                val book = Services.bookService.getBookById(bookId)
                if (book != null && book.author.id == authorId) {
                    call.respond(HttpStatusCode.OK, book)
                } else {
                    call.respond(HttpStatusCode.NotFound, ErrorResponse("Book not found for this author"))
                }
            } catch (e: Exception) {
                logger.error("Error fetching book by ID for author", e)
                call.respond(
                    HttpStatusCode.InternalServerError,
                    ErrorResponse(
                        e.message ?: "Error fetching book by ID for author",
                    ),
                )
            }
        }
    }
}
