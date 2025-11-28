package com.example.service;

import com.example.dto.ResourceGuideDto;

import java.util.List;

public interface ResourceGuideService {
    ResourceGuideDto create(ResourceGuideDto dto);
    List<ResourceGuideDto> getByDependent(Long dependentId);
}
