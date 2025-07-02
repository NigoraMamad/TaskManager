package com.epam.learning.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record TempAuthorizationDTO(@JsonProperty("temp_authorization") String tempAuthorization) {
}