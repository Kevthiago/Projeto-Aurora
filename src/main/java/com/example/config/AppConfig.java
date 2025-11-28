package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * Configuration class for application beans
 */
@Configuration
public class AppConfig {

    /**
     * WebClient bean for making HTTP requests (e.g., to OpenAI API)
     */
    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                .build();
    }
}
