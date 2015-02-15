package com.landsmanns.bookvis.repository;

import com.landsmanns.bookvis.model.*;
import com.landsmanns.bookvis.model.Character;
import org.neo4j.rest.graphdb.util.QueryResult;

import java.util.*;

/**
 * Created by uzilan on 2015-01-18.
 */
public class BookDaoImpl implements BookDao {

    public BookDaoImpl() {

        // delete everything
        query("MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r");

        // create some nodes
        query("CREATE (ch:genre {name:'Children Books'}) " +
                "CREATE (fi:genre {name:'Fiction'}) " +
                "CREATE (a:author {name:'A. A. Milne'}) -[:of_genre]-> (ch) " +
                "CREATE (dr:author {name:'Dr. Seuss'}) -[:of_genre]-> (ch) " +
                "CREATE (mt:author {name:'Mark Twain'}) -[:of_genre]-> (ch) " +
                "CREATE (ws:author {name:'William Shakespeare'}) -[:of_genre]-> (fi) " +
                "CREATE (ac:author {name:'Agatha Christie'}) -[:of_genre]-> (fi) " +
                "CREATE (wtp:book {title:'Winnie-the-Pooh'})-[:by_author]->(a) " +
                "CREATE (thapc:book {title:'The House at Pooh Corner'})-[:by_author]->(a) " +
                "CREATE (htgsc:book {title:'How the Grinch Stole Christmas'})-[:by_author]->(dr) " +
                "CREATE (tcith:book {title:'The Cat in the Hat'})-[:by_author]->(dr) " +
                "CREATE (taohf:book {title:'The Adventures of Huckleberry Finn'})-[:by_author]->(mt) " +
                "CREATE (taots:book {title:'The Adventures of Tom Sawyer'})-[:by_author]->(mt) " +
                "CREATE (raj:book {title:'Romeo and Juliet'})-[:by_author]->(ws) " +
                "CREATE (h:book {title:'Hamlet'})-[:by_author]->(ws) " +
                "CREATE (m:book {title:'Macbeth'})-[:by_author]->(ws) " +
                "CREATE (dbtn:book {title:'Death on the Nile'})-[:by_author]->(ac) " +
                "CREATE (tabcm:book {title:'The A.B.C. Murders'})-[:by_author]->(ac) " +
                "CREATE (wtpch1:chapter {index:1, title: 'Chapter One IN WHICH We Are Introduced to Winnie-the-Pooh and Some Bees, and the Stories Begin'}) -[:in_book]-> (wtp)" +
                "CREATE (wtpch2:chapter {index:2, title: 'Chapter Two IN WHICH Pooh Goes Visiting and Gets Into a Tight Place'}) -[:in_book]-> (wtp)" +
                "CREATE (wtpch3:chapter {index:3, title: 'Chapter Three IN WHICH Pooh and Piglet Go Hunting and Nearly Catch a Woozle'}) -[:in_book]-> (wtp)" +
                "CREATE (cr:character {name: 'Christopher Robin'}) -[:in_chapter]-> (wtpch1) " +
                "CREATE (wtpc:character {name: 'Winnie-the-Pooh'}) -[:in_chapter]-> (wtpch1) " +
                "CREATE (ior:character {name: 'Ior'}) -[:in_chapter]-> (wtpch1) " +
                "CREATE (cr) -[:relation {type: 'friend'}]-> (wtpc) " +
                "");
    }

    @Override
    public List<Genre> getAllBooks() {

        QueryResult<Map<String, Object>> result =
                query("MATCH (b:book) -[by_author]-> (a:author) -[:of_genre]-> (g:genre) " +
                        "RETURN ID(b) as bookId, " +
                        "b.title as bookTitle, " +
                        "ID(a) as authorId, " +
                        "a.name as authorName, " +
                        "ID(g) as genreId, " +
                        "g.name as genreName " +
                        "ORDER BY ID(g), ID(a)");

        List<Genre> genres = new ArrayList<>();

        Genre genre = null;
        Author author = null;

        Iterator<Map<String, Object>> iterator = result.iterator();
        while (iterator.hasNext()) {

            Map<String, Object> row = iterator.next();
            long genreId = (int) row.get("genreId");
            String genreName = row.get("genreName").toString();

            if (genre == null || !genreName.equals(genre.getName())) {
                genre = Genre.builder().id(genreId).name(genreName).build();
                genres.add(genre);
            }

            long authorId = (int) row.get("authorId");
            String authorName = row.get("authorName").toString();

            if (author == null || !authorName.equals(author.getName())) {
                author = Author.builder().id(authorId).name(authorName).build();
                genre.addAuthor(author);
            }

            long bookId = (int) row.get("bookId");
            String bookTitle = row.get("bookTitle").toString();

            Book b = Book.builder().id(bookId).title(bookTitle).build();
            author.addBook(b);
        }
        return genres;
    }

