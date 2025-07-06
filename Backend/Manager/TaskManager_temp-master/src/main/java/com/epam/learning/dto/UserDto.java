package com.epam.learning.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class UserDto {

    private Integer userId;

    @NotBlank(message = "Full name is required")
    @Size(max = 30, message = "Name must be under 30 characters and cannot include special symbols")
    @Pattern(regexp = "^[A-Za-z\\s\\-'\\.]+$", message = "Name must be under 30 characters and cannot include special symbols")
    private String fullName;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$", message = "Enter phone number format should be (000) 000-00-00, and 10 digits.")
    private String phoneNumber;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters and can include only letters and numbers.")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$",
            message = "Password must be at least 8 characters and can include only letters and numbers.")
    private String password;

    // This field is used for registration confirmation but not stored in database
    private String confirmPassword;

    // Method to validate password confirmation
    public boolean isPasswordConfirmed() {
        return password != null && password.equals(confirmPassword);
    }

}