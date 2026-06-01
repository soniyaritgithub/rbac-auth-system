package com.example.backend.dto;

public class UserResponseDTO {

    private String name;

    private String email;

    private String role;

    public UserResponseDTO(

            String name,

            String email,

            String role
    ) {

        this.name = name;

        this.email = email;

        this.role = role;
    }

    public String getName() {

        return name;
    }

    public String getEmail() {

        return email;
    }

    public String getRole() {

        return role;
    }
}