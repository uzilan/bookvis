package com.landsmanns.bookvis.repository

import com.google.gson.{JsonObject, JsonSerializationContext, JsonSerializer}
import java.lang.reflect.Type
import com.landsmanns.bookvis.repository.json.JsonCharacter

/**
 * A relation between two characters
 * @param from the first character
 * @param to the second character
 * @param description the description of the relation
 */
case class Relation(from: Character, to: Character, description: String)

package serializers {

/**
 * Relation json serializer
 */
class RelationSerializer extends JsonSerializer[Relation] {
  override def serialize(relation: Relation, typeOfSrc: Type, context: JsonSerializationContext) = {
    val json = new JsonObject
    json.addProperty("from", JsonCharacter.jsonCharacter(relation.from))
    json.addProperty("to", JsonCharacter.jsonCharacter(relation.to))
    json.addProperty("description", relation.description)
    json
  }
}

}



