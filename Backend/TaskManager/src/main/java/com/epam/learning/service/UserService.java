package com.epam.learning.service;

import com.epam.learning.dto.SignUpDTO;
import com.epam.learning.dto.UserDetailsDTO;
import com.epam.learning.entitiy.User;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
public interface UserService {

    User saveUserFromDto(SignUpDTO dtoFromToken);

    User save(User user);

    Optional<User> getUserFromContextHolder();

    Optional<User> findByPhone(String phoneNumber);

    HttpEntity<?> getUserDetails();

    HttpEntity<?> updateUserDetails(UserDetailsDTO userDetailsDTO);


    boolean existsByPhone(String phoneNumber);
}
