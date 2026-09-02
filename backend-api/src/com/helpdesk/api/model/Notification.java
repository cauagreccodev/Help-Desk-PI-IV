package com.helpdesk.api.model;

/**
 * POJO representando a tabela 'notifications'.
 */
public class Notification {

    private int id;
    private int userId;
    private Integer ticketId; // Nullable
    private String type;      // chamado_novo, status_alterado, comentario, atribuicao, resolvido
    private String title;
    private String message;
    private boolean isRead;
    private String createdAt;

    public Notification() {}

    // ── Getters ──

    public int getId() { return id; }
    public int getUserId() { return userId; }
    public Integer getTicketId() { return ticketId; }
    public String getType() { return type; }
    public String getTitle() { return title; }
    public String getMessage() { return message; }
    public boolean isRead() { return isRead; }
    public String getCreatedAt() { return createdAt; }

    // ── Setters ──

    public void setId(int id) { this.id = id; }
    public void setUserId(int userId) { this.userId = userId; }
    public void setTicketId(Integer ticketId) { this.ticketId = ticketId; }
    public void setType(String type) { this.type = type; }
    public void setTitle(String title) { this.title = title; }
    public void setMessage(String message) { this.message = message; }
    public void setRead(boolean read) { isRead = read; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}
