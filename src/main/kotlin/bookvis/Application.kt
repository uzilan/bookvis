package bookvis

import bookvis.routes.authorRoutes
import io.github.smiley4.ktoropenapi.OpenApi
import io.github.smiley4.ktoropenapi.get
import io.github.smiley4.ktoropenapi.openApi
import io.github.smiley4.ktorswaggerui.swaggerUI
import io.ktor.server.application.Application
import io.ktor.server.application.install
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import io.ktor.server.response.respondText
import io.ktor.server.routing.route
import io.ktor.server.routing.routing

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    install(OpenApi)

    routing {
        get("/") {
            call.respondText("Hello, BookVis!")
        }

        get("/health") {
            call.respondText("OK")
        }

        authorRoutes()

        route("api.json") {
            openApi()
        }

        route("swagger") {
            swaggerUI("/api.json") {
                // ...
            }
        }
    }
}
