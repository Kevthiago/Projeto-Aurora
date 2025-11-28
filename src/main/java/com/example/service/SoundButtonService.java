package com.example.service;

import com.example.dto.SoundButtonDto;

import java.util.List;

public interface SoundButtonService {
    SoundButtonDto create(SoundButtonDto dto);
    SoundButtonDto update(Long id, SoundButtonDto dto);
    void delete(Long id);
    List<SoundButtonDto> getByCaregiver(Long caregiverId);
}

