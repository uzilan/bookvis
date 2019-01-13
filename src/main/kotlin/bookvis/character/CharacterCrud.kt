package bookvis.character

import bookvis.BaseCrud

class CharacterCrud : BaseCrud<Character>() {
    override fun getEntityType(): Class<Character> {
        return Character::class.java
    }
}