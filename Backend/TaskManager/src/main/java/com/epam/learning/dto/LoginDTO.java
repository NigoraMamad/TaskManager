package com.epam.learning.dto;

import javax.validation.constraints.NotBlank;

public record LoginDTO(@NotBlank(message = "Email cannot be blank") String phoneNumber,
                       @NotBlank(message = "Password cannot be blank") String password) {
}