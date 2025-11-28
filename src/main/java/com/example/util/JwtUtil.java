package com.example.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("${jwt.secret:change-me-secret-32-bytes-minimum}")
    private String secret;

    @Value("${jwt.expiration-ms:86400000}")
    private long expiration;

    // --------------------------
    // GERA CHAVE
    // --------------------------
    private Key getSigningKey() {
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // --------------------------
    // GERAR TOKEN
    // --------------------------
    public String generateToken(String subject) {
        Date now = new Date();
        Date expire = new Date(now.getTime() + expiration);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expire)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // --------------------------
    // EXTRAIR CLAIMS
    // --------------------------
    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return resolver.apply(claims);
    }

    // --------------------------
    // EXTRAIR EMAIL (SUBJECT)
    // --------------------------
    public String extractEmail(String token) {
        try {
            return extractClaim(token, Claims::getSubject);
        } catch (Exception ex) {
            return null;
        }
    }

    // --------------------------
    // EXPIRAÇÃO
    // --------------------------
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(String token) {
        Date exp = extractExpiration(token);
        return exp.before(new Date());
    }

    // --------------------------
    // VALIDAR TOKEN
    // --------------------------
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractEmail(token);
        return (username != null &&
                username.equals(userDetails.getUsername()) &&
                !isTokenExpired(token));
    }
}
