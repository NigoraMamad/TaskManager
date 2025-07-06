package com.epam.learning.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@Component
@Slf4j
public class ValidationUtils {

    private static final Pattern PHONE_PATTERN = Pattern.compile("^\\+?[1-9]\\d{1,14}$");
    private static final Pattern NAME_PATTERN = Pattern.compile("^[A-Za-z\\s\\-'\\.]+$");
    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$");

    public static boolean isValidPhoneNumber(String phoneNumber) {
        if (phoneNumber == null || phoneNumber.trim().isEmpty()) {
            return false;
        }
        return PHONE_PATTERN.matcher(phoneNumber.trim()).matches();
    }

    public static boolean isValidFullName(String fullName) {
        if (fullName == null || fullName.trim().isEmpty()) {
            return false;
        }

        String trimmedName = fullName.trim();

        // Check length (must be under 30 characters)
        if (trimmedName.length() > 30) {
            return false;
        }

        // Check for valid characters only
        return NAME_PATTERN.matcher(trimmedName).matches();
    }

    public static boolean isValidPassword(String password) {
        if (password == null || password.length() < 8) {
            return false;
        }

        // Check for at least one uppercase letter, one lowercase letter, and one digit
        // No spaces or special characters allowed
        return PASSWORD_PATTERN.matcher(password).matches();
    }

    public static String getPhoneNumberValidationError(String phoneNumber) {
        if (phoneNumber == null || phoneNumber.trim().isEmpty()) {
            return "Phone number is required";
        }
        if (!isValidPhoneNumber(phoneNumber)) {
            return "Enter phone number format should be (000) 000-00-00, and 10 digits.";
        }
        return null;
    }

    public static String getFullNameValidationError(String fullName) {
        if (fullName == null || fullName.trim().isEmpty()) {
            return "Full name is required";
        }
        if (!isValidFullName(fullName)) {
            return "Name must be under 30 characters and cannot include special symbols";
        }
        return null;
    }

    public static String getPasswordValidationError(String password) {
        if (password == null || password.trim().isEmpty()) {
            return "Password is required";
        }
        if (!isValidPassword(password)) {
            return "Password must be at least 8 characters and can include only letters and numbers.";
        }
        return null;
    }

    public static String getConfirmPasswordValidationError(String password, String confirmPassword) {
        if (confirmPassword == null || confirmPassword.trim().isEmpty()) {
            return "Confirm password is required";
        }
        if (!password.equals(confirmPassword)) {
            return "Confirm password must exactly match the created password.";
        }
        return null;
    }
}