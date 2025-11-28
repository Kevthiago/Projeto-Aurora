package com.example.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class SelfRegulationAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://api.openai.com/v1")
            .defaultHeader("Authorization", "Bearer " + apiKey)
            .defaultHeader("Content-Type", "application/json")
            .build();

    public String generateCalmingGuide() {

        String prompt = """
                Gere um GUIA DE AUTORREGULAÇÃO curto, ideal para uma pessoa autista em momento de estresse.
                
                O guia deve conter:
                - Técnica de respiração guiada
                - Frases positivas
                - Passos simples de grounding (5-4-3-2-1)
                - Sugestões sensoriais rápidas (pressão profunda, abafamento de sons, etc.)
                - Instruções curtas e claras, próprias para momentos difíceis
                """;

        Map<String, Object> requestBody = Map.of(
                "model", "gpt-4o-mini",
                "messages", List.of(
                        Map.of("role", "system", "content", "Você é um especialista em autorregulação para pessoas autistas."),
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
