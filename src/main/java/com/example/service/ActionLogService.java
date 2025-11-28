package com.example.service;

import com.example.dto.ActionLogDto;

import java.util.List;

public interface ActionLogService {
    ActionLogDto create(ActionLogDto dto);
    List<ActionLogDto> getByDependent(Long dependentId);
}
