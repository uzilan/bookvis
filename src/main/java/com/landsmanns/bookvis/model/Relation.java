package com.landsmanns.bookvis.model;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.json.JSONObject;

/**
 * Created by uzilan on 2015-01-18.
 */
public class Relation extends Model {

    private String type;
    private Character from;
    private Character to;

    private Relation(RelationBuilder builder) {
        super(builder.id);
        this.type = builder.type;
        this.from = builder.from;
        this.to = builder.to;
    }

    public String getType() {
        return type;
    }

    public Character getFrom() {
        return from;
    }

    public Character getTo() {
        return to;
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
        j.put("type", type);
        j.put("from", from.toJson(detailLevel));
        j.put("to", to.toJson(detailLevel));

        return j;
    }

    public static RelationBuilder builder() {
        return new RelationBuilder();
    }

    public static class RelationBuilder {

        private long id;
        private String type;
        private Character from;
        private Character to;

        public RelationBuilder id(long id) {
            this.id = id;
            return this;
        }

        public RelationBuilder type(String type) {
            this.type = type;
            return this;
        }

        public RelationBuilder from(Character from) {
            this.from = from;
            return this;
        }

        public RelationBuilder to(Character to) {
            this.to = to;
            return this;
        }

        public Relation build() {
            return new Relation(this);
        }
    }
}
