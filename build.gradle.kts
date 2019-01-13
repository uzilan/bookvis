plugins {
    id("org.jetbrains.kotlin.jvm").version("1.3.10")
    application
    id("org.jetbrains.kotlin.plugin.noarg").version("1.3.11")
}

repositories {
    jcenter()
}

val test by tasks.getting(Test::class) {
    useJUnitPlatform { }
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    compile("org.neo4j:neo4j:3.5.1")
    compile("org.neo4j:neo4j-ogm-core:3.1.2")
    compile("org.neo4j:neo4j-ogm-embedded-driver:3.1.2")
    implementation("org.slf4j:slf4j-simple:1.7.25")
    testImplementation("io.kotlintest:kotlintest-runner-junit5:3.1.11")
}

noArg {
    annotation("org.neo4j.ogm.annotation.NodeEntity")
    annotation("org.neo4j.ogm.annotation.RelationshipEntity")
}

application {
    mainClassName = "bookvis.App"
}
