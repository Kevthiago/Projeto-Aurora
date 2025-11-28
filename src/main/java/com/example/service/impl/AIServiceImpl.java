package com.example.service.impl;

import com.example.entity.ActionLog;
import com.example.repository.ActionLogRepository;
import com.example.service.AIService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AIServiceImpl implements AIService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final ActionLogRepository logRepository;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://api.openai.com/v1")
            .defaultHeader("Authorization", "Bearer " + apiKey)
            .defaultHeader("Content-Type", "application/json")
            .build();

    public AIServiceImpl(ActionLogRepository logRepository) {
        this.logRepository = logRepository;
    }

    @Override
    public String analyzeDependentActions(Long dependentId) {

        List<ActionLog> logs = logRepository.findByDependentIdOrderByTimestampDesc(dependentId);

        if (logs.isEmpty()) {
            return "Nenhuma ação registrada para este dependente.";
        }

        // Constrói texto dos registros
        String logsText = logs.stream()
                .map(log -> log.getTimestamp() + " - " + log.getAction())
                .collect(Collectors.joining("\n"));

        // Prompt com especialização em autismo
        String prompt = """
                Você é um especialista em autismo.
                Analise as ações abaixo de um dependente autista e gere:

                - Um resumo geral em linguagem simples
                - Interpretações possíveis do comportamento
                - Recomendações práticas para o cuidador
                - Sinais de alerta (se houver)

                AÇÕES REGISTRADAS:
                %s
                """.formatted(logsText);

        // Corpo do request usando Map legível
        Map<String, Object> requestBody = Map.of(
                "model", "gpt-4o-mini",
                "messages", List.of(
                        Map.of("role", "system", "content", "Você é um especialista em autismo e comportamento infantil."),
                        Map.of("role", "user", "content", prompt)
                )
        );

        // Envio para API
        Map response = webClient.post()
                .uri("/chat/completions")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        // Extrai a resposta real
        List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
        Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");

        return message.get("content").toString();
    }
}
