plugins {
    kotlin("jvm") version "2.1.21"
    id("org.jlleitschuh.gradle.ktlint") version "13.0.0"
    kotlin("plugin.serialization") version "2.1.21"
    id("com.github.johnrengelman.shadow") version "8.1.1"
}

group = "bookvis"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(17))
    }
}

val ktorVersion = "3.2.2"

dependencies {
    implementation("io.ktor:ktor-server-core:$ktorVersion")
    implementation("io.ktor:ktor-server-netty:$ktorVersion")
    implementation("io.ktor:ktor-server-content-negotiation:$ktorVersion")
    implementation("io.ktor:ktor-serialization-kotlinx-json:$ktorVersion")
    implementation("io.ktor:ktor-server-cors:$ktorVersion")
    implementation("io.ktor:ktor-server-call-logging:$ktorVersion")
    implementation("io.github.smiley4:ktor-swagger-ui:5.1.0")
    implementation("io.github.smiley4:ktor-openapi:5.1.0")
    implementation("org.slf4j:slf4j-simple:2.0.17")

    testImplementation(kotlin("test"))
}

tasks.test {
    useJUnitPlatform()
}
