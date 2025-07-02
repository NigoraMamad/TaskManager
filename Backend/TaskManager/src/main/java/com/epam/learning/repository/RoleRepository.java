package com.epam.learning.repository;

import com.epam.learning.entity.Role;
import com.epam.learning.entity.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByRoleName(RoleName roleName);

}