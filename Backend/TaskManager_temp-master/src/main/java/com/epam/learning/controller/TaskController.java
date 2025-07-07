package com.epam.learning.controller;

import com.epam.learning.dto.TaskDto;
import com.epam.learning.service.TaskService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/task")
@Api(tags = "Task Endpoints")
@Slf4j
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation("Create Task")
    public ResponseEntity<TaskDto> createTask(@Valid @RequestBody TaskDto taskDto) {
        try {
            taskDto.setId(null); // Ensure ID is null for creation
            TaskDto createdTask = taskService.createTask(taskDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
        } catch (Exception e) {
            log.error("Error creating task: {}", e.getMessage());
            throw e;
        }
    }

    @PutMapping("/{id}")
    @ApiOperation("Update Task by id")
    public ResponseEntity<TaskDto> updateTask(@PathVariable Integer id, @Valid @RequestBody TaskDto taskDto) {
        try {
            taskDto.setId(id);
            TaskDto updatedTask = taskService.updateTask(id, taskDto);
            return ResponseEntity.ok(updatedTask);
        } catch (Exception e) {
            log.error("Error updating task with ID {}: {}", id, e.getMessage());
            throw e;
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation("Delete Task by id")
    public ResponseEntity<String> deleteTask(@PathVariable Integer id) {
        try {
            String result = taskService.deleteTask(id);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Error deleting task with ID {}: {}", id, e.getMessage());
            throw e;
        }
    }

    @GetMapping("/{id}")
    @ApiOperation("Get Task by id")
    public ResponseEntity<TaskDto> getTask(@PathVariable Integer id) {
        try {
            TaskDto task = taskService.getTask(id);
            return ResponseEntity.ok(task);
        } catch (Exception e) {
            log.error("Error retrieving task with ID {}: {}", id, e.getMessage());
            throw e;
        }
    }

    @GetMapping
    @ApiOperation("Get list of all Tasks")
    public ResponseEntity<List<TaskDto>> getAllTask() {
        try {
            List<TaskDto> tasks = taskService.getAllTask();
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            log.error("Error retrieving all tasks: {}", e.getMessage());
            throw e;
        }
    }
}