package bookvis.dsl

import bookvis.models.Book
import bookvis.models.Character
import bookvis.models.Faction

@DslMarker
annotation class CharactersDsl

@CharactersDsl
class CharacterBuilder(private val book: Book, private val availableFactions: List<Faction>) {
    private var characterName: String = ""
    private var characterId: String = ""
    private var characterDescription: String = ""
    private var firstAppearanceChapter: Int = 1
    private var aliasesList = mutableListOf<String>()
    private var factionIds = mutableListOf<String>()
    
    fun name(name: String) {
        characterName = name
    }
    
    fun id(id: String) {
        characterId = id
    }
    
    fun description(desc: String) {
        characterDescription = desc
    }
    
    fun firstAppearance(chapter: Int) {
        firstAppearanceChapter = chapter
    }
    
    fun aliases(vararg names: String) {
        aliasesList.addAll(names.toList())
    }
    
    fun factions(vararg ids: String) {
        factionIds.addAll(ids.toList())
    }
    
    fun build(): Character {
        val characterFactions = availableFactions.filter { faction ->
            factionIds.contains(faction.id)
        }
        return Character(book, characterName, characterId, aliasesList, characterDescription, firstAppearanceChapter, characterFactions)
    }
}

@CharactersDsl
class CharactersBuilder(private val book: Book, private val availableFactions: List<Faction>) {
    private val characters = mutableListOf<Character>()
    
    fun character(init: CharacterBuilder.() -> Unit) {
        val characterBuilder = CharacterBuilder(book, availableFactions)
        characterBuilder.init()
        characters.add(characterBuilder.build())
    }
    
    fun getCharacters(): List<Character> = characters.toList()
} 