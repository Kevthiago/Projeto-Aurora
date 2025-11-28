package com.example.service;


import com.example.entity.Caregiver;
import com.example.repository.CaregiverRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CaregiverDetailsService implements UserDetailsService {

    private final CaregiverRepository caregiverRepository;

    public CaregiverDetailsService(CaregiverRepository caregiverRepository) {
        this.caregiverRepository = caregiverRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Caregiver caregiver = caregiverRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Caregiver not found: " + email));

        return new User(
                caregiver.getEmail(),
                caregiver.getPasswordHash(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_CAREGIVER"))
        );
    }
}