package com.epam.learning.service;

import com.epam.learning.entity.Role;
import com.epam.learning.entity.enums.RoleName;
import org.springframework.stereotype.Service;

@Service
public interface RoleService {

    Role findByName(RoleName name);

}
