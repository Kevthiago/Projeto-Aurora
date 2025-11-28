package com.example.service;


import com.example.dto.CaregiverDto;

import java.util.List;

public interface CaregiverService {
    CaregiverDto create(CaregiverDto dto, String rawPassword);
    CaregiverDto getById(Long id);
    List<CaregiverDto> getAll();
}
