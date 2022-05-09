package com.douzone.hisystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HISystemApplication {
	public static void main(String[] args) {
		SpringApplication.run(HISystemApplication.class, args);
	}
}
