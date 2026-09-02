package com.helpdesk.api.model;

/**
 * POJO representando a tabela 'tickets'.
 * Campos extras (clientName, supportName, categoryName) são preenchidos via JOIN nos DAOs.
 */
public class Ticket {

    private int id;
    private String title;
    private String description;
    private String status;     // NEW, ASSIGNED, CLOSED, UNRESOLVED
    private String priority;   // LOW, MEDIUM, HIGH, URGENT
    private int categoryId;
    private int clientId;
    private Integer supportId; // Nullable — Integer para permitir null
    private String createdAt;
    private String updatedAt;
    private String closedAt;

    // Campos extras (preenchidos via JOIN, não existem na tabela)
    private String clientName;
    private String supportName;
    private String categoryName;

    public Ticket() {}

    // ── Getters ──

    public int getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getStatus() { return status; }
    public String getPriority() { return priority; }
    public int getCategoryId() { return categoryId; }
    public int getClientId() { return clientId; }
    public Integer getSupportId() { return supportId; }
    public String getCreatedAt() { return createdAt; }
    public String getUpdatedAt() { return updatedAt; }
    public String getClosedAt() { return closedAt; }
    public String getClientName() { return clientName; }
    public String getSupportName() { return supportName; }
    public String getCategoryName() { return categoryName; }

    // ── Setters ──

    public void setId(int id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setStatus(String status) { this.status = status; }
    public void setPriority(String priority) { this.priority = priority; }
    public void setCategoryId(int categoryId) { this.categoryId = categoryId; }
    public void setClientId(int clientId) { this.clientId = clientId; }
    public void setSupportId(Integer supportId) { this.supportId = supportId; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
    public void setClosedAt(String closedAt) { this.closedAt = closedAt; }
    public void setClientName(String clientName) { this.clientName = clientName; }
    public void setSupportName(String supportName) { this.supportName = supportName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
}
