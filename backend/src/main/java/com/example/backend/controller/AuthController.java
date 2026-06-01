package com.example.backend.controller;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dto.AuthResponseDTO;
import com.example.backend.dto.LoginRequestDTO;
import com.example.backend.dto.RegisterRequestDTO;
import com.example.backend.dto.UserResponseDTO;
import com.example.backend.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(
            AuthService authService
    ) {

        this.authService =
                authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(

            @RequestBody RegisterRequestDTO request

    ) {

        authService.register(
                request
        );

        return ResponseEntity.ok(

                "User registered successfully"
        );
    }

    @PostMapping("/login")
    public AuthResponseDTO login(

            @RequestBody LoginRequestDTO request

    ) {

        return authService.login(
                request
        );
    }

    @GetMapping("/me")
    public UserResponseDTO currentUser(

            Principal principal

    ) {

        return authService.getCurrentUser(

                principal.getName()
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {

        return ResponseEntity.ok(
                "Logged out successfully"
        );
    }
}