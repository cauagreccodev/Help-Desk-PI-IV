package com.helpdesk.api;

import com.helpdesk.api.config.Database;
import com.helpdesk.api.handler.CategoryHandler;
import com.helpdesk.api.handler.LoginHandler;
import com.helpdesk.api.handler.NotificationHandler;
import com.helpdesk.api.handler.TicketHandler;
import com.helpdesk.api.handler.UserHandler;
import com.sun.net.httpserver.HttpServer;

import java.net.InetSocketAddress;
import java.util.concurrent.Executors;

public class Main {

    public static void main(String[] args) {
        try {
            // Inicializa a conexão com o banco
            Database.init();

            // Configura servidor na porta 8000
            int port = 8000;
            HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

            // Rotas da API
            server.createContext("/api/login", new LoginHandler());
            server.createContext("/api/register", new UserHandler());
            server.createContext("/api/users", new UserHandler());
            server.createContext("/api/categorias", new CategoryHandler());
            server.createContext("/api/chamados", new TicketHandler());
            server.createContext("/api/notificacoes", new NotificationHandler());

            // Executa com um thread pool para lidar com múltiplas requisições simultâneas
            server.setExecutor(Executors.newFixedThreadPool(10));
            server.start();

            System.out.println("API Principal iniciada na porta " + port);

        } catch (Exception e) {
            System.err.println("Falha ao iniciar o servidor: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
