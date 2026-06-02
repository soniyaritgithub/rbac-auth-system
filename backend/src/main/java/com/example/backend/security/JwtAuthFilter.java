package com.example.backend.security;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    private final CustomUserDetailsService customUserDetailsService;

    public JwtAuthFilter(
            JwtUtil jwtUtil,
            CustomUserDetailsService customUserDetailsService
    ) {

        this.jwtUtil = jwtUtil;

        this.customUserDetailsService =
                customUserDetailsService;
    }

    @Override
    protected void doFilterInternal(

            @NonNull HttpServletRequest request,

            @NonNull HttpServletResponse response,

            @NonNull FilterChain filterChain

    ) throws ServletException, IOException {

        System.out.println("JWT FILTER RUNNING");

        String path =
                request.getServletPath();

        // Skip JWT filter for public endpoints
        if (

                path.equals("/auth/login") ||

                path.equals("/auth/register") ||

                path.equals("/") ||

                path.startsWith("/swagger-ui") ||

                path.startsWith("/v3/api-docs")

        ) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }

        String authHeader =
                request.getHeader("Authorization");

        if (

                authHeader == null ||

                !authHeader.startsWith("Bearer ")

        ) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }

        String token =
                authHeader.substring(7);

        String email =
                jwtUtil.extractEmail(token);

        UserDetails userDetails =

                customUserDetailsService
                        .loadUserByUsername(email);

        UsernamePasswordAuthenticationToken authToken =

                new UsernamePasswordAuthenticationToken(

                        userDetails,

                        null,

                        userDetails.getAuthorities()
                );

        authToken.setDetails(

                new WebAuthenticationDetailsSource()

                        .buildDetails(request)
        );

        SecurityContextHolder

                .getContext()

                .setAuthentication(authToken);

        filterChain.doFilter(

                request,

                response
        );
    }
}