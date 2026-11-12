package com.ecommerce.service;
import com.ecommerce.entity.*;
import com.ecommerce.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service

public class UserService
{
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder)
  {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public User registerUser(User user)

  {
    user.setPassword(
      passwordEncoder.encode(user.getPassword())
    );
    user.setRole(Role.USER);
    return userRepository.save(user);
  }

  public boolean loginUser(String email , String password)
  {
    User user = userRepository.findByEmail(email).orElse(null);

    if(user == null)  
    {
      return false;
    }

    return passwordEncoder.matches(password,user.getPassword());
  }
  public User findByEmail(String email)
  {
    return userRepository.findByEmail(email).orElse(null);
  } 
}
