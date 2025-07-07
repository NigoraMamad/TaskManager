package com.epam.learning.dto;

import com.epam.learning.enums.Priority;
import com.epam.learning.enums.Status;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TaskDto {
    private Integer id;

    @NotBlank(message = "Title shouldn't be empty")
    private String title;

    @NotBlank(message = "Content shouldn't be empty")
    private String content;

    @NotNull(message = "Due date shouldn't be null")
    private Long dueDate;

    private Priority priority;

    private Status status;

    private Long createdDate;

    private Integer userId;
}