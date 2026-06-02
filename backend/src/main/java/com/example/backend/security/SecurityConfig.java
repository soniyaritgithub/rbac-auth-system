package com.example.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {

        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                .cors(cors -> {})

                .csrf(AbstractHttpConfigurer::disable)

                .sessionManagement(session ->

                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(

                                "/",   // Added root URL access

                                "/auth/register",

                                "/auth/login",

                                "/swagger-ui/**",

                                "/v3/api-docs/**"

                        ).permitAll()

                        .requestMatchers("/admin/**")

                        .hasRole("ADMIN")

                        .requestMatchers("/user/**")

                        .hasAnyRole(
                                "USER",
                                "ADMIN"
                        )

                        .anyRequest()

                        .authenticated()
                )

                .addFilterBefore(

                        jwtAuthFilter,

                        UsernamePasswordAuthenticationFilter.class
                )

                .formLogin(
                        form -> form.disable()
                )

                .httpBasic(
                        httpBasic -> httpBasic.disable()
                );

        return http.build();
    }
}