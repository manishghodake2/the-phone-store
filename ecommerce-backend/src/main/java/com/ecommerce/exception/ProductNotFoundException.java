package com.ecommerce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


public class ProductNotFoundException extends RuntimeException
{
  public  ProductNotFoundException(String message)
  {
    super(message);
  }
}
