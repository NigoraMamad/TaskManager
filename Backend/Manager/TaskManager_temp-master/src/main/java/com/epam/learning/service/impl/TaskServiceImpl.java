package com.epam.learning.service.impl;

import com.epam.learning.dto.TaskDto;
import com.epam.learning.entity.TaskEntity;
import com.epam.learning.exeption.InvalidValidationException;
import com.epam.learning.exeption.TaskNotFoundException;
import com.epam.learning.mapper.TaskMapper;
import com.epam.learning.repository.TaskRepository;
import com.epam.learning.service.TaskService;
import com.epam.learning.utils.SecurityUtils;
import com.epam.learning.utils.DateTimeUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    @Override
    public TaskDto createTask(TaskDto taskDto) {
        try {
            Integer currentUserId = SecurityUtils.getCurrentUserId();

            // Validate due date
            LocalDateTime dueDate = DateTimeUtils.convertTimestampToDate(taskDto.getDueDate());
            if (dueDate.isBefore(LocalDateTime.now())) {
                throw new InvalidValidationException("Due date must be in the future");
            }

            taskDto.setUserId(currentUserId);
            TaskEntity taskEntity = taskMapper.dtoToEntity(taskDto);
            TaskEntity savedTask = taskRepository.save(taskEntity);

            log.info("Task created successfully with ID: {} for user: {}", savedTask.getId(), currentUserId);
            return taskMapper.entityToDto(savedTask);
        } catch (InvalidValidationException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error creating task: {}", e.getMessage());
            throw new RuntimeException("Something went wrong! Please try again later.");
        }
    }

    @Override
    public TaskDto updateTask(Integer id, TaskDto taskDto) {
        try {
            Integer currentUserId = SecurityUtils.getCurrentUserId();

            TaskEntity existingTask = taskRepository.findByIdAndUserIdAndNotDeleted(id, currentUserId)
                    .orElseThrow(() -> new TaskNotFoundException(id));

            // Convert and validate due date
            LocalDateTime dueDate = DateTimeUtils.convertTimestampToDate(taskDto.getDueDate());
            if (dueDate.isBefore(LocalDateTime.now())) {
                throw new InvalidValidationException("Due date must be in the future");
            }

            // Update task fields
            existingTask.setTitle(taskDto.getTitle());
            existingTask.setContent(taskDto.getContent());
            if (taskDto.getStatus() != null) {
                existingTask.setStatus(taskDto.getStatus());
            }
            if (taskDto.getPriority() != null) {
                existingTask.setPriority(taskDto.getPriority());
            }
            existingTask.setDueDate(dueDate);

            TaskEntity updatedTask = taskRepository.save(existingTask);

            log.info("Task updated successfully with ID: {} for user: {}", id, currentUserId);
            return taskMapper.entityToDto(updatedTask);
        } catch (TaskNotFoundException | InvalidValidationException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error updating task: {}", e.getMessage());
            throw new RuntimeException("Something went wrong! Please try again later.");
        }
    }

    @Override
    public String deleteTask(Integer id) {
        try {
            Integer currentUserId = SecurityUtils.getCurrentUserId();

            TaskEntity task = taskRepository.findByIdAndUserIdAndNotDeleted(id, currentUserId)
                    .orElseThrow(() -> new TaskNotFoundException(id));

            task.setDeleted(true);
            task.setDeleteDate(LocalDateTime.now());
            taskRepository.save(task);

            log.info("Task deleted successfully with ID: {} for user: {}", id, currentUserId);
            return "Task was deleted successfully";
        } catch (TaskNotFoundException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error deleting task: {}", e.getMessage());
            throw new RuntimeException("Something went wrong! Please try again later.");
        }
    }

    @Override
    public TaskDto getTask(Integer id) {
        try {
            Integer currentUserId = SecurityUtils.getCurrentUserId();

            TaskEntity task = taskRepository.findByIdAndUserIdAndNotDeleted(id, currentUserId)
                    .orElseThrow(() -> new TaskNotFoundException(id));

            return taskMapper.entityToDto(task);
        } catch (TaskNotFoundException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error retrieving task: {}", e.getMessage());
            throw new RuntimeException("Something went wrong! Please try again later.");
        }
    }

    @Override
    public List<TaskDto> getAllTask() {
        try {
            Integer currentUserId = SecurityUtils.getCurrentUserId();

            List<TaskEntity> tasks = taskRepository.findAllByUserIdAndNotDeleted(currentUserId);

            return tasks.stream()
                    .map(taskMapper::entityToDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Error retrieving all tasks: {}", e.getMessage());
            throw new RuntimeException("Something went wrong! Please try again later.");
        }
    }
}
