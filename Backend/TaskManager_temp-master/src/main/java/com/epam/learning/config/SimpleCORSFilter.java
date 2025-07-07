package com.epam.learning.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
@Slf4j
public class SimpleCORSFilter implements Filter {

  private static final List<String> ALLOWED_ORIGINS = Arrays.asList(
          "http://localhost:4200",
          "http://localhost:3000"
  );

  @Override
  public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
          throws IOException, ServletException {

    HttpServletRequest request = (HttpServletRequest) req;
    HttpServletResponse response = (HttpServletResponse) res;
    String origin = request.getHeader("Origin");

    log.info("CORS Filter - Method: {}, URI: {}, Origin: {}",
            request.getMethod(), request.getRequestURI(), origin);

    // Always set CORS headers for allowed origins
    if (origin != null && ALLOWED_ORIGINS.contains(origin)) {
      response.setHeader("Access-Control-Allow-Origin", origin);
      response.setHeader("Access-Control-Allow-Credentials", "true");
      response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      response.setHeader("Access-Control-Allow-Headers",
              "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma");
      response.setHeader("Access-Control-Max-Age", "3600");

      log.info("CORS headers set for origin: {}", origin);
    } else {
      log.warn("Origin not allowed or missing: {}", origin);
    }

    // Handle preflight OPTIONS request
    if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
      log.info("Handling OPTIONS preflight request");
      response.setStatus(HttpServletResponse.SC_OK);
      response.getWriter().flush();
      return; // Don't continue the filter chain for OPTIONS
    }

    chain.doFilter(req, res);
  }

  @Override
  public void init(FilterConfig filterConfig) throws ServletException {
    log.info("SimpleCORSFilter initialized");
  }

  @Override
  public void destroy() {
    log.info("SimpleCORSFilter destroyed");
  }
}