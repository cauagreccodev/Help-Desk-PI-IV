package com.helpdesk.api.model;

/**
 * POJO representando a tabela 'ticket_timeline'.
 * Registra eventos do chamado: criação, atribuição, mudança de status, comentários.
 */
public class TicketTimeline {

    private int id;
    private int ticketId;
    private int authorId;
    private String eventType;  // CREATION, ASSIGNMENT, STATUS_CHANGE, PRIORITY_CHANGE, COMMENT
    private String message;
    private String createdAt;

    // Campo extra (preenchido via JOIN)
    private String authorName;

    public TicketTimeline() {}

    // ── Getters ──

    public int getId() { return id; }
    public int getTicketId() { return ticketId; }
    public int getAuthorId() { return authorId; }
    public String getEventType() { return eventType; }
    public String getMessage() { return message; }
    public String getCreatedAt() { return createdAt; }
    public String getAuthorName() { return authorName; }

    // ── Setters ──

    public void setId(int id) { this.id = id; }
    public void setTicketId(int ticketId) { this.ticketId = ticketId; }
    public void setAuthorId(int authorId) { this.authorId = authorId; }
    public void setEventType(String eventType) { this.eventType = eventType; }
    public void setMessage(String message) { this.message = message; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }
}
