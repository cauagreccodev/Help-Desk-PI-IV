package com.helpdesk.api.model;

/**
 * POJO representando a tabela 'categories'.
 */
public class Category {

    private int id;
    private String name;
    private String icon;
    private String description;
    private boolean isActive;
    private String createdAt;

    public Category() {}

    // ── Getters ──

    public int getId() { return id; }
    public String getName() { return name; }
    public String getIcon() { return icon; }
    public String getDescription() { return description; }
    public boolean isActive() { return isActive; }
    public String getCreatedAt() { return createdAt; }

    // ── Setters ──

    public void setId(int id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setIcon(String icon) { this.icon = icon; }
    public void setDescription(String description) { this.description = description; }
    public void setActive(boolean active) { isActive = active; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}
