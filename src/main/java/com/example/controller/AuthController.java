package com.example.controller;

import com.example.dto.AuthRequestDto;
import com.example.dto.AuthResponseDto;
import com.example.entity.Caregiver;
import com.example.entity.User;
import com.example.entity.UserRole;
import com.example.repository.CaregiverRepository;
import com.example.repository.UserRepository;
import com.example.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final CaregiverRepository caregiverRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository,
                          CaregiverRepository caregiverRepository,
                          PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.caregiverRepository = caregiverRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // --------------------------------------
    // REGISTER A CAREGIVER USER
    // --------------------------------------
    @PostMapping("/register/caregiver")
    public ResponseEntity<?> registerCaregiver(@RequestBody AuthRequestDto dto) {

        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email já registrado.");
        }

        // 1) Criar User
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setPasswordHash(passwordEncoder.encode(dto.getPassword())); // <<< CORREÇÃO AQUI
        user.setRole(UserRole.ROLE_CAREGIVER);

        userRepository.save(user);

        // 2) Criar Caregiver vinculado ao usuário
        Caregiver caregiver = new Caregiver();
        caregiver.setName(dto.getEmail()); // Ajuste depois se quiser permitir nome real
        caregiver.setEmail(dto.getEmail());
        caregiver.setUser(user); // <<< CORRETO

        caregiverRepository.save(caregiver);

        // 3) Criar token
        String token = jwtUtil.generateToken(user.getEmail());

        // 4) Resposta
        AuthResponseDto response = new AuthResponseDto();
        response.setToken(token);
        response.setName(caregiver.getName());
        response.setCaregiverId(caregiver.getId());

        return ResponseEntity.ok(response);
    }


    // --------------------------------------
    // LOGIN
    // --------------------------------------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequestDto dto) {

        User user = userRepository.findByEmail(dto.getEmail())
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(401).body("Usuário não encontrado.");
        }

        // <<< IMPORTANTE
        if (!passwordEncoder.matches(dto.getPassword(), user.getPasswordHash())) {
            return ResponseEntity.status(401).body("Senha incorreta.");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        // Pegar dados do Caregiver (se houver)
        Caregiver caregiver = caregiverRepository.findById(user.getId()).orElse(null);

        AuthResponseDto response = new AuthResponseDto();
        response.setToken(token);
        response.setName(caregiver != null ? caregiver.getName() : user.getEmail());
        response.setCaregiverId(caregiver != null ? caregiver.getId() : null);

        return ResponseEntity.ok(response);
    }
}
