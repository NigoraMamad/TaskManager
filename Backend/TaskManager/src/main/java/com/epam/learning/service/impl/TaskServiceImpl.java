package com.epam.learning.service.impl;

import com.epam.learning.dto.TaskDto;
import com.epam.learning.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    @Override
    public TaskDto createTask(TaskDto taskDto) {

        return taskDto;
    }

    @Override
    public TaskDto updateTask(Integer id, TaskDto taskDto) {

        return taskDto;
    }

    @Override
    public String deleteTask(Integer id) {

        return "Task was deleted successfully";
    }

    @Override
    public TaskDto getTask(Integer id) {

        return new TaskDto();
    }

    @Override
    public List<TaskDto> getAllTask() {

        return List.of();
    }
}
