package com.helpdesk.api.handler;

import com.helpdesk.api.dao.NotificationDao;
import com.helpdesk.api.model.Notification;
import com.helpdesk.api.util.AuthUtil;
import com.helpdesk.api.util.HttpHelper;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.util.List;

public class NotificationHandler implements HttpHandler {

    private final NotificationDao notificationDao = new NotificationDao();

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            HttpHelper.sendJson(exchange, 204, "");
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

        String path = exchange.getRequestURI().getPath();
        
        try {
            if ("GET".equalsIgnoreCase(exchange.getRequestMethod()) && "/api/notificacoes".equals(path)) {
                List<Notification> notifications = notificationDao.findByUserId(userId);
                HttpHelper.sendJson(exchange, 200, notifications);
            } else if ("PUT".equalsIgnoreCase(exchange.getRequestMethod()) && path.startsWith("/api/notificacoes/")) {
                String idStr = HttpHelper.getPathParam(path, 3);
                if (idStr != null && idStr.endsWith("/read")) {
                    // Trata URL tipo /api/notificacoes/15/read
                    idStr = HttpHelper.getPathParam(path, 2);
                } else if (idStr != null) {
                     // /api/notificacoes/15/read -> se o path tiver read no final
                     String[] parts = path.split("/");
                     if (parts.length >= 5 && "read".equals(parts[4])) {
                         idStr = parts[3];
                     }
                }
                
                if (idStr != null) {
                    try {
                        int notifId = Integer.parseInt(idStr);
                        boolean ok = notificationDao.markAsRead(notifId, userId);
                        if (ok) {
                            HttpHelper.sendJson(exchange, 200, "{\"success\": true}");
                        } else {
                            HttpHelper.sendError(exchange, 404, "Notificação não encontrada");
                        }
                    } catch (NumberFormatException e) {
                        HttpHelper.sendError(exchange, 400, "ID inválido");
                    }
                } else {
                    HttpHelper.sendError(exchange, 400, "ID não informado");
                }
            } else {
                HttpHelper.sendError(exchange, 404, "Not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            HttpHelper.sendError(exchange, 500, "Erro interno do servidor");
        }
    }
}
