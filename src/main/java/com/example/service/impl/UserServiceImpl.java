package com.example.service.impl;

import com.example.entity.User;
import com.example.entity.UserRole;
import com.example.repository.UserRepository;
import com.example.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User createUser(String email, String rawPassword, UserRole role) {
        if (repository.findByEmail(email).isPresent()) {
            throw new ResponseStatusException(CONFLICT, "Email already registered");
        }

        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(rawPassword));
        user.setRole(role);

        return repository.save(user);
    }

    @Override
    public User getByEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "User not found"));
    }
}

