package com.epam.learning.mapper;

import com.epam.learning.dto.TaskDto;
import com.epam.learning.entitiy.TaskEntity;
import org.springframework.stereotype.Component;

@Component
public class TaskMapper {

    public TaskEntity dtoToEntity(TaskDto taskDto) {

        return new TaskEntity();
    }

    public TaskDto entityToDto(TaskEntity taskEntity) {

        return TaskDto.builder()
                .build();
    }
}
