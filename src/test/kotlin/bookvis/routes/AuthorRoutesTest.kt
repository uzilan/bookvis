package bookvis.routes

import bookvis.models.Author
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

class AuthorRoutesTest {
    @Test
    fun testCreateAuthor() =
        testApplication {
            application {
                this@application.install(ContentNegotiation) {
                    json(Json { prettyPrint = true })
                }
                routing {
                    authorRoutes()
                }
            }

            val requestBody = AuthorRequest("asimov", "Isaac Asimov")

            val response =
                client.post("/api/authors/create") {
                    contentType(ContentType.Application.Json)
                    setBody(Json.encodeToString(AuthorRequest.serializer(), requestBody))
                }

            assertThat(response.status).isEqualTo(HttpStatusCode.Created)

            val responseBody = Json.decodeFromString(AuthorRequest.serializer(), response.bodyAsText())
            assertThat(responseBody).usingRecursiveComparison().isEqualTo(requestBody)
        }

    @Test
    fun testGetAllAuthors() =
        testApplication {
            application {
                this@application.install(ContentNegotiation) {
                    json(Json { prettyPrint = true })
                }
                routing {
                    authorRoutes()
                }
            }

            val author1 = Author("asimov", "Isaac Asimov")
            val author2 = Author("tolkien", "J.R.R. Tolkien")

            client.post("/api/authors/create") {
                contentType(ContentType.Application.Json)
                setBody(Json.encodeToString(AuthorRequest.serializer(), AuthorRequest(author1.id, author1.name)))
            }
            client.post("/api/authors/create") {
                contentType(ContentType.Application.Json)
                setBody(Json.encodeToString(AuthorRequest.serializer(), AuthorRequest(author2.id, author2.name)))
            }

            val response = client.get("/api/authors")
            assertThat(response.status).isEqualTo(HttpStatusCode.OK)

            val authors = Json.decodeFromString(ListSerializer(Author.serializer()), response.bodyAsText())
            assertThat(authors).containsExactlyInAnyOrder(author1, author2)
        }

    @Test
    fun testGetAuthorById() =
        testApplication {
            application {
                this@application.install(ContentNegotiation) {
                    json(Json { prettyPrint = true })
                }
                routing {
                    authorRoutes()
                }
            }

            val author = Author("asimov", "Isaac Asimov")
            client.post("/api/authors/create") {
                contentType(ContentType.Application.Json)
                setBody(Json.encodeToString(AuthorRequest.serializer(), AuthorRequest(author.id, author.name)))
            }

            val response = client.get("/api/authors/${author.id}")
            assertThat(response.status).isEqualTo(HttpStatusCode.OK)

            val fetchedAuthor = Json.decodeFromString(Author.serializer(), response.bodyAsText())
            assertThat(fetchedAuthor).isEqualTo(author)
        }
}
