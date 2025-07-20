package bookvis.dsl

import bookvis.models.Book
import bookvis.models.Character

@DslMarker
annotation class CharactersDsl

@CharactersDsl
class CharacterBuilder(private val book: Book) {
    private var characterName: String = ""
    private var characterDescription: String = ""
    private var firstAppearanceChapter: Int = 1
    private var aliasesList = mutableListOf<String>()
    
    fun name(name: String) {
        characterName = name
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
    
    fun build(): Character {
        return Character(book, characterName, aliasesList, characterDescription, firstAppearanceChapter)
    }
}

@CharactersDsl
class CharactersBuilder(private val book: Book) {
    private val characters = mutableListOf<Character>()
    
    fun character(init: CharacterBuilder.() -> Unit) {
        val characterBuilder = CharacterBuilder(book)
        characterBuilder.init()
        characters.add(characterBuilder.build())
    }
    
    fun getCharacters(): List<Character> = characters.toList()
} 