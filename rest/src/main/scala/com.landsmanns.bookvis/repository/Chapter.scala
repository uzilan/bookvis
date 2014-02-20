package com.landsmanns.bookvis.repository

import com.google.gson.{JsonObject, JsonSerializationContext, JsonSerializer}
import java.lang.reflect.Type
import org.anormcypher.Cypher
import com.landsmanns.bookvis.JsonStuff

/**
 * Created by uzilan on 2014-02-19.
 */
case class Chapter(name: String, index: Int)


class ChapterSerializer extends JsonSerializer[Chapter] {
  override def serialize(chapter: Chapter, typeOfSrc: Type, context: JsonSerializationContext) = {
    val json = new JsonObject
    json.addProperty("name", chapter.name)
    json.addProperty("index", chapter.index)
    json
  }
}

object JsonChapter {
  def jsonChapter(chapter: Chapter) = {
    JsonStuff.gson.toJson(chapter)
  }
}

object DBChapter {

  import com.landsmanns.bookvis.BFString._

  def createChapter(book: Book, chapter: Chapter) {
    val create =
      """
        MATCH (b:Book)
        WHERE b.name = '%s' AND b.author = '%s'
        CREATE (c:Chapter {name: "%s", index: "%d"})-[r:INBOOK]->(b)
        RETURN r
      """ %(book.name, book.author, chapter.name, chapter.index)
    Cypher(create).execute()
  }
}