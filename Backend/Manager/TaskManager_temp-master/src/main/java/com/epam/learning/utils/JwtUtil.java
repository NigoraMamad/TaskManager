package com.epam.learning.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
@Slf4j
public class JwtUtil {

    // Use a longer, more secure secret key (at least 64 characters for HS512)
    @Value("${jwt.secret:mySecretKeyForTaskManagerApplicationThatIsVeryLongAndSecureEnoughForHS512AlgorithmToWorkProperly}")
    private String jwtSecret;

    @Value("${jwt.expiration:86400000}") // 24 hours in milliseconds
    private long jwtExpirationInMs;

    private SecretKey getSigningKey() {
        // Ensure the key is at least 64 bytes for HS512
        if (jwtSecret.getBytes().length < 64) {
            log.warn("JWT secret is too short, generating a secure key");
            return Keys.secretKeyFor(SignatureAlgorithm.HS512);
        }
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String generateToken(Integer userId, String phoneNumber) {
        try {
            Date expiryDate = new Date(System.currentTimeMillis() + jwtExpirationInMs);

            String token = Jwts.builder()
                    .setSubject(phoneNumber)
                    .claim("userId", userId)
                    .setIssuedAt(new Date())
                    .setExpiration(expiryDate)
                    .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                    .compact();

            log.debug("JWT token generated successfully for user: {}", phoneNumber);
            return token;
        } catch (Exception e) {
            log.error("Error generating JWT token for user: {}, error: {}", phoneNumber, e.getMessage());
            throw new RuntimeException("Failed to generate JWT token", e);
        }
    }

    public String getPhoneNumberFromToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.getSubject();
        } catch (JwtException e) {
            log.error("Error extracting phone number from token: {}", e.getMessage());
            throw new RuntimeException("Invalid JWT token", e);
        }
    }

    public Integer getUserIdFromToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.get("userId", Integer.class);
        } catch (JwtException e) {
            log.error("Error extracting user ID from token: {}", e.getMessage());
            throw new RuntimeException("Invalid JWT token", e);
        }
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token format: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
        } catch (Exception e) {
            log.error("JWT validation error: {}", e.getMessage());
        }
        return false;
    }

    public boolean isTokenExpired(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            boolean expired = claims.getExpiration().before(new Date());
            if (expired) {
                log.debug("JWT token is expired");
            }
            return expired;
        } catch (ExpiredJwtException e) {
            log.debug("JWT token is expired: {}", e.getMessage());
            return true;
        } catch (JwtException e) {
            log.error("Error checking token expiration: {}", e.getMessage());
            return true;
        }
    }
}