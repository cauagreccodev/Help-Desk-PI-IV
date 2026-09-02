package com.helpdesk.api.util;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;

public class AuthUtil {
    // Chave secreta nativa e configurável. Se não informada, gera uma temporária ou usar fallback
    private static final String SECRET = System.getenv().getOrDefault("JWT_SECRET", "minha-chave-secreta-super-segura-hmac-256");

    /**
     * Gera um salt aleatório.
     */
    private static byte[] getSalt() throws NoSuchAlgorithmException {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }

    /**
     * Gera o hash da senha usando SHA-256 com salt.
     * Retorna a string no formato: base64(salt):base64(hash)
     */
    public static String hashPassword(String password) {
        try {
            byte[] salt = getSalt();
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(salt);
            byte[] hashedPassword = md.digest(password.getBytes(StandardCharsets.UTF_8));
            
            String saltBase64 = Base64.getEncoder().encodeToString(salt);
            String hashBase64 = Base64.getEncoder().encodeToString(hashedPassword);
            
            return saltBase64 + ":" + hashBase64;
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Erro ao gerar hash da senha", e);
        }
    }

    /**
     * Verifica se a senha em texto plano bate com o hash armazenado.
     */
    public static boolean checkPassword(String password, String storedHash) {
        if (storedHash == null || !storedHash.contains(":")) return false;
        
        try {
            String[] parts = storedHash.split(":");
            byte[] salt = Base64.getDecoder().decode(parts[0]);
            String expectedHash = parts[1];
            
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(salt);
            byte[] hashedPassword = md.digest(password.getBytes(StandardCharsets.UTF_8));
            String newHashBase64 = Base64.getEncoder().encodeToString(hashedPassword);
            
            return expectedHash.equals(newHashBase64);
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Gera assinatura HMAC-SHA256 para um dado texto.
     */
    private static String hmacSha256(String data, String secret) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKeySpec);
            byte[] hmacBytes = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(hmacBytes);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao assinar token", e);
        }
    }

    /**
     * Gera um token seguro usando HMAC-SHA256.
     * Estrutura: base64Url(userId:expirationTimestamp).signature
     */
    public static String generateToken(int userId) {
        long expirationTime = System.currentTimeMillis() + (24 * 60 * 60 * 1000); // 24 horas
        String payload = userId + ":" + expirationTime;
        String payloadBase64 = Base64.getUrlEncoder().withoutPadding().encodeToString(payload.getBytes(StandardCharsets.UTF_8));
        String signature = hmacSha256(payloadBase64, SECRET);
        
        return payloadBase64 + "." + signature;
    }

    /**
     * Valida o token seguro e retorna o userId. 
     * Retorna null se for inválido, adulterado ou expirado.
     */
    public static Integer validateToken(String token) {
        if (token == null || !token.contains(".")) return null;
        
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 2) return null;
            
            String payloadBase64 = parts[0];
            String signature = parts[1];
            
            // Verifica assinatura (evita adulteração)
            String expectedSignature = hmacSha256(payloadBase64, SECRET);
            if (!signature.equals(expectedSignature)) {
                return null;
            }
            
            // Decode do payload
            String payload = new String(Base64.getUrlDecoder().decode(payloadBase64), StandardCharsets.UTF_8);
            String[] payloadParts = payload.split(":");
            if (payloadParts.length != 2) return null;
            
            int userId = Integer.parseInt(payloadParts[0]);
            long expirationTime = Long.parseLong(payloadParts[1]);
            
            // Verifica expiração
            if (System.currentTimeMillis() > expirationTime) {
                return null;
            }
            
            return userId;
        } catch (Exception e) {
            return null;
        }
    }
}
