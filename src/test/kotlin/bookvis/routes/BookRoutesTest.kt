package bookvis.routes

import bookvis.models.Author
import bookvis.models.Book
import io.ktor.client.request.get
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.client.statement.bodyAsText
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.http.contentType
import io.ktor.serialization.kotlinx.json.json
import io.ktor.server.application.install
import io.ktor.server.plugins.contentnegotiation.ContentNegotiation
import io.ktor.server.routing.routing
import io.ktor.server.testing.testApplication
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.json.Json
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

class BookRoutesTest {
    @Test
    fun testGetBooksByAuthorId() =
        testApplication {
            application {
                this@application.install(ContentNegotiation) {
                    json(Json { prettyPrint = true })
                }
                routing {
                    bookRoutes()
                    authorRoutes()
                }
            }

            val author = Author("tolkien", "J.R.R. Tolkien")

            // Create author first
            client.post("/api/authors/create") {
                contentType(ContentType.Application.Json)
                setBody(Json.encodeToString(AuthorRequest.serializer(), AuthorRequest(author.id, author.name)))
            }

            // Test getting books for an author (will be empty since no books are created via API)
            val response = client.get("/api/authors/${author.id}/books")
            assertThat(response.status).isEqualTo(HttpStatusCode.OK)

            val books = Json.decodeFromString(ListSerializer(Book.serializer()), response.bodyAsText())
            assertThat(books).isEmpty()
        }

    @Test
    fun testGetBookByIdForAuthor() =
        testApplication {
            application {
                this@application.install(ContentNegotiation) {
                    json(Json { prettyPrint = true })
                }
                routing {
                    bookRoutes()
                    authorRoutes()
                }
            }

            val author = Author("tolkien", "J.R.R. Tolkien")

            // Create author first
            client.post("/api/authors/create") {
                contentType(ContentType.Application.Json)
                setBody(Json.encodeToString(AuthorRequest.serializer(), AuthorRequest(author.id, author.name)))
            }

            // Test getting a specific book by ID for an author (will be not found since no books are created via API)
            val response = client.get("/api/authors/${author.id}/books/the-hobbit")
            assertThat(response.status).isEqualTo(HttpStatusCode.NotFound)
        }

    @Test
    fun testGetBookByIdForNonExistentAuthor() =
        testApplication {
            application {
                this@application.install(ContentNegotiation) {
                    json(Json { prettyPrint = true })
                }
                routing {
                    bookRoutes()
                    authorRoutes()
                }
            }

            // Test getting books for a non-existent author
            val response = client.get("/api/authors/nonexistent/books")
            assertThat(response.status).isEqualTo(HttpStatusCode.NotFound)
        }
}
