package com.example.service;


import com.example.dto.DependentDto;

import java.util.List;

public interface DependentService {
    DependentDto create(DependentDto dto);
    DependentDto getById(Long id);
    List<DependentDto> getByCaregiver(Long caregiverId);
    DependentDto update(Long id, DependentDto dto);
    void delete(Long id);
}
