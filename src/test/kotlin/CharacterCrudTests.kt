import bookvis.character.CharacterCrud
import bookvis.relation.Relation
import bookvis.relation.RelationCrud
import io.kotlintest.shouldBe
import io.kotlintest.shouldNotBe
import io.kotlintest.specs.StringSpec

class CharacterCrudTests : StringSpec({

    val characterCrud = CharacterCrud()
    val relationCrud = RelationCrud()

    "Character should be created" {
        val pooh = TestData.Pooh.winnieThePooh
        val created = characterCrud.createOrUpdate(pooh)
        val returned = characterCrud.findById(created.id)
        returned shouldBe pooh
    }

    "Relations between characters should be created" {
        val chris = TestData.Pooh.christopherRobin
        val pooh = TestData.Pooh.winnieThePooh
        val ownership = Relation(chris, pooh, "Chris owns Pooh")

        characterCrud.createOrUpdate(chris)
        characterCrud.createOrUpdate(pooh)
        relationCrud.createOrUpdate(ownership)

        chris.relations.size shouldBe 1
        chris.relations.first().id shouldNotBe -1
        chris.relations.first().description shouldBe "Chris owns Pooh"
    }
})