package com.example.service.impl;

import com.example.dto.ActionLogDto;
import com.example.entity.ActionLog;
import com.example.entity.Dependent;
import com.example.repository.ActionLogRepository;
import com.example.repository.DependentRepository;
import com.example.service.ActionLogService;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class ActionLogServiceImpl implements ActionLogService {

    private final ActionLogRepository repository;
    private final DependentRepository dependentRepository;

    public ActionLogServiceImpl(ActionLogRepository repository, DependentRepository dependentRepository) {
        this.repository = repository;
        this.dependentRepository = dependentRepository;
    }

    @Override
    public ActionLogDto create(ActionLogDto dto) {
        Dependent dependent = dependentRepository.findById(dto.getDependentId())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Dependent not found"));

        ActionLog log = new ActionLog();
        log.setAction(dto.getAction());
        log.setTimestamp(LocalDateTime.now());
        log.setDependent(dependent);

        repository.save(log);

        dto.setId(log.getId());
        dto.setTimestamp(log.getTimestamp());
        return dto;
    }

    @Override
    public List<ActionLogDto> getByDependent(Long dependentId) {
        return repository.findByDependentIdOrderByTimestampDesc(dependentId)
                .stream()
                .map(log -> {
                    ActionLogDto dto = new ActionLogDto();
                    dto.setId(log.getId());
                    dto.setAction(log.getAction());
                    dto.setTimestamp(log.getTimestamp());
                    dto.setDependentId(dependentId);
                    return dto;
                })
                .collect(Collectors.toList());
    }
}

