package com.example.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.AuthResponseDTO;
import com.example.backend.dto.LoginRequestDTO;
import com.example.backend.dto.RegisterRequestDTO;
import com.example.backend.dto.UserResponseDTO;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtUtil;

@Service
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil
    ) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public void register(
            RegisterRequestDTO request
    ) {

        if (userRepository.existsByEmail(
                request.getEmail()
        )) {

            throw new RuntimeException(
                    "Email already exists"
            );
        }

        User user = new User();

        user.setName(
                request.getName()
        );

        user.setEmail(
                request.getEmail()
        );

        user.setPassword(

                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        user.setRole(
                request.getRole()
        );

        userRepository.save(user);
    }

    public AuthResponseDTO login(
            LoginRequestDTO request
    ) {

        User user = userRepository

                .findByEmail(
                        request.getEmail()
                )

                .orElseThrow(() ->

                        new RuntimeException(
                                "Invalid email"
                        )
                );

        boolean passwordMatch =

                passwordEncoder.matches(

                        request.getPassword(),

                        user.getPassword()
                );

        if (!passwordMatch) {

            throw new RuntimeException(
                    "Invalid password"
            );
        }

        String token =

                jwtUtil.generateToken(
                        user.getEmail()
                );

        return new AuthResponseDTO(
                token
        );
    }

    public UserResponseDTO getCurrentUser(
            String email
    ) {

        User user = userRepository

                .findByEmail(email)

                .orElseThrow(() ->

                        new RuntimeException(
                                "User not found"
                        )
                );

        return new UserResponseDTO(

                user.getName(),

                user.getEmail(),

                user.getRole().name()
        );
    }
}