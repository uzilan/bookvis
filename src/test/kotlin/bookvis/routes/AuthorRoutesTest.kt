package bookvis.routes

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
}
