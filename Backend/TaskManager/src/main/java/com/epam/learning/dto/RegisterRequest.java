package com.epam.learning.dto;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class RegisterRequest {
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}