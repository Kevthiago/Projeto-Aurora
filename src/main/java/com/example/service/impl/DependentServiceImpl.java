package com.example.service.impl;

import com.example.dto.DependentDto;
import com.example.entity.Caregiver;
import com.example.entity.Dependent;
import com.example.repository.CaregiverRepository;
import com.example.repository.DependentRepository;
import com.example.service.DependentService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.*;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DependentServiceImpl implements DependentService {

    private final DependentRepository repo;
    private final CaregiverRepository caregiverRepo;

    public DependentServiceImpl(DependentRepository repo, CaregiverRepository caregiverRepo) {
        this.repo = repo;
        this.caregiverRepo = caregiverRepo;
    }

    @Override
    public DependentDto create(DependentDto dto) {
        Caregiver caregiver = caregiverRepo.findById(dto.getCaregiverId())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Caregiver not found"));

        Dependent dependent = new Dependent();
        BeanUtils.copyProperties(dto, dependent);
        dependent.setCaregiver(caregiver);

        repo.save(dependent);
        dto.setId(dependent.getId());
        return dto;
    }

    @Override
    public DependentDto getById(Long id) {
        Dependent dep = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Dependent not found"));

        DependentDto dto = new DependentDto();
        BeanUtils.copyProperties(dep, dto);
        dto.setCaregiverId(dep.getCaregiver().getId());
        return dto;
    }

    @Override
    public List<DependentDto> getByCaregiver(Long caregiverId) {
        return repo.findByCaregiverId(caregiverId).stream().map(d -> {
            DependentDto dto = new DependentDto();
            BeanUtils.copyProperties(d, dto);
            dto.setCaregiverId(caregiverId);
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public DependentDto update(Long id, DependentDto dto) {
        Dependent dep = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Dependent not found"));

        dep.setName(dto.getName());
        dep.setAge(dto.getAge());
        repo.save(dep);

        dto.setId(dep.getId());
        return dto;
    }

    @Override
    public void delete(Long id) {
        if (!repo.existsById(id))
            throw new ResponseStatusException(NOT_FOUND, "Dependent not found");

        repo.deleteById(id);
    }
}

