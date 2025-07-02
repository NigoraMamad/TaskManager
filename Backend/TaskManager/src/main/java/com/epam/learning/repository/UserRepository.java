package com.epam.learning.repository;

import com.epam.learning.entity.User;
import com.epam.learning.projection.UserDetailsProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByPhoneNumber(String phone);

    @Query(value = """
            SELECT u.id, u.full_name, u.phone_number FROM users u
            WHERE u.id = :id LIMIT 1
            """, nativeQuery = true)
    UserDetailsProjection findByIdProjection(Long id);

}