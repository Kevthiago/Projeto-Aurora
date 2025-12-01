package com.example.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.ExternalDocumentation; // <-- CORRETO AQUI
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {

        final String securitySchemeName = "bearerAuth";

        return new OpenAPI()
                .components(new Components().addSecuritySchemes(securitySchemeName,
                        new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                ))
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .info(new Info()
                        .title("🌌 Aurora API")
                        .description("""
                                Bem-vindo à documentação oficial do **Aurora**, uma plataforma
                                desenvolvida para auxiliar no cuidado de pessoas neurodivergentes,
                                oferecendo rotinas personalizadas, monitoramento de humor e 
                                ferramentas de apoio multiplataforma.

                                ### ✨ Principais funcionalidades da API
                                - Autenticação segura com JWT
                                - Geração de rotinas personalizadas via IA
                                - Registro de humor e comportamentos
                                - Módulo de comunicação assistiva
                                - Integração com app mobile e painel web

                                Para testar os endpoints protegidos, clique em **Authorize**
                                e informe um token JWT válido no formato:

                                ```
                                Bearer SEU_TOKEN_AQUI
                                ```
                                """)
                        .version("1.0.0")
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT"))
                        .contact(new Contact()
                                .name("Equipe Aurora")
                                .email("suporte@auroraapp.com")
                                .url("https://github.com/Kevthiago/Projeto-Aurora/tree/main")))
                .externalDocs(new ExternalDocumentation()
                        .description("Repositório oficial no GitHub")
                        .url("https://github.com/Kevthiago/Projeto-Aurora/tree/main"));
    }
}
