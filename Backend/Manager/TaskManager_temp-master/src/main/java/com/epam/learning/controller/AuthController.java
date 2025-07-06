package com.epam.learning.controller;

import com.epam.learning.dto.AuthResponseDto;
import com.epam.learning.dto.LoginDto;
import com.epam.learning.dto.UserDto;
import com.epam.learning.exeption.InvalidValidationException;
import com.epam.learning.service.AuthService;
import com.epam.learning.utils.ValidationUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
@Api(tags = "Authentication Endpoints")
@Slf4j
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @ApiOperation("Register a new user")
    public ResponseEntity<AuthResponseDto> register(@RequestBody UserDto userDto,
                                                    BindingResult bindingResult) {
        try {
            log.info("Registration attempt for phone number: {}", userDto.getPhoneNumber());

            // Format phone number if needed BEFORE validation
            String formattedPhone = ValidationUtils.formatPhoneNumber(userDto.getPhoneNumber());
            userDto.setPhoneNumber(formattedPhone);

            // Manual validation instead of @Valid to control the order
            if (userDto.getFullName() == null || userDto.getFullName().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(AuthResponseDto.builder()
                                .message("Full name is required")
                                .build());
            }

            if (userDto.getPhoneNumber() == null || userDto.getPhoneNumber().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(AuthResponseDto.builder()
                                .message("Phone number is required")
                                .build());
            }

            if (userDto.getPassword() == null || userDto.getPassword().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(AuthResponseDto.builder()
                                .message("Password is required")
                                .build());
            }

            // Additional custom validation
            String nameError = ValidationUtils.getFullNameValidationError(userDto.getFullName());
            if (nameError != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(AuthResponseDto.builder()
                                .message(nameError)
                                .build());
            }

            String phoneError = ValidationUtils.getPhoneNumberValidationError(userDto.getPhoneNumber());
            if (phoneError != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(AuthResponseDto.builder()
                                .message(phoneError)
                                .build());
            }

            String passwordError = ValidationUtils.getPasswordValidationError(userDto.getPassword());
            if (passwordError != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(AuthResponseDto.builder()
                                .message(passwordError)
                                .build());
            }

            // Check password confirmation if provided
            if (userDto.getConfirmPassword() != null) {
                String confirmError = ValidationUtils.getConfirmPasswordValidationError(
                        userDto.getPassword(), userDto.getConfirmPassword());
                if (confirmError != null) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(AuthResponseDto.builder()
                                    .message(confirmError)
                                    .build());
                }
            }

            AuthResponseDto response = authService.register(userDto);
            log.info("User registered successfully with ID: {}", response.getUserId());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (InvalidValidationException e) {
            log.error("Validation error during registration for phone number: {}, error: {}",
                    userDto.getPhoneNumber(), e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(AuthResponseDto.builder()
                            .message(e.getMessage())
                            .build());
        } catch (Exception e) {
            log.error("Registration failed for phone number: {}, error: {}",
                    userDto.getPhoneNumber(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(AuthResponseDto.builder()
                            .message("Something went wrong! Please try again later.")
                            .build());
        }
    }

    @PostMapping("/login")
    @ApiOperation("User login")
    public ResponseEntity<AuthResponseDto> login(@Valid @RequestBody LoginDto loginDto,
                                                 BindingResult bindingResult) {
        try {
            log.info("Login attempt for phone number: {}", loginDto.getPhoneNumber());

            // Format phone number if needed
            String formattedPhone = ValidationUtils.formatPhoneNumber(loginDto.getPhoneNumber());
            loginDto.setPhoneNumber(formattedPhone);

            // Check for validation errors
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = new HashMap<>();
                for (FieldError error : bindingResult.getFieldErrors()) {
                    errors.put(error.getField(), error.getDefaultMessage());
                }
                log.warn("Validation errors during login: {}", errors);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(AuthResponseDto.builder()
                                .message("Invalid credentials")
                                .build());
            }

            AuthResponseDto response = authService.login(loginDto);
            log.info("User logged in successfully: {}", loginDto.getPhoneNumber());
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Login failed for phone number: {}, error: {}",
                    loginDto.getPhoneNumber(), e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(AuthResponseDto.builder()
                            .message("Invalid credentials")
                            .build());
        }
    }

}