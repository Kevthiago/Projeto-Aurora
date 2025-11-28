package com.example.exception;

/**
 * Custom exception for authentication-related operations
 */
public class CustomExceptions extends RuntimeException {
    
    public CustomExceptions(String message) {
        super(message);
    }
    
    public CustomExceptions(String message, Throwable cause) {
        super(message, cause);
    }
}
