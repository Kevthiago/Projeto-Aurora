package com.example.service;

import com.example.entity.User;
import com.example.entity.UserRole;

public interface UserService {
    User createUser(String email, String password, UserRole role);
    User getByEmail(String email);
}