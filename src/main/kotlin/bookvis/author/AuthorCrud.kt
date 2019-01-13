package bookvis.author

import bookvis.BaseCrud

class AuthorCrud : BaseCrud<Author>() {
    override fun getEntityType(): Class<Author> {
        return Author::class.java
    }
}