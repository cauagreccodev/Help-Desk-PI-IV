package com.helpdesk.api.util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Utilitário para conversão JSON usando Gson.
 */
public class JsonUtil {
    private static final Gson gson = new GsonBuilder().create();

    public static String toJson(Object src) {
        return gson.toJson(src);
    }

    public static <T> T fromJson(String json, Class<T> classOfT) {
        return gson.fromJson(json, classOfT);
    }
}
