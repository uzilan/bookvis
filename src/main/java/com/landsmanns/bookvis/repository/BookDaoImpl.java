package com.landsmanns.bookvis.repository;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Created by uzilan on 2015-01-18.
 */
public class BookDaoImpl implements BookDao {

    @Override
    public String getAllBooks() {
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
