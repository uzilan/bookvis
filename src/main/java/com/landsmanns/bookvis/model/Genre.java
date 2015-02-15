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

    private Genre(GenreBuilder builder) {
        super(builder.id);
        this.name = builder.name;
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
    public JSONObject toJson(DetailLevel detailLevel) {

        JSONObject j = new JSONObject();
        j.put("id", getId());
        j.put("name", name);

        if (detailLevel.ordinal() > DetailLevel.GENRE.ordinal()) {
            JSONArray a = new JSONArray();
            j.put("authors", a);
            authors.forEach(au -> a.put(au.toJson(detailLevel)));
        }

        return j;
    }

    public static GenreBuilder builder() {
        return new GenreBuilder();
    }

    public static class GenreBuilder {
        private long id;
        private String name;

        public GenreBuilder id(long id) {
            this.id = id;
            return this;
        }

        public GenreBuilder name(String name) {
            this.name = name;
            return this;
        }

        public Genre build() {
            return new Genre(this);
        }
    }
}
