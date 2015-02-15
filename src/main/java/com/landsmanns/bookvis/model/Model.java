package com.landsmanns.bookvis.model;

import org.json.JSONObject;

/**
 * Created by uzilan on 2015-01-26.
 */
public abstract class Model {

    private long id;

    public Model(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public abstract JSONObject toJson(DetailLevel detailLevel);

    public enum DetailLevel {

        GENRE, AUTHOR, BOOK, CHAPTER, CHARACTER, RELATION, ATTRIBUTE;

    }
}
