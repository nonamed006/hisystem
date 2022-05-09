package com.douzone.hisystem.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.hisystem.service.MailService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MailController {

	private final MailService mailService;
	
	@GetMapping("/mail")
	public String findAll() {
		
		System.out.println("###");
		mailService.setMail("lhyoundev@gmail.com");
		mailService.setTitle("이하윤님 예약 확인 메일");
		mailService.setContents("이하윤님 12월 18일 5시 예약되었습니다");
		mailService.sendMail();
		System.out.println("###");
		return "ok";
	}
}
