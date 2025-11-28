package com.example.service.impl;

import com.example.dto.ResourceGuideDto;
import com.example.entity.Dependent;
import com.example.entity.ResourceGuide;
import com.example.repository.DependentRepository;
import com.example.repository.ResourceGuideRepository;
import com.example.service.ResourceGuideService;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class ResourceGuideServiceImpl implements ResourceGuideService {

    private final ResourceGuideRepository repository;
    private final DependentRepository dependentRepository;

    public ResourceGuideServiceImpl(ResourceGuideRepository repository, DependentRepository dependentRepository) {
        this.repository = repository;
        this.dependentRepository = dependentRepository;
    }

    @Override
    public ResourceGuideDto create(ResourceGuideDto dto) {
        Dependent dependent = dependentRepository.findById(dto.getDependentId())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Dependent not found"));

        ResourceGuide guide = new ResourceGuide();
        guide.setTitle(dto.getTitle());
        guide.setContent(dto.getContent());
        guide.setVideoUrl(dto.getVideoUrl());
        guide.setDependent(dependent);

        repository.save(guide);

        dto.setId(guide.getId());
        return dto;
    }

    @Override
    public List<ResourceGuideDto> getByDependent(Long dependentId) {
        return repository.findByDependentId(dependentId)
                .stream()
                .map(guide -> {
                    ResourceGuideDto dto = new ResourceGuideDto();
                    dto.setId(guide.getId());
                    dto.setTitle(guide.getTitle());
                    dto.setContent(guide.getContent());
                    dto.setVideoUrl(guide.getVideoUrl());
                    dto.setDependentId(dependentId);
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
