package com.epam.learning.service;

import com.epam.learning.dto.LoginDTO;
import com.epam.learning.dto.SignUpDTO;
import com.epam.learning.entitiy.User;
import com.epam.learning.dto.TempAuthorizationDTO;
import com.epam.learning.dto.TokenDTO;
import com.epam.learning.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class JwtService {

    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;


    public ResponseEntity<?> giveAccountDetailsToken(SignUpDTO signUpDto) {
        if (userService.existsByPhone(signUpDto.getPhoneNumber())) {
            throw new RuntimeException("User already exists!");
        }
        String token = jwtUtil.genVerificationCodeToken(signUpDto);
        return ResponseEntity.ok(new TempAuthorizationDTO(token));
    }

    public ResponseEntity<?> signUpVerifyCode(String verificationCode, String tempAuthorization) {
        if (!tempAuthorization.startsWith("Confirmation")) {
            throw new RuntimeException("Token is damaged. Please, try again");
        }
        String token = tempAuthorization.substring(13);
        if (!jwtUtil.checkVerificationCodeFromDto(verificationCode, token)) {
            throw new RuntimeException("Entered code is wrong! Please, try again!");
        }

        User user = userService.saveUserFromDto(jwtUtil.getDtoFromToken(token));
        return ResponseEntity.ok(new TokenDTO(jwtUtil.genToken(user), jwtUtil.genRefreshToken(user)));
    }

    public ResponseEntity<?> resendSignUpVerificationCode(String tempAuthorization) {
        if (!tempAuthorization.startsWith("Confirmation")) {
            throw new RuntimeException("Token is damaged. Please, try again!");
        }
        SignUpDTO dto = jwtUtil.getDtoFromToken(tempAuthorization.substring(13));
        String token = jwtUtil.genVerificationCodeToken(dto);
        return ResponseEntity.ok(new TempAuthorizationDTO(token));
    }

    public ResponseEntity<?> checkLoginDetails(LoginDTO loginDto) {
        try {
            var auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.phoneNumber(), loginDto.password()));
            return ResponseEntity.ok(new TokenDTO(
                    jwtUtil.genToken((UserDetails) auth.getPrincipal()),
                    jwtUtil.genRefreshToken((UserDetails) auth.getPrincipal())));
        } catch (AuthenticationException e) {
            throw new RuntimeException("Email or password is incorrect. Please try again!");
        }
    }

    public ResponseEntity<?> sendAccessCode(String email) {
        var user = userService.findByPhone(email);
        if (user.isEmpty()) {
            throw new RuntimeException("User doesn't exist. Please try again!");
        }
        String token = jwtUtil.generateCodeToken(email);
        return ResponseEntity.ok(new TempAuthorizationDTO(token));
    }

    public ResponseEntity<?> checkVerificationCode(String verificationCode, String tempAuthorization) {
        if (tempAuthorization != null && tempAuthorization.startsWith("Confirmation")) {
            String token = tempAuthorization.substring(13);
            if (jwtUtil.checkVerification(verificationCode, token)) {
                Optional<User> user = userService.findByPhone(
                        jwtUtil.getUsername(token));
                return ResponseEntity.ok(new TokenDTO(
                        jwtUtil.genToken(user.get()),
                        jwtUtil.genRefreshToken(user.get())
                ));
            }
        }
        throw new RuntimeException("Entered code is wrong! Please, try again!");
    }

}
