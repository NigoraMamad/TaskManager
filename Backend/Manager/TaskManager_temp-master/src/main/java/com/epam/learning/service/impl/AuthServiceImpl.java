package com.epam.learning.service.impl;

import com.epam.learning.dto.AuthResponseDto;
import com.epam.learning.dto.LoginDto;
import com.epam.learning.dto.UserDto;
import com.epam.learning.entity.UserEntity;
import com.epam.learning.exeption.InvalidValidationException;
import com.epam.learning.exeption.UserNotFoundException;
import com.epam.learning.repository.UserRepository;
import com.epam.learning.service.AuthService;
import com.epam.learning.utils.JwtUtil;
import com.epam.learning.utils.PasswordUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Override
    public AuthResponseDto register(UserDto userDto) {
        try {
            // Validate if phone number already exists
            if (userRepository.existsByPhoneNumber(userDto.getPhoneNumber())) {
                throw new InvalidValidationException("Phone number is already registered");
            }

            // Hash password
            String hashedPassword = PasswordUtil.hashPassword(userDto.getPassword());

            // Create user entity
            UserEntity userEntity = UserEntity.builder()
                    .fullName(userDto.getFullName())
                    .phoneNumber(userDto.getPhoneNumber())
                    .passwordHash(hashedPassword)
                    .isActive(true)
                    .build();

            // Save user
            UserEntity savedUser = userRepository.save(userEntity);

            // Generate JWT token
            String token = jwtUtil.generateToken(savedUser.getUserId(), savedUser.getPhoneNumber());

            log.info("User registered successfully with ID: {}", savedUser.getUserId());

            return AuthResponseDto.builder()
                    .token(token)
                    .message("Registration successful")
                    .userId(savedUser.getUserId())
                    .fullName(savedUser.getFullName())
                    .build();

        } catch (InvalidValidationException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error during user registration: {}", e.getMessage());
            throw new RuntimeException("Something went wrong! Please try again later.");
        }
    }

    @Override
    public AuthResponseDto login(LoginDto loginDto) {
        try {
            // Find user by phone number
            UserEntity user = userRepository.findByPhoneNumber(loginDto.getPhoneNumber())
                    .orElseThrow(() -> new UserNotFoundException("Invalid credentials"));

            // Verify password
            if (!PasswordUtil.verifyPassword(loginDto.getPassword(), user.getPasswordHash())) {
                throw new UserNotFoundException("Invalid credentials");
            }

            // Check if user is active
            if (!user.getIsActive()) {
                throw new InvalidValidationException("Account is deactivated");
            }

            // Generate JWT token
            String token = jwtUtil.generateToken(user.getUserId(), user.getPhoneNumber());

            log.info("User logged in successfully: {}", user.getPhoneNumber());

            return AuthResponseDto.builder()
                    .token(token)
                    .message("Login successful")
                    .userId(user.getUserId())
                    .fullName(user.getFullName())
                    .build();

        } catch (UserNotFoundException | InvalidValidationException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error during user login: {}", e.getMessage());
            throw new RuntimeException("Something went wrong! Please try again later.");
        }
    }
}