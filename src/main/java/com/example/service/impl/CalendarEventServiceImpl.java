package com.example.service.impl;

import com.example.dto.CalendarEventDto;
import com.example.entity.CalendarEvent;
import com.example.entity.Dependent;
import com.example.repository.CalendarEventRepository;
import com.example.repository.DependentRepository;
import com.example.service.CalendarEventService;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class CalendarEventServiceImpl implements CalendarEventService {

    private final CalendarEventRepository repository;
    private final DependentRepository dependentRepository;

    public CalendarEventServiceImpl(CalendarEventRepository repository, DependentRepository dependentRepository) {
        this.repository = repository;
        this.dependentRepository = dependentRepository;
    }

    @Override
    public CalendarEventDto create(CalendarEventDto dto) {
        Dependent dependent = dependentRepository.findById(dto.getDependentId())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Dependent not found"));

        CalendarEvent event = new CalendarEvent();
        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setDate(dto.getDate());
        event.setTime(dto.getTime());
        event.setDependent(dependent);

        repository.save(event);
        dto.setId(event.getId());
        return dto;
    }

    @Override
    public CalendarEventDto update(Long id, CalendarEventDto dto) {
        CalendarEvent event = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Event not found"));

        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setDate(dto.getDate());
        event.setTime(dto.getTime());

        repository.save(event);

        dto.setId(event.getId());
        return dto;
    }

    @Override
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(NOT_FOUND, "Event not found");
        }
        repository.deleteById(id);
    }

    @Override
    public CalendarEventDto getById(Long id) {
        CalendarEvent event = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Event not found"));

        CalendarEventDto dto = new CalendarEventDto();
        dto.setId(event.getId());
        dto.setTitle(event.getTitle());
        dto.setDescription(event.getDescription());
        dto.setDate(event.getDate());
        dto.setTime(event.getTime());
        dto.setDependentId(event.getDependent().getId());

        return dto;
    }

    @Override
    public List<CalendarEventDto> getByDependent(Long dependentId) {
        return repository.findByDependentId(dependentId)
                .stream()
                .map(event -> {
                    CalendarEventDto dto = new CalendarEventDto();
                    dto.setId(event.getId());
                    dto.setTitle(event.getTitle());
                    dto.setDescription(event.getDescription());
                    dto.setDate(event.getDate());
                    dto.setTime(event.getTime());
                    dto.setDependentId(dependentId);
                    return dto;
                })
                .collect(Collectors.toList());
    }
}

