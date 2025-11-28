package com.example.service.impl;

import com.example.dto.CaregiverDto;
import com.example.entity.Caregiver;
import com.example.repository.CaregiverRepository;
import com.example.service.CaregiverService;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CaregiverServiceImpl implements CaregiverService {

    private final CaregiverRepository repository;
    private final PasswordEncoder encoder;

    public CaregiverServiceImpl(CaregiverRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    @Override
    public CaregiverDto create(CaregiverDto dto, String rawPassword) {
        Caregiver caregiver = new Caregiver();
        BeanUtils.copyProperties(dto, caregiver);
        caregiver.setPasswordHash(encoder.encode(rawPassword));

        repository.save(caregiver);

        dto.setId(caregiver.getId());
        return dto;
    }

    @Override
    public CaregiverDto getById(Long id) {
        Caregiver caregiver = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Caregiver not found"));

        CaregiverDto dto = new CaregiverDto();
        BeanUtils.copyProperties(caregiver, dto);
        return dto;
    }

    @Override
    public List<CaregiverDto> getAll() {
        return repository.findAll().stream().map(c -> {
            CaregiverDto dto = new CaregiverDto();
            BeanUtils.copyProperties(c, dto);
            return dto;
        }).collect(Collectors.toList());
    }
}

