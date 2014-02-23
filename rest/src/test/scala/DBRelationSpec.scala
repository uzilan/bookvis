import com.landsmanns.bookvis.repository.db.{DBRelation, DBCharacter, DBChapter, DBBook}
import com.landsmanns.bookvis.repository.{Relation, Character, Chapter, Book}

/**
 * Created by uzilan on 2014-02-22.
 */
class DBRelationSpec extends DBSpecBase {
  "Relations" should "be saveable and retrieveable" in {

    val book = Book(winnieThePooh, aaMilne)
    val chap = Chapter(chapterOne, 1)
    val char1 = Character(winnieThePooh, chap)
    val char2 = Character(christopherRobin, chap)
    val relation = Relation(char1, char2, friend)

    DBBook.saveBook(book)
    DBChapter.saveChapter(book, chap)
    DBCharacter.saveCharacter(book, chap, char1)
    DBCharacter.saveCharacter(book, chap, char2)
    DBRelation.saveRelation(book, relation)
    val relations = DBRelation.getRelations(book)

    println(relations)

    relations(0).from.name should be(winnieThePooh)
    relations(0).to.name should be(christopherRobin)
    relations(0).description should be(friend)
  }
}
