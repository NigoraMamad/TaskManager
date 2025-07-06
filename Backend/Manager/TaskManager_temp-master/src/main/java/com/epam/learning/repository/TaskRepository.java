package com.epam.learning.repository;

import com.epam.learning.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, Integer> {

    @Query("SELECT t FROM TaskEntity t WHERE t.userId = :userId AND t.isDeleted = false")
    List<TaskEntity> findAllByUserIdAndNotDeleted(@Param("userId") Integer userId);

    @Query("SELECT t FROM TaskEntity t WHERE t.id = :id AND t.userId = :userId AND t.isDeleted = false")
    Optional<TaskEntity> findByIdAndUserIdAndNotDeleted(@Param("id") Integer id, @Param("userId") Integer userId);

    @Query("SELECT t FROM TaskEntity t WHERE t.isDeleted = false")
    List<TaskEntity> findAllNotDeleted();
}