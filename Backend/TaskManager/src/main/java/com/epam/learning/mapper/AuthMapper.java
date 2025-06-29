package com.epam.learning.mapper;

import com.epam.learning.dto.RegisterRequest;
import com.epam.learning.entitiy.User;
import org.mapstruct.Mapper;
@Mapper(componentModel = "spring")
public interface AuthMapper {
    User toEntity(RegisterRequest dto);
}