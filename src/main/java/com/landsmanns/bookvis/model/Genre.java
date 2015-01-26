package com.landsmanns.bookvis.model;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by uzilan on 2015-01-18.
 */
public class Genre extends Model {

    private String name;
    private List<Author> authors = new ArrayList<>();

    public Genre(long id, String name) {
        super(id);
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public List<Author> getAuthors() {
        return authors;
    }

    public void addAuthor(Author author) {
        authors.add(author);
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public boolean equals(Object other) {
        return EqualsBuilder.reflectionEquals(this, other);
    }

    @Override
    public int hashCode() {
        return HashCodeBuilder.reflectionHashCode(this);
    }

    @Override
    public JSONObject toJson() {

        JSONObject j = new JSONObject();
        j.put("name", name);
        JSONArray a = new JSONArray();
        j.put("children", a);

        authors.forEach(au -> {
            a.put(au.toJson());
        });

        return j;
    }
}
