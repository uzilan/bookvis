package com.landsmanns.bookvis.model;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.json.JSONObject;

/**
 * Created by uzilan on 2015-02-14.
 */
public class Attribute extends Model {
    private String key;
    private String value;

    private Attribute(AttributeBuilder builder) {
        super(builder.id);
        this.key = builder.key;
        this.value = builder.value;
    }

    public String getKey() {
        return key;
    }

    public String getValue() {
        return value;
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
    public JSONObject toJson(Model.DetailLevel detailLevel) {

        JSONObject j = new JSONObject();
        j.put("id", getId());
        j.put("key", key);
        j.put("value", value);

        return j;
    }

    public static AttributeBuilder builder() {
        return new AttributeBuilder();
    }

    public static class AttributeBuilder {
        private long id;
        private String key;
        private String value;

        public AttributeBuilder id(long id) {
            this.id = id;
            return this;
        }

        public AttributeBuilder key(String key) {
            this.key = key;
            return this;
        }

        public AttributeBuilder value(String value) {
            this.value = value;
            return this;
        }

        public Attribute build() {
            return new Attribute(this);
        }
    }
}
