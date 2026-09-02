package com.helpdesk.api.handler;

import com.helpdesk.api.dao.CategoryDao;
import com.helpdesk.api.model.Category;
import com.helpdesk.api.util.AuthUtil;
import com.helpdesk.api.util.HttpHelper;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.util.List;

public class CategoryHandler implements HttpHandler {

    private final CategoryDao categoryDao = new CategoryDao();

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            HttpHelper.sendJson(exchange, 204, "");
            return;
        }

        if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
            HttpHelper.sendError(exchange, 405, "Method not allowed");
            return;
        }

        String authHeader = exchange.getRequestHeaders().getFirst("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            HttpHelper.sendError(exchange, 401, "Não autenticado");
            return;
        }
        Integer userId = AuthUtil.validateToken(authHeader.substring(7));
        if (userId == null) {
            HttpHelper.sendError(exchange, 401, "Token inválido ou expirado");
            return;
        }

        try {
            List<Category> categories = categoryDao.findAll();
            HttpHelper.sendJson(exchange, 200, categories);
        } catch (Exception e) {
            e.printStackTrace();
            HttpHelper.sendError(exchange, 500, "Erro interno do servidor");
        }
    }
}
