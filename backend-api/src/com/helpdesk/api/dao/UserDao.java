package com.helpdesk.api.dao;

import com.helpdesk.api.config.Database;
import com.helpdesk.api.model.User;
import com.helpdesk.api.util.AuthUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserDao {

    private User mapResultSetToUser(ResultSet rs) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setName(rs.getString("name"));
        user.setEmail(rs.getString("email"));
        user.setPasswordHash(rs.getString("password_hash"));
        user.setRole(rs.getString("role"));
        user.setDepartment(rs.getString("department"));
        user.setJobTitle(rs.getString("job_title"));
        user.setAvatarUrl(rs.getString("avatar_url"));
        user.setActive(rs.getBoolean("is_active"));
        user.setCreatedAt(rs.getTimestamp("created_at").toString());
        if (rs.getTimestamp("updated_at") != null) {
            user.setUpdatedAt(rs.getTimestamp("updated_at").toString());
        }
        return user;
    }

    public User findByEmail(String email) {
        String sql = "SELECT * FROM users WHERE email = ?";
        Connection conn = null;
        try {
            conn = Database.getConnection();
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, email);
                try (ResultSet rs = stmt.executeQuery()) {
                    if (rs.next()) {
                        return mapResultSetToUser(rs);
                    }
                }
            }
        } catch (SQLException e) {
            System.err.println("Erro ao buscar usuário por e-mail: " + e.getMessage());
        } finally {
            Database.releaseConnection(conn);
        }
        return null;
    }

    public User findById(int id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        Connection conn = null;
        try {
            conn = Database.getConnection();
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, id);
                try (ResultSet rs = stmt.executeQuery()) {
                    if (rs.next()) {
                        return mapResultSetToUser(rs);
                    }
                }
            }
        } catch (SQLException e) {
            System.err.println("Erro ao buscar usuário por id: " + e.getMessage());
        } finally {
            Database.releaseConnection(conn);
        }
        return null;
    }

    public List<User> findAll() {
        List<User> users = new ArrayList<>();
        String sql = "SELECT * FROM users ORDER BY name";
        Connection conn = null;
        try {
            conn = Database.getConnection();
            try (PreparedStatement stmt = conn.prepareStatement(sql);
                 ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    users.add(mapResultSetToUser(rs));
                }
            }
        } catch (SQLException e) {
            System.err.println("Erro ao listar usuários: " + e.getMessage());
        } finally {
            Database.releaseConnection(conn);
        }
        return users;
    }

    public User insert(User user, String plainPassword) {
        String sql = "INSERT INTO users (name, email, password_hash, role, department, job_title) VALUES (?, ?, ?, ?, ?, ?) RETURNING *";
        Connection conn = null;
        try {
            conn = Database.getConnection();
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, user.getName());
                stmt.setString(2, user.getEmail());
                stmt.setString(3, AuthUtil.hashPassword(plainPassword));
                stmt.setString(4, user.getRole());
                stmt.setString(5, user.getDepartment());
                stmt.setString(6, user.getJobTitle());
                
                try (ResultSet rs = stmt.executeQuery()) {
                    if (rs.next()) {
                        return mapResultSetToUser(rs);
                    }
                }
            }
        } catch (SQLException e) {
            System.err.println("Erro ao inserir usuário: " + e.getMessage());
        } finally {
            Database.releaseConnection(conn);
        }
        return null;
    }
}
