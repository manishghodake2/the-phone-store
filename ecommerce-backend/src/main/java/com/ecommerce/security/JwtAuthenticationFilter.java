package com.ecommerce.security;
import com.ecommerce.service.JwtService;

import jakarta.servlet.*;
import jakarta.servlet.http.*;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;



@Component 
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService)
    {
      this.jwtService = jwtService ;  
    }

    @Override 
    protected void doFilterInternal(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterchain
    )
    throws ServletException, IOException
    {
      String authHeader = request.getHeader("Authorization");

      if(authHeader ==  null || !authHeader.startsWith("Bearer "))
      {
        filterchain.doFilter(request, response);
        return; 
      }

      String token = authHeader.substring(7);

      if(!jwtService.isTokenValid(token))
      {
        filterchain.doFilter(request, response);
        return;
      }

      String email = jwtService.extractEmail(token);
      String role = jwtService.extractRole(token);
      System.out.println("JWT EMAIL: " + email);
      System.out.println("JWT ROLE: " + role);

      SimpleGrantedAuthority authority = 
      new SimpleGrantedAuthority("ROLE_"+ role);

      UsernamePasswordAuthenticationToken authentication = 
      new UsernamePasswordAuthenticationToken
      (email,null,List.of(authority));

      SecurityContextHolder.getContext().setAuthentication(authentication);

      filterchain.doFilter(request,response);
    }
}
