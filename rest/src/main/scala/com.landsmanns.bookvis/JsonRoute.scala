package com.landsmanns.bookvis

import spark.ResponseTransformerRoute
import com.google.gson.GsonBuilder
import com.landsmanns.bookvis.repository._

/**
 * Created by uzilan on 2014-02-17.
 */
abstract class JsonRoute(path: String) extends ResponseTransformerRoute(path, "application/json") {

  import JsonStuff._

  override def render(model: Object) = gson.toJson(model)
}

object JsonStuff {
  private val gsonBuilder = new GsonBuilder
  gsonBuilder.registerTypeAdapter(classOf[Character], new CharacterSerializer)
  gsonBuilder.registerTypeAdapter(classOf[Chapter], new ChapterSerializer)
  gsonBuilder.registerTypeAdapter(classOf[Book], new BookSerializer)
  gsonBuilder.registerTypeAdapter(classOf[Relation], new RelationSerializer)

  val gson = gsonBuilder.create()
}