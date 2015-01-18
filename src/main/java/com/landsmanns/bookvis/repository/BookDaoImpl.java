package com.landsmanns.bookvis.repository;

import org.json.JSONArray;
import org.json.JSONObject;
import org.neo4j.rest.graphdb.RestAPI;
import org.neo4j.rest.graphdb.RestAPIFacade;
import org.neo4j.rest.graphdb.query.RestCypherQueryEngine;
import org.neo4j.rest.graphdb.util.QueryResult;

import java.util.Map;

import static org.neo4j.helpers.collection.MapUtil.map;

/**
 * Created by uzilan on 2015-01-18.
 */
public class BookDaoImpl implements BookDao {

    @Override
    public String getAllBooks() {

        RestAPI restAPI = new RestAPIFacade("http://localhost:7474/db/data");
        final RestCypherQueryEngine engine = new RestCypherQueryEngine(restAPI);
        final QueryResult<Map<String, Object>> result = engine.query("start n=node(2) return n, n.name as name;", map("id", 0));

        engine.query("CREATE (n:genre {name:'Childrens Books'}) ", null);
/*
        for (Map<String, Object> row : result) {
            long id = ((Number) row.get("id")).longValue();
            System.out.println("id is " + id);
        }
*/
        return createBooksList();
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
