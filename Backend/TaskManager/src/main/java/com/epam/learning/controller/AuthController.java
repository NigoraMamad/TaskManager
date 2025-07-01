package com.epam.learning.controller;

import com.epam.learning.dto.LoginDTO;
import com.epam.learning.dto.SignUpDTO;
import com.epam.learning.dto.TokenDTO;
import com.epam.learning.exeption.ExceptionResponse;
import com.epam.learning.service.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Tag(name = "Authentication API", description = "For Sign Up and Login with phone number")
public class AuthController {

    private final JwtService jwtService;

    @Operation(summary = "Sign up API", description = "Register with phone number and password")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully registered",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = TokenDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input or phone number already exists",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionResponse.class)))
    })
    @PostMapping("/sign-up")
    public HttpEntity<?> signUp(@RequestBody @Valid SignUpDTO signUpDto) {
        return jwtService.registerUser(signUpDto);
    }

    @Operation(summary = "Login API", description = "Authenticate with phone number and password")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully authenticated",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = TokenDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid credentials",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExceptionResponse.class)))
    })
    @PostMapping("/login")
    public HttpEntity<?> login(@RequestBody @Valid LoginDTO loginDto) {
        return jwtService.authenticateUser(loginDto);
    }
}

record PhoneNumberDTO(
        @NotBlank(message = "Phone number cannot be blank")
        @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Phone number format is not valid")
        String phoneNumber) {
}