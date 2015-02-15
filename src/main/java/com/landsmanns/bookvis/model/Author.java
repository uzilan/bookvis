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
public class Author extends Model {

    private String name;
    private List<Book> books = new ArrayList<>();

    private Author(AuthorBuilder builder) {
        super(builder.id);
        this.name = builder.name;
    }

    public String getName() {
        return name;
    }

    public List<Book> getBooks() {
        return books;
    }

    public void addBook(Book book) {
        books.add(book);
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

        if (detailLevel.ordinal() > DetailLevel.AUTHOR.ordinal()) {
            JSONArray a = new JSONArray();
            j.put("books", a);
            books.forEach(b -> a.put(b.toJson(detailLevel)));
        }

        return j;
    }

    public static AuthorBuilder builder() {
        return new AuthorBuilder();
    }

    public static class AuthorBuilder {
        private long id;
        private String name;

        public AuthorBuilder id(long id) {
            this.id = id;
            return this;
        }

        public AuthorBuilder name(String name) {
            this.name = name;
            return this;
        }

        public Author build() {
            return new Author(this);
        }
    }
}
