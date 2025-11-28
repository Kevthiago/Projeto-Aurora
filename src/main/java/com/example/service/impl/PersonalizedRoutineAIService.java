package com.example.service.impl;

import com.example.entity.ActionLog;
import com.example.repository.ActionLogRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PersonalizedRoutineAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final ActionLogRepository logRepository;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://api.openai.com/v1")
            .defaultHeader("Authorization", "Bearer " + apiKey)
            .defaultHeader("Content-Type", "application/json")
            .build();

    public PersonalizedRoutineAIService(ActionLogRepository logRepository) {
        this.logRepository = logRepository;
    }

    public String generateRoutine(Long dependentId) {

        List<ActionLog> logs = logRepository.findByDependentIdOrderByTimestampDesc(dependentId);

        String logsText = logs.isEmpty()
                ? "Nenhuma ação registrada."
                : logs.stream()
                    .map(l -> l.getTimestamp() + " - " + l.getAction())
                    .collect(Collectors.joining("\n"));

        String prompt = """
                Você é um especialista em autismo e desenvolvimento infantil.
                Com base nas ações abaixo, gere uma ROTINA PERSONALIZADA para o dependente,
                incluindo:

                - Horários sugeridos
                - Atividades recomendadas
                - Pausas sensoriais
                - Estratégias de comunicação
                - Dicas ao cuidador
                - Possíveis previsões de comportamento

                AÇÕES REGISTRADAS:
                %s
                """.formatted(logsText);

        Map<String, Object> requestBody = Map.of(
                "model", "gpt-4o-mini",
                "messages", List.of(
                        Map.of("role", "system", "content", "Você é um especialista em rotinas estruturadas para pessoas autistas."),
                        Map.of("role", "user", "content", prompt)
                )
        );

        Map response = webClient.post()
                .uri("/chat/completions")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
        Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");

        return message.get("content").toString();
    }
}
