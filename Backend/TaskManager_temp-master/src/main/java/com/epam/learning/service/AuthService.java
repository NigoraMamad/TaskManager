package com.epam.learning.service;

import com.epam.learning.dto.AuthResponseDto;
import com.epam.learning.dto.LoginDto;
import com.epam.learning.dto.UserDto;

public interface AuthService {

    AuthResponseDto register(UserDto userDto);

    AuthResponseDto login(LoginDto loginDto);
}
