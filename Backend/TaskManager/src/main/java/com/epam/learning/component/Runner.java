package com.epam.learning.component;

import com.epam.learning.entity.Role;
import com.epam.learning.entity.enums.RoleName;
import com.epam.learning.repository.RoleRepository;
import com.epam.learning.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class Runner implements CommandLineRunner {

    private final RoleRepository roleRepo;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepo;

    @Override
    public void run(String... args) {
        if (roleRepo.findAll().isEmpty()) {
            for (RoleName role : RoleName.values()) {
                roleRepo.save(Role.builder()
                        .roleName(role)
                        .build());
            }
        }
    }
}