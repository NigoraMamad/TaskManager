package com.epam.learning.entity;

import com.epam.learning.enums.Priority;
import com.epam.learning.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tasks")
public class TaskEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "status")
    @Enumerated(EnumType.ORDINAL)
    private Status status;

    @Column(name = "priority")
    @Enumerated(EnumType.ORDINAL)
    private Priority priority;

    @Column(name = "created_datetime")
    private LocalDateTime createDate;

    @Column(name = "due_datetime")
    private LocalDateTime dueDate;

    @Column(name = "deleted_datetime")
    private LocalDateTime deleteDate;

    @Column(name = "is_deleted")
    private boolean isDeleted;
}
