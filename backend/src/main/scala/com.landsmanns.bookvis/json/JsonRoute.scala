package com.landsmanns.bookvis.json

import spark.ResponseTransformerRoute
import com.google.gson.GsonBuilder
import com.landsmanns.bookvis.repository._
import com.landsmanns.bookvis.repository.serializers.{AuthorSerializer, RelationSerializer, BookSerializer, CharacterSerializer}
import com.landsmanns.bookvis.repository.serializer.ChapterSerializer

/**
 * Spark route that transforms the output into json.
 * @see <a href="http://www.sparkjava.com/readme.html#title11">http://www.sparkjava.com/readme.html#title11</a>
 */
abstract class JsonRoute(path: String) extends ResponseTransformerRoute(path, "application/json") {

  import JsonStuff._

  /**
   * Renders the given object into json
   * @see <a href="http://www.sparkjava.com/readme.html#title11">http://www.sparkjava.com/readme.html#title11</a>
   */
  override def render(model: Object) = gson.toJson(model)
}

/**
 * Json-related help attributes and functions
 */
object JsonStuff {
  private val gsonBuilder = new GsonBuilder
  gsonBuilder.registerTypeAdapter(classOf[Author], new AuthorSerializer)
  gsonBuilder.registerTypeAdapter(classOf[Book], new BookSerializer)
  gsonBuilder.registerTypeAdapter(classOf[Chapter], new ChapterSerializer)
  gsonBuilder.registerTypeAdapter(classOf[Character], new CharacterSerializer)
  gsonBuilder.registerTypeAdapter(classOf[Relation], new RelationSerializer)

  /** A Gson instance to be used whenever serialising or deserializing json objects */
  val gson = gsonBuilder.create()
}