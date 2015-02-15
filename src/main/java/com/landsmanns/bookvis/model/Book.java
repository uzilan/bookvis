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
public class Book extends Model {

    private String title;
    private Author author;
    private Genre genre;
    private List<Chapter> chapters;
    private List<Character> characters;
    private List<Relation> relations;

    private Book(BookBuilder builder) {
        super(builder.id);
        this.title = builder.title;
        this.author = builder.author;
        this.genre = builder.genre;
        this.chapters = builder.chapters;
        this.characters = builder.characters;
        this.relations = builder.relations;
    }

    public String getTitle() {
        return title;
    }

    public Author getAuthor() {
        return author;
    }

    public Genre getGenre() {
        return genre;
    }

    public List<Chapter> getChapters() {
        return chapters;
    }

    public List<Character> getCharacters() {
        return characters;
    }

    public List<Relation> getRelations() {
        return relations;
    }

    public void addChapter(Chapter chapter) {
        chapters.add(chapter);
    }

    public void addCharacter(Character character) {
        characters.add(character);
    }

    public void addRelation(Relation relation) {
        relations.add(relation);
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
        j.put("name", title);

        if (detailLevel.ordinal() >= DetailLevel.CHAPTER.ordinal()) {
            JSONArray a = new JSONArray();
            j.put("chapters", a);
            chapters.forEach(c -> a.put(c.toJson(detailLevel)));
        }

        if (detailLevel.ordinal() >= DetailLevel.CHARACTER.ordinal()) {
            JSONArray a = new JSONArray();
            j.put("characters", a);
            characters.forEach(ch -> a.put(ch.toJson(detailLevel)));
        }

        if (detailLevel.ordinal() >= DetailLevel.RELATION.ordinal()) {
            JSONArray a = new JSONArray();
            j.put("relations", a);
            relations.forEach(r -> a.put(r.toJson(detailLevel)));
        }

        return j;
    }

    public static BookBuilder builder() {
        return new BookBuilder();
    }

    public static class BookBuilder {
        private long id;
        private String title;
        private Author author;
        private Genre genre;
        private List<Chapter> chapters = new ArrayList<>();
        private List<Character> characters = new ArrayList<>();
        private List<Relation> relations = new ArrayList<>();

        public BookBuilder id(long id) {
            this.id = id;
            return this;
        }

        public BookBuilder title(String title) {
            this.title = title;
            return this;
        }

        public BookBuilder author(Author author) {
            this.author = author;
            return this;
        }

        public BookBuilder genre(Genre genre) {
            this.genre = genre;
            return this;
        }

        public BookBuilder chapters(List<Chapter> chapters) {
            this.chapters = chapters;
            return this;
        }

        public BookBuilder characters(List<Character> characters) {
            this.characters = characters;
            return this;
        }

        public BookBuilder relations(List<Relation> relations) {
            this.relations = relations;
            return this;
        }

        public Book build() {
            return new Book(this);
        }
    }
}
