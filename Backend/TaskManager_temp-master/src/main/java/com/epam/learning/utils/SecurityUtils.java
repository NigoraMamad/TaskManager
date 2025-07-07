// Fixed SecurityUtils.java
package com.epam.learning.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public class SecurityUtils {

    public static Integer getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }

        // Check if it's an anonymous user
        if (authentication.getName().equals("anonymousUser")) {
            throw new RuntimeException("User not authenticated");
        }

        // Get userId from authentication details
        if (authentication instanceof UsernamePasswordAuthenticationToken) {
            Object details = authentication.getDetails();
            if (details instanceof Integer) {
                return (Integer) details;
            }
        }

        throw new RuntimeException("Unable to get current user ID");
    }

    public static String getCurrentUserPhoneNumber() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }

        if (authentication.getName().equals("anonymousUser")) {
            throw new RuntimeException("User not authenticated");
        }

        return authentication.getName();
    }

    public static boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null &&
                authentication.isAuthenticated() &&
                !authentication.getName().equals("anonymousUser");
    }
}