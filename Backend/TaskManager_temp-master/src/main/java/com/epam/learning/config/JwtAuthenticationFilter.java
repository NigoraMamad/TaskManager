// Fixed JwtAuthenticationFilter.java
package com.epam.learning.config;

import com.epam.learning.utils.JwtUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
@AllArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = getJwtFromRequest(request);
            log.info("Processing request: {} {}", request.getMethod(), request.getRequestURI());
            log.info("Authorization header: {}", request.getHeader("Authorization"));
            log.info("Extracted JWT: {}", jwt != null ? "Present (length: " + jwt.length() + ")" : "Missing");

            if (StringUtils.hasText(jwt)) {
                log.info("Validating JWT token...");

                if (jwtUtil.validateToken(jwt)) {
                    if (!jwtUtil.isTokenExpired(jwt)) {
                        Integer userId = jwtUtil.getUserIdFromToken(jwt);
                        String phoneNumber = jwtUtil.getPhoneNumberFromToken(jwt);

                        log.info("JWT validation successful for user: {} (ID: {})", phoneNumber, userId);

                        // Create authorities - USER role is required for authenticated users
                        List<SimpleGrantedAuthority> authorities = Arrays.asList(
                                new SimpleGrantedAuthority("ROLE_USER")
                        );

                        // Create authentication token with proper authorities
                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(phoneNumber, null, authorities);

                        // Store userId in details for later retrieval
                        authentication.setDetails(userId);

                        // Set authentication in security context
                        SecurityContextHolder.getContext().setAuthentication(authentication);

                        log.info("Security context set successfully for user: {}", phoneNumber);
                    } else {
                        log.warn("JWT token is expired for request: {} {}",
                                request.getMethod(), request.getRequestURI());
                        SecurityContextHolder.clearContext();
                    }
                } else {
                    log.warn("JWT validation failed for request: {} {}",
                            request.getMethod(), request.getRequestURI());
                    SecurityContextHolder.clearContext();
                }
            } else {
                log.info("No JWT token found for request: {} {}", request.getMethod(), request.getRequestURI());
                SecurityContextHolder.clearContext();
            }
        } catch (Exception e) {
            log.error("JWT Authentication failed for request: {} {}, error: {}",
                    request.getMethod(), request.getRequestURI(), e.getMessage(), e);
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        log.info("Raw Authorization header: {}", header);

        if (StringUtils.hasText(header)) {
            if (header.startsWith("Bearer ")) {
                String token = header.substring(7);
                log.info("Extracted Bearer token (length: {})", token.length());
                return token;
            } else if (header.length() > 100) { // crude check: raw JWT typically > 100 characters
                log.warn("No 'Bearer' prefix, assuming raw token provided.");
                return header;
            } else {
                log.warn("Authorization header does not start with 'Bearer ' and is not a valid raw JWT.");
            }
        } else {
            log.info("No Authorization header found");
        }
        return null;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.startsWith("/auth/") ||
                path.startsWith("/error") ||
                path.startsWith("/swagger-") ||
                path.startsWith("/v2/api-docs") ||
                path.startsWith("/webjars/");
    }
}