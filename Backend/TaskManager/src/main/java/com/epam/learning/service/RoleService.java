package com.epam.learning.service;

import com.epam.learning.entitiy.Role;
import com.epam.learning.entitiy.enums.RoleName;
import org.springframework.stereotype.Service;

@Service
public interface RoleService {

    Role findByName(RoleName name);

}
