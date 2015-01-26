package com.landsmanns.bookvis.repository;

import com.landsmanns.bookvis.model.Author;
import com.landsmanns.bookvis.model.Book;
import com.landsmanns.bookvis.model.Genre;
import org.neo4j.rest.graphdb.util.QueryResult;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Created by uzilan on 2015-01-18.
 */
public class BookDaoImpl implements BookDao {

    public BookDaoImpl() {

        // delete everything
        query("MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r");

        // create some nodes
        query("CREATE (ch:genre {name:'Childrens Books'}) " +
                "CREATE (fi:genre {name:'Fiction'}) " +
                "CREATE (a:author {name:'A. A. Milne'}) -[:of_genre]-> (ch) " +
                "CREATE (dr:author {name:'Dr. Seuss'}) -[:of_genre]-> (ch) " +
                "CREATE (mt:author {name:'Mark Twain'}) -[:of_genre]-> (ch) " +
                "CREATE (ws:author {name:'William Shakespeare'}) -[:of_genre]-> (fi) " +
                "CREATE (ac:author {name:'Agatha Christie'}) -[:of_genre]-> (fi) ");
    }

    @Override
    public List<Genre> getAllBooks() {

        QueryResult<Map<String, Object>> result =
                query("MATCH (a:author) -[:of_genre]-> (g:genre) " +
                        "RETURN ID(a) as authorId, " +
                        "ID(g) as genreId, " +
                        "a.name as authorName, " +
                        "g.name as genreName " +
                        "ORDER BY ID(g)");

        List<Genre> genres = new ArrayList<>();

        Genre genre = null;

        Iterator<Map<String, Object>> iterator = result.iterator();
        while (iterator.hasNext()) {

            Map<String, Object> row = iterator.next();
            long genreId = (int) row.get("genreId");
            String genreName = row.get("genreName").toString();
            long authorId = (int) row.get("authorId");
            String authorName = row.get("authorName").toString();

            if (genre == null || !genreName.equals(genre.getName())) {
                genre = new Genre(genreId, genreName);
                genres.add(genre);
            }

            Author a = new Author(authorId, authorName);
            genre.addAuthor(a);
        }
        return genres;
    }

    @Override
    public Book getBook(String id) {
        return null;
    }
}
