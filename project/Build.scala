import sbt._
import Keys._

object ApplicationBuild extends Build {

  val landsmanns = "com.landsmanns.bookvis"
  val bookvisVersion = "0.1"

  val resos = Seq(
    Classpaths.typesafeReleases,
    Classpaths.typesafeSnapshots,
    "anormcypher" at "http://repo.anormcypher.org/",
    "Typesafe Simple Repository" at "http://repo.typesafe.com/typesafe/simple/maven-releases/",
    "sbt-idea-repo" at "http://mpeltonen.github.com/maven/"
  )

  val sparkjava = "com.sparkjava" % "spark-core" % "1.1.1"
  val gson = "com.google.code.gson" % "gson" % "2.2.4"
  val logback = "ch.qos.logback" % "logback-classic" % "1.0.13"
  val neo4j = "org.neo4j" % "neo4j" % "2.0.1"
  val anormcypher = "org.anormcypher" %% "anormcypher" % "0.4.4"
  val scalatest = "org.scalatest" %% "scalatest" % "2.0" % "test"
  val groovy = "org.codehaus.groovy" % "groovy-all" % "2.2.1"
  val dispatch = "net.databinder.dispatch" %% "dispatch-core" % "0.11.0"
  val jerseyCore = "com.sun.jersey" % "jersey-core" % "1.18.1"
  val jerseyClient = "com.sun.jersey" % "jersey-client" % "1.18.1"

  val backend = Project("backend", file("backend")) settings(
    organization := landsmanns,
    version := bookvisVersion,
    name := "backend",
    resolvers ++= resos,
    libraryDependencies ++= Seq(sparkjava, gson, logback, neo4j, anormcypher, scalatest, groovy)
    )

  val backendtests = Project("backendtests", file("backendtests")) dependsOn (backend) settings(
    organization := landsmanns,
    version := bookvisVersion,
    name := "backendtests",
    resolvers ++= resos,
    libraryDependencies ++= Seq(logback, neo4j, anormcypher, scalatest, groovy, jerseyCore, jerseyClient)
    )


}