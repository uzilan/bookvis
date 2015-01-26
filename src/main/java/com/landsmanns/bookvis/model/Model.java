package com.landsmanns.bookvis.model;

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

    public abstract String toJson();
}
