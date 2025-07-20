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

dependencies {
    implementation("io.ktor:ktor-server-core:2.3.7")
    implementation("io.ktor:ktor-server-netty:2.3.7")
    implementation("io.ktor:ktor-server-content-negotiation:2.3.7")
    implementation("io.ktor:ktor-serialization-kotlinx-json:2.3.7")
    implementation("io.ktor:ktor-server-cors:2.3.7")
    implementation("io.ktor:ktor-server-call-logging:2.3.7")
    implementation("org.slf4j:slf4j-simple:2.0.17")
    
    testImplementation("io.ktor:ktor-server-tests:2.3.7")
    testImplementation(kotlin("test"))
    implementation("io.github.microutils:kotlin-logging-jvm:3.0.5")
    testImplementation("ch.qos.logback:logback-classic:1.4.11")
}

tasks.test {
    useJUnitPlatform()
}
