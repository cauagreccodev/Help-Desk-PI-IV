package com.helpdesk.api.dao;

import com.helpdesk.api.config.Database;
import com.helpdesk.api.model.Notification;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class NotificationDao {

    private Notification mapResultSetToNotification(ResultSet rs) throws SQLException {
        Notification notification = new Notification();
        notification.setId(rs.getInt("id"));
        notification.setUserId(rs.getInt("user_id"));
        
        int ticketId = rs.getInt("ticket_id");
        if (!rs.wasNull()) {
            notification.setTicketId(ticketId);
        }
        
        notification.setType(rs.getString("type"));
        notification.setTitle(rs.getString("title"));
        notification.setMessage(rs.getString("message"));
        notification.setRead(rs.getBoolean("is_read"));
        notification.setCreatedAt(rs.getTimestamp("created_at").toString());
        return notification;
    }

    public boolean insert(Notification notification) {
        String sql = "INSERT INTO notifications (user_id, ticket_id, type, title, message) VALUES (?, ?, ?, ?, ?)";
        Connection conn = null;
        try {
            conn = Database.getConnection();
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, notification.getUserId());
                if (notification.getTicketId() != null) {
                    stmt.setInt(2, notification.getTicketId());
                } else {
                    stmt.setNull(2, java.sql.Types.INTEGER);
                }
                stmt.setString(3, notification.getType());
                stmt.setString(4, notification.getTitle());
                stmt.setString(5, notification.getMessage());
                return stmt.executeUpdate() > 0;
            }
        } catch (SQLException e) {
            System.err.println("Erro ao inserir notificação: " + e.getMessage());
        } finally {
            Database.releaseConnection(conn);
        }
        return false;
    }

    public List<Notification> findByUserId(int userId) {
        List<Notification> notifications = new ArrayList<>();
        String sql = "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC";
        Connection conn = null;
        try {
            conn = Database.getConnection();
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, userId);
                try (ResultSet rs = stmt.executeQuery()) {
                    while (rs.next()) {
                        notifications.add(mapResultSetToNotification(rs));
                    }
                }
            }
        } catch (SQLException e) {
            System.err.println("Erro ao listar notificações: " + e.getMessage());
        } finally {
            Database.releaseConnection(conn);
        }
        return notifications;
    }

    public boolean markAsRead(int notificationId, int userId) {
        String sql = "UPDATE notifications SET is_read = true WHERE id = ? AND user_id = ?";
        Connection conn = null;
        try {
            conn = Database.getConnection();
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, notificationId);
                stmt.setInt(2, userId);
                return stmt.executeUpdate() > 0;
            }
        } catch (SQLException e) {
            System.err.println("Erro ao atualizar notificação: " + e.getMessage());
        } finally {
            Database.releaseConnection(conn);
        }
        return false;
    }
}
