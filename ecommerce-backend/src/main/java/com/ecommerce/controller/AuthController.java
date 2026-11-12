package com.ecommerce.controller;

import com.ecommerce.dto.LoginRequest;
import com.ecommerce.dto.RegisterResponse;
import com.ecommerce.entity.User;
import com.ecommerce.service.JwtService;
import com.ecommerce.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController 
@RequestMapping("/api/auth")

public class AuthController {
    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(UserService userService,JwtService jwtService)
    {
      this.userService = userService;
      this.jwtService = jwtService;
    }

    @PostMapping("/register")

    public ResponseEntity<RegisterResponse> register(@RequestBody User user)
    {
      User registeredUser = userService.registerUser(user);

      RegisterResponse response = new RegisterResponse
      (registeredUser.getId(),
      registeredUser.getName(),
      registeredUser.getEmail(),
      registeredUser.getRole().name()
      );
      return ResponseEntity.ok(response);
    }

    @PostMapping("/login")

    public ResponseEntity<String> login(
      
      @RequestBody LoginRequest loginRequest)
{
       User user = userService.findByEmail(
                loginRequest.getEmail()
        );

      if(user == null)
      {
        return ResponseEntity
        .status(401)
        .body("Invalid Email or password");
       }

    
      boolean success = userService.loginUser(
        loginRequest.getEmail(),
        loginRequest.getPassword()
      );
      if(!success)
      {
        return ResponseEntity
        .status(401)
        .body("Invalid Email or Password");
      }
     String token = jwtService.generateToken(user);

     return ResponseEntity.ok(token);
    
  }
}