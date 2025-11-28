package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for user login request
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    private String username;
    private String password;
}

/**
 * DTO for JWT response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String username;
    private String email;

    public JwtResponse(String token, String username, String email) {
        this.token = token;
        this.username = username;
        this.email = email;
    }
}
