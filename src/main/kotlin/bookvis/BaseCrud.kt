package bookvis

abstract class BaseCrud<T : Entity> {

    fun createOrUpdate(t: T): T {
        val session = App.session
        session.save(t, 10)
        return t
    }

    fun findById(id: Long): T {
        return App.session.load(getEntityType(), id, 1)
    }

    abstract fun getEntityType(): Class<T>
}