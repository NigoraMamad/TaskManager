package com.epam.learning.mapper;

import com.epam.learning.dto.TaskDto;
import com.epam.learning.entity.TaskEntity;
import com.epam.learning.utils.DateTimeUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class TaskMapper {

    public TaskEntity dtoToEntity(TaskDto taskDto) {
        return TaskEntity.builder()
                .id(taskDto.getId())
                .userId(taskDto.getUserId())
                .title(taskDto.getTitle())
                .content(taskDto.getContent())
                .status(taskDto.getStatus() != null ? taskDto.getStatus() : com.epam.learning.enums.Status.TODO)
                .priority(taskDto.getPriority() != null ? taskDto.getPriority() : com.epam.learning.enums.Priority.MEDIUM)
                .dueDate(DateTimeUtils.convertTimestampToDate(taskDto.getDueDate()))
                .createDate(taskDto.getCreatedDate() != null ?
                        DateTimeUtils.convertTimestampToDate(taskDto.getCreatedDate()) : null)
                .isDeleted(false)
                .build();
    }

    public TaskDto entityToDto(TaskEntity taskEntity) {
        return TaskDto.builder()
                .id(taskEntity.getId())
                .userId(taskEntity.getUserId())
                .title(taskEntity.getTitle())
                .content(taskEntity.getContent())
                .status(taskEntity.getStatus())
                .priority(taskEntity.getPriority())
                .dueDate(DateTimeUtils.convertDateToTimestamp(taskEntity.getDueDate()))
                .createdDate(DateTimeUtils.convertDateToTimestamp(taskEntity.getCreateDate()))
                .build();
    }
}
