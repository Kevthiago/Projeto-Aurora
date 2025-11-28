package com.example.service.impl;

import com.example.dto.SoundButtonDto;
import com.example.entity.Caregiver;
import com.example.entity.SoundButton;
import com.example.repository.CaregiverRepository;
import com.example.repository.SoundButtonRepository;
import com.example.service.SoundButtonService;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class SoundButtonServiceImpl implements SoundButtonService {

    private final SoundButtonRepository repository;
    private final CaregiverRepository caregiverRepository;

    public SoundButtonServiceImpl(SoundButtonRepository repository, CaregiverRepository caregiverRepository) {
        this.repository = repository;
        this.caregiverRepository = caregiverRepository;
    }

    @Override
    public SoundButtonDto create(SoundButtonDto dto) {
        Caregiver caregiver = caregiverRepository.findById(dto.getCaregiverId())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Caregiver not found"));

        SoundButton button = new SoundButton();
        button.setLabel(dto.getLabel());
        button.setAudioUrl(dto.getAudioUrl());
        button.setIconUrl(dto.getIconUrl());
        button.setCaregiver(caregiver);

        repository.save(button);
        dto.setId(button.getId());
        return dto;
    }

    @Override
    public SoundButtonDto update(Long id, SoundButtonDto dto) {
        SoundButton button = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Button not found"));

        button.setLabel(dto.getLabel());
        button.setAudioUrl(dto.getAudioUrl());
        button.setIconUrl(dto.getIconUrl());

        repository.save(button);
        dto.setId(button.getId());
        return dto;
    }

    @Override
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(NOT_FOUND, "Button not found");
        }
        repository.deleteById(id);
    }

    @Override
    public List<SoundButtonDto> getByCaregiver(Long caregiverId) {
        return repository.findByCaregiverId(caregiverId)
                .stream()
                .map(btn -> {
                    SoundButtonDto dto = new SoundButtonDto();
                    dto.setId(btn.getId());
                    dto.setLabel(btn.getLabel());
                    dto.setAudioUrl(btn.getAudioUrl());
                    dto.setIconUrl(btn.getIconUrl());
                    dto.setCaregiverId(caregiverId);
                    return dto;
                })
                .collect(Collectors.toList());
    }
}

