package com.helpdesk.api.dao;

import com.helpdesk.api.config.Database;
import com.helpdesk.api.model.TicketTimeline;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class TicketTimelineDao {

    private TicketTimeline mapResultSetToTimeline(ResultSet rs) throws SQLException {
        TicketTimeline timeline = new TicketTimeline();
        timeline.setId(rs.getInt("id"));
        timeline.setTicketId(rs.getInt("ticket_id"));
        timeline.setAuthorId(rs.getInt("author_id"));
        timeline.setEventType(rs.getString("event_type"));
        timeline.setMessage(rs.getString("message"));
        timeline.setCreatedAt(rs.getTimestamp("created_at").toString());
        
        try {
            timeline.setAuthorName(rs.getString("author_name"));
        } catch (SQLException e) {
            // column not present
        }
        
        return timeline;
    }

    public boolean insert(TicketTimeline timeline) {
        String sql = "INSERT INTO ticket_timeline (ticket_id, author_id, event_type, message) VALUES (?, ?, ?, ?)";
        Connection conn = null;
        try {
            conn = Database.getConnection();
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, timeline.getTicketId());
                stmt.setInt(2, timeline.getAuthorId());
                stmt.setString(3, timeline.getEventType());
                stmt.setString(4, timeline.getMessage());
                return stmt.executeUpdate() > 0;
            }
        } catch (SQLException e) {
            System.err.println("Erro ao registrar evento na timeline: " + e.getMessage());
        } finally {
            Database.releaseConnection(conn);
        }
        return false;
    }

    public List<TicketTimeline> findByTicketId(int ticketId) {
        List<TicketTimeline> timelineList = new ArrayList<>();
        String sql = "SELECT tl.*, u.name as author_name FROM ticket_timeline tl " +
                     "JOIN users u ON tl.author_id = u.id " +
                     "WHERE tl.ticket_id = ? ORDER BY tl.created_at ASC";
        Connection conn = null;
        try {
            conn = Database.getConnection();
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, ticketId);
                try (ResultSet rs = stmt.executeQuery()) {
                    while (rs.next()) {
                        timelineList.add(mapResultSetToTimeline(rs));
                    }
                }
            }
        } catch (SQLException e) {
            System.err.println("Erro ao listar timeline do chamado: " + e.getMessage());
        } finally {
            Database.releaseConnection(conn);
        }
        return timelineList;
    }
}
