package com.example.servicea;

import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/a")
@CrossOrigin(origins = "*")
public class HelloController {

  @GetMapping("/hello")
  public Map<String, String> hello() {
    return Map.of("message", "Hello from Service A");
  }
}
