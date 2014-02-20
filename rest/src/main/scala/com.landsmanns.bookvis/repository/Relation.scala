package com.landsmanns.bookvis.repository

import com.google.gson.{JsonObject, JsonSerializationContext, JsonSerializer}
import java.lang.reflect.Type


/**
 * Created by uzilan on 2014-02-20.
 */
case class Relation(from: Character, to: Character, description: String)


class RelationSerializer extends JsonSerializer[Relation] {
  override def serialize(relation: Relation, typeOfSrc: Type, context: JsonSerializationContext) = {
    val json = new JsonObject
    json.addProperty("from", JsonCharacter.jsonCharacter(relation.from))
    json.addProperty("to", JsonCharacter.jsonCharacter(relation.to))
    json.addProperty("description", relation.description)
    json
  }
}



