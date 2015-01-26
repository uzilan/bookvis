package com.landsmanns.bookvis.repository;

import org.json.JSONArray;
import org.json.JSONObject;
import org.neo4j.rest.graphdb.util.QueryResult;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by uzilan on 2015-01-18.
 */
public class BookDaoImpl implements BookDao {

    @Override
    public String getAllBooks() {

        query("MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r");

        query("CREATE (ch:genre {name:'Childrens Books'}) " +
                "CREATE (fi:genre {name:'Fiction'}) " +
                "CREATE (a:author {name:'A. A. Milne'}) -[:GENRE]-> (ch) " +
                "CREATE (dr:author {name:'Dr. Seuss'}) -[:GENRE]-> (ch) " +
                "CREATE (mt:author {name:'Mark Twain'}) -[:GENRE]-> (ch) " +
                "CREATE (ws:author {name:'William Shakespeare'}) -[:GENRE]-> (fi) " +
                "CREATE (ac:author {name:'Agatha Christie'}) -[:GENRE]-> (fi) ");

        QueryResult<Map<String, Object>> result =
                query("MATCH (a:author) -[:GENRE]-> (g:genre) " +
                        "RETURN a.name as authorName, g.name as genreName");

        Map<String, List<String>> map = new HashMap<String, List<String>>();

        result.forEach(row -> {
            String genreName =  row.get("genreName").toString();
            String authorName = row.get("authorName").toString();

            List<String> authors = null;

            if (map.containsKey(genreName)) {
                authors = map.get(genreName);
            } else {
                authors = new ArrayList<String>();
                map.put(genreName, authors);
            }

            authors.add(authorName);
        });

        JSONArray genres = new JSONArray();

        map.forEach((genreName, authorNames) -> {
            JSONObject genre = new JSONObject();
            genre.put("name", genreName);

            JSONArray authors = new JSONArray();
            genre.put("children", authors);

            authorNames.forEach(authorName -> {
                JSONObject author = new JSONObject();
                author.put("name", authorName);
                author.put("size", 10);
                authors.put(author);
            });

            genres.put(genre);
        });

        return genres.toString();

    }

    private String createBooksList() {

        JSONArray genres = new JSONArray();

        JSONObject childrenBooks = new JSONObject();
        JSONArray childrenBooksAuthors = new JSONArray();
        childrenBooks.put("name", "Childrens Books");
        childrenBooks.put("children", childrenBooksAuthors);
        genres.put(childrenBooks);

        JSONObject milne = new JSONObject();
        milne.put("name", "A. A. Milne");
        milne.put("size", 10);
        childrenBooksAuthors.put(milne);

        JSONObject seuss = new JSONObject();
        seuss.put("name", "Dr. Seuss");
        seuss.put("size", 13);
        childrenBooksAuthors.put(seuss);

        JSONObject twain = new JSONObject();
        twain.put("name", "Mark Twain");
        twain.put("size", 15);
        childrenBooksAuthors.put(twain);

        JSONObject fiction = new JSONObject();
        JSONArray fictionAuthors = new JSONArray();
        fiction.put("name", "Fiction");
        fiction.put("children", fictionAuthors);
        genres.put(fiction);

        JSONObject shake = new JSONObject();
        shake.put("name", "William Shakespeare");
        shake.put("size", 12);
        fictionAuthors.put(shake);

        JSONObject chris = new JSONObject();
        chris.put("name", "Agatha Christie");
        chris.put("size", 15);
        fictionAuthors.put(chris);

        return genres.toString();
    }
}