    @Override
    public Book getBook(final long id) {

        QueryResult<Map<String, Object>> result =
                query("MATCH (b:book) -[:by_author]-> (a:author) -[:of_genre]-> (g:genre) " +
                                "WHERE ID(b) = {bookId} " +
                                "RETURN ID(b) as bookId, " +
                                "b.title as bookTitle, " +
                                "ID(a) as authorId, " +
                                "a.name as authorName, " +
                                "ID(g) as genreId, " +
                                "g.name as genreName ",
                        new HashMap<String, Object>() {{
                            put("bookId", id);
                        }});

        Iterator<Map<String, Object>> iterator = result.iterator();
        if (!iterator.hasNext()) {
            throw new IllegalArgumentException("Book with id " + id + " could not be found");
        }

        Map<String, Object> row = iterator.next();

        long bookId = id;
        String bookTitle = row.get("bookTitle").toString();
        long genreId = (int) row.get("genreId");
        String genreName = row.get("genreName").toString();
        long authorId = (int) row.get("authorId");
        String authorName = row.get("authorName").toString();

        result = query("MATCH (cha:character) -[:in_chapter]-> (c:chapter) -[:in_book]-> (b:book) " +
                        "OPTIONAL MATCH (cha)-[r:relation]-> (chb) " +
                        "WHERE ID(b) = {bookId} " +
                        "RETURN " +
                        "ID(c) as chapterId, " +
                        "c.index as chapterIndex, " +
                        "c.title as chapterTitle, " +
                        "ID(cha) as characterAId, " +
                        "cha.name as characterAName, " +
                        "ID(chb) as characterBId, " +
                        "chb.name as characterBName, " +
                        "ID(r) as relationId, " +
                        "r.type as relationType " +
                        "ORDER BY ID(c) ",
                new HashMap<String, Object>() {{
                    put("bookId", id);
                }});

        Chapter chapter = null;
        List<Chapter> chapters = new ArrayList<>();
        List<Character> characters = new ArrayList<>();
        List<Relation> relations = new ArrayList<>();

        iterator = result.iterator();

        while (iterator.hasNext()) {
            row = iterator.next();

            int chapterId = (int) row.get("chapterId");
            int chapterIndex = (int) row.get("chapterIndex");
            String chapterTitle = row.get("chapterTitle").toString();

            if (chapter == null || chapter.getIndex() != chapterIndex) {
                chapter = Chapter.builder()
                        .id(chapterId)
                        .index(chapterIndex)
                        .title(chapterTitle)
                        .build();
                chapters.add(chapter);
            }

            int characterAId = (int) row.get("characterAId");
            String characterAName = row.get("characterAName").toString();

            Character characterA = null;
            if (!characters.stream().anyMatch(c -> c.getId() == characterAId)) {
                characterA = Character.builder()
                        .id(characterAId)
                        .name(characterAName)
                        .build();
                characters.add(characterA);
            }

            Character characterB = null;
            if (row.get("characterBId") != null) {
                int characterBId = (int) row.get("characterBId");
                String characterBName = row.get("characterBName").toString();

                if (!characters.stream().anyMatch(c -> c.getId() == characterBId)) {
                    characterB = Character.builder()
                            .id(characterBId)
                            .name(characterBName)
                            .build();
                    characters.add(characterB);
                }
            }

            if (row.get("relationId") != null) {
                int relationId = (int) row.get("relationId");
                String relationType = row.get("relationType").toString();
                Relation relation = Relation.builder()
                        .id(relationId)
                        .from(characterA)
                        .to(characterB)
                        .type(relationType)
                        .build();
                relations.add(relation);
            }
        }

        return Book.builder()
                .id(bookId)
                .title(bookTitle)
                .author(Author.builder()
                        .id(authorId)
                        .name(authorName)
                        .build())
                .genre(Genre.builder()
                        .id(genreId)
                        .name(genreName)
                        .build())
                .chapters(chapters)
                .characters(characters)
                .relations(relations)
                .build();
    }
}
