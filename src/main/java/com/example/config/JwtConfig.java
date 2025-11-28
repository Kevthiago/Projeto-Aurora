package com.example.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;


@Configuration
public class JwtConfig {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration-ms}")
    private int jwtExpirationMs;

    public String getJwtSecret() {
        return jwtSecret;
    }

    public int getJwtExpirationMs() {
        return jwtExpirationMs;
    }
}
