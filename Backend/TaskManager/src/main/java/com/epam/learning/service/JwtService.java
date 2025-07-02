package com.epam.learning.service;

import com.epam.learning.dto.LoginDTO;
import com.epam.learning.dto.SignUpDTO;
import com.epam.learning.dto.TokenDTO;
import com.epam.learning.entitiy.User;
import com.epam.learning.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<?> registerUser(SignUpDTO signUpDto) {
        if (userService.existsByPhone(signUpDto.getPhoneNumber())) {
            throw new RuntimeException("User with this phone number already exists!");
        }

        if(signUpDto.getConfirmPassword().equals(signUpDto.getPassword())) {
            User user = userService.saveUserFromDto(signUpDto);
            return ResponseEntity.ok(new TokenDTO(
                    jwtUtil.genToken(user),
                    jwtUtil.genRefreshToken(user)
            ));
        }else  {
            throw new RuntimeException("Confirm Password Mismatch! Try Again!");
        }


    }

    public ResponseEntity<?> authenticateUser(LoginDTO loginDto) {
        try {
            var authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.phoneNumber(),
                            loginDto.password()
                    )
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(new TokenDTO(
                    jwtUtil.genToken(userDetails),
                    jwtUtil.genRefreshToken(userDetails)
            ));
        } catch (AuthenticationException e) {
            throw new RuntimeException("Phone number or password is incorrect");
        }
    }
}