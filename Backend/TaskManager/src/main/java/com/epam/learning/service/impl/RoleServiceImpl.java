package com.epam.learning.service.impl;

import com.epam.learning.entitiy.Role;
import com.epam.learning.entitiy.enums.RoleName;
import com.epam.learning.repository.RoleRepository;
import com.epam.learning.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepo;

    @Override
    public Role findByName(RoleName roleName) {
        return roleRepo.findByRoleName(roleName);
    }
}
