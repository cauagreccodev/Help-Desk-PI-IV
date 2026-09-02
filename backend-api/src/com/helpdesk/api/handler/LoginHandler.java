package com.helpdesk.api.handler;

import com.helpdesk.api.dao.UserDao;
import com.helpdesk.api.model.User;
import com.helpdesk.api.util.AuthUtil;
import com.helpdesk.api.util.HttpHelper;
import com.helpdesk.api.util.JsonUtil;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class LoginHandler implements HttpHandler {

    private final UserDao userDao = new UserDao();

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            HttpHelper.sendJson(exchange, 204, "");
            return;
        }

        if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
            HttpHelper.sendError(exchange, 405, "Method not allowed");
            return;
        }

        try {
            String body = HttpHelper.readBody(exchange);
            Map<String, String> creds = JsonUtil.fromJson(body, Map.class);
            String email = creds.get("email");
            String password = creds.get("password");

            if (email == null || password == null) {
                HttpHelper.sendError(exchange, 400, "Email e senha são obrigatórios");
                return;
            }

            User user = userDao.findByEmail(email);
            if (user == null || !AuthUtil.checkPassword(password, user.getPasswordHash())) {
                HttpHelper.sendError(exchange, 401, "Credenciais inválidas");
                return;
            }

            String token = AuthUtil.generateToken(user.getId());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", user);

            HttpHelper.sendJson(exchange, 200, response);
        } catch (Exception e) {
            e.printStackTrace();
            HttpHelper.sendError(exchange, 500, "Erro interno do servidor");
        }
    }
}
