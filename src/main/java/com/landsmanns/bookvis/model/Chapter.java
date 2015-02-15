package com.landsmanns.bookvis.model;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.json.JSONObject;

/**
 * Created by uzilan on 2015-02-02.
 */
public class Chapter extends Model {

    private int index;
    private String title;

    private Chapter(ChapterBuilder builder) {
        super(builder.id);
        this.index = builder.index;
        this.title = builder.title;
    }

    public int getIndex() {
        return index;
    }

    public String getTitle() {
        return title;
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
        j.put("index", index);
        j.put("title", title);
        return j;
    }

    public static ChapterBuilder builder() {
        return new ChapterBuilder();
    }

    public static class ChapterBuilder {

        private long id;
        private int index;
        private String title;

        public ChapterBuilder id(long id) {
            this.id = id;
            return this;
        }

        public ChapterBuilder index(int index) {
            this.index = index;
            return this;
        }

        public ChapterBuilder title(String title) {
            this.title = title;
            return this;
        }

        public Chapter build() {
            return new Chapter(this);
        }
    }
}
