package com.epam.learning.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@Component
@Slf4j
public class ValidationUtils {

    // Updated pattern for (000) 000-00-00 format
    private static final Pattern PHONE_PATTERN = Pattern.compile("^\\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$");
    private static final Pattern NAME_PATTERN = Pattern.compile("^[A-Za-z\\s\\-'\\.]+$");
    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$");

    public static boolean isValidPhoneNumber(String phoneNumber) {
        if (phoneNumber == null || phoneNumber.trim().isEmpty()) {
            return false;
        }
        String trimmedPhone = phoneNumber.trim();

        // Check if already in correct format
        if (PHONE_PATTERN.matcher(trimmedPhone).matches()) {
            return true;
        }

        // Check if it's 10 digits and can be formatted
        if (trimmedPhone.matches("^\\d{10}$")) {
            return true;
        }

        return false;
    }

    public static String formatPhoneNumber(String phoneNumber) {
        if (phoneNumber == null || phoneNumber.trim().isEmpty()) {
            return phoneNumber;
        }

        String trimmedPhone = phoneNumber.trim();

        // If already formatted, return as is
        if (PHONE_PATTERN.matcher(trimmedPhone).matches()) {
            return trimmedPhone;
        }

        // If it's 10 digits, format it
        if (trimmedPhone.matches("^\\d{10}$")) {
            return String.format("(%s) %s-%s-%s",
                    trimmedPhone.substring(0, 3),
                    trimmedPhone.substring(3, 6),
                    trimmedPhone.substring(6, 8),
                    trimmedPhone.substring(8, 10));
        }

        return phoneNumber;
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