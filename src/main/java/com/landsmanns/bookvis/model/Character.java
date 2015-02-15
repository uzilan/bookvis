package com.landsmanns.bookvis.model;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by uzilan on 2015-02-02.
 */
public class Character extends Model {

    private String name;
    private List<Attribute> attributes;

    private Character(CharacterBuilder builder) {
        super(builder.id);
        this.name = builder.name;
        this.attributes = builder.attributes;
    }

    public String getName() {
        return name;
    }

    public List<Attribute> getAttributes() {
        return attributes;
    }

    public void addAttribute(Attribute attribute) {
        attributes.add(attribute);
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

        JSONArray a = new JSONArray();
        j.put("attributes", a);
        attributes.forEach(at -> a.put(at.toJson(detailLevel)));

        return j;
    }

    public static CharacterBuilder builder() {
        return new CharacterBuilder();
    }

    public static class CharacterBuilder {

        private long id;
        private String name;
        private List<Attribute> attributes = new ArrayList<>();

        public CharacterBuilder id(long id) {
            this.id = id;
            return this;
        }

        public CharacterBuilder name(String name) {
            this.name = name;
            return this;
        }

        public CharacterBuilder attributes(List<Attribute> attributes) {
            this.attributes = attributes;
            return this;
        }

        public Character build() {
            return new Character(this);
        }
    }
}
