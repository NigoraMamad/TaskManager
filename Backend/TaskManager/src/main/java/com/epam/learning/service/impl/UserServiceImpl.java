package com.epam.learning.service.impl;

import com.epam.learning.dto.SignUpDTO;
import com.epam.learning.dto.UserDetailsDTO;
import com.epam.learning.entitiy.User;
import com.epam.learning.entitiy.enums.RoleName;
import com.epam.learning.repository.UserRepository;
import com.epam.learning.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final RoleServiceImpl roleServiceImpl;

    @Override
    public User saveUserFromDto(SignUpDTO dto) {
        return userRepo.save(User.builder()
                .phoneNumber(dto.getPhoneNumber())
                .password(passwordEncoder.encode(dto.getPassword()))
                .roles(new ArrayList<>(List.of(roleServiceImpl.findByName(RoleName.ROLE_USER))))
                .build());
    }

    @Override
    public User save(User user) {
        return userRepo.save(user);
    }

    @Override
    public Optional<User> findByPhone(String phoneNumber) {
        return userRepo.findByPhoneNumber(phoneNumber);
    }

    @Override
    public HttpEntity<?> getUserDetails() {
        Optional<User> user = getUserFromContextHolder();
        if (user.isPresent()) {
            return ResponseEntity.ok(userRepo.findByIdProjection(user.get().getId()));
        }
        throw new RuntimeException("Sorry, user's session is expired!");
    }

    @Override
    public HttpEntity<?> updateUserDetails(UserDetailsDTO userDetailsDTO) {
        Optional<User> contextUser = getUserFromContextHolder();
        if (contextUser.isPresent()) {
            User user = contextUser.get();
            user.setPhoneNumber(userDetailsDTO.email());
            user.setFullName(userDetailsDTO.displayName());
            userRepo.save(user);
            return ResponseEntity.ok("User updated successfully");
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public Optional<User> getUserFromContextHolder() {
        String userPhone = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        return findByPhone(userPhone);
    }

    @Override
    public boolean existsByPhone(String phoneNumber) {
         return userRepo.findByPhoneNumber(phoneNumber).isPresent();
    }
}
