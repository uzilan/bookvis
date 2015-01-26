package com.landsmanns.bookvis.repository;

import com.landsmanns.bookvis.model.Author;
import com.landsmanns.bookvis.model.Book;
import com.landsmanns.bookvis.model.Genre;
import org.neo4j.rest.graphdb.util.QueryResult;

import java.util.ArrayList;
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
                "CREATE (a:author {name:'A. A. Milne'}) -[:GENRE]-> (ch) " +
                "CREATE (dr:author {name:'Dr. Seuss'}) -[:GENRE]-> (ch) " +
                "CREATE (mt:author {name:'Mark Twain'}) -[:GENRE]-> (ch) " +
                "CREATE (ws:author {name:'William Shakespeare'}) -[:GENRE]-> (fi) " +
                "CREATE (ac:author {name:'Agatha Christie'}) -[:GENRE]-> (fi) ");
    }

    @Override
    public List<Genre> getAllBooks() {

        QueryResult<Map<String, Object>> result =
                query("MATCH (a:author) -[:GENRE]-> (g:lastGenre) " +
                        "RETURN ID(a) as authorId, " +
                        "ID(g) as genreId, " +
                        "a.name as authorName, " +
                        "g.name as genreName " +
                        "ORDER BY ID(g)");

        List<Genre> genres = new ArrayList<>();

        final long[] lastId = {-1};
        final Genre[] lastGenre = {null};

        result.forEach(row -> {
            long genreId = (long) row.get("genreId");
            String genreName = row.get("genreName").toString();
            long authorId = (long) row.get("authorName");
            String authorName = row.get("authorName").toString();

            if (genreId != lastId[0]) {
                lastGenre[0] = new Genre(genreId, genreName);
                lastId[0] = genreId;
                genres.add(lastGenre[0]);
            }

            Author a = new Author(authorId, authorName);
            lastGenre[0].addAuthor(a);
        });

        return genres;
    }

    @Override
    public Book getBook(String id) {
        return null;
    }
}
