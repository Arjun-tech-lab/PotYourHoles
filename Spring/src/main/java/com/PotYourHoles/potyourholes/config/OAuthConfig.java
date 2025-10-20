package com.PotYourHoles.potyourholes.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class OAuthConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Allow certain endpoints publicly
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/api/**", "/oauth2/**", "/login/**").permitAll()
                        .anyRequest().authenticated()
                )
                // Enable Google OAuth login
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("http://localhost:5173", true) // redirect to frontend after login
                )
                // Enable logout
                .logout(logout -> logout
                        .logoutSuccessUrl("http://localhost:5173") // redirect after logout
                        .permitAll()
                )
                // Disable CSRF for simplicity (not recommended in prod without CSRF token)
                .csrf(csrf -> csrf.disable());

        return http.build();
    }

    // Allow frontend requests (CORS)
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173") // frontend URL
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowCredentials(true);
            }
        };
    }
}
