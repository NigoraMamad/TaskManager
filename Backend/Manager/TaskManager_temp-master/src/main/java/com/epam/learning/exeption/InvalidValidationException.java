package com.epam.learning.exeption;

public class InvalidValidationException extends RuntimeException {

    public InvalidValidationException(String message) {
        super(message);
    }
}
