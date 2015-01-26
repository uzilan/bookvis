package com.landsmanns.bookvis.repository;

import org.neo4j.rest.graphdb.RestAPI;
import org.neo4j.rest.graphdb.RestAPIFacade;
import org.neo4j.rest.graphdb.query.RestCypherQueryEngine;
import org.neo4j.rest.graphdb.util.QueryResult;

import java.util.Map;

/**
 * Created by uzilan on 2015-01-19.
 */
public interface BaseDao {

    default RestCypherQueryEngine getEngine() {
        RestAPI restAPI = new RestAPIFacade("http://localhost:7474/db/data");
        return new RestCypherQueryEngine(restAPI);
    }

    default QueryResult<Map<String, Object>> query(String statement) {
        return this.query(statement, null);
    }

    default QueryResult<Map<String, Object>> query(String statement, Map<String, Object> params) {
        return getEngine().query(statement, params);
    }
}
