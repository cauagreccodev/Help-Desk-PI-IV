package com.helpdesk.api.model;

/**
 * POJO representando a tabela 'users'.
 * O campo passwordHash é transient para não ser serializado pelo Gson.
 */
public class User {

    private int id;
    private String name;
    private String email;
    private transient String passwordHash; // Não aparece no JSON de resposta
    private String role;       // CLIENT, SUPPORT, ADMIN
    private String department;
    private String jobTitle;
    private String avatarUrl;
    private boolean isActive;
    private String createdAt;
    private String updatedAt;

    public User() {}

    // ── Getters ──

    public int getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPasswordHash() { return passwordHash; }
    public String getRole() { return role; }
    public String getDepartment() { return department; }
    public String getJobTitle() { return jobTitle; }
    public String getAvatarUrl() { return avatarUrl; }
    public boolean isActive() { return isActive; }
    public String getCreatedAt() { return createdAt; }
    public String getUpdatedAt() { return updatedAt; }

    // ── Setters ──

    public void setId(int id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public void setRole(String role) { this.role = role; }
    public void setDepartment(String department) { this.department = department; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public void setActive(boolean active) { isActive = active; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
}
