package com.landsmanns.bookvis.utils;

import com.landsmanns.bookvis.model.Model;
import org.json.JSONArray;

import java.util.List;

/**
 * Created by uzilan on 2015-01-26.
 */
public class JsonUtils {

    public static <T extends Model> String toJson(List<T> list) {
        JSONArray array = new JSONArray();
        list.forEach(item -> array.put(item.toJson()));
        return array.toString();
    }
}
