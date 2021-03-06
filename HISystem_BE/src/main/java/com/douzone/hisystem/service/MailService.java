package com.douzone.hisystem.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.Data;

@Service
@Data
public class MailService {
	
	@Autowired
	private JavaMailSender javaMailSender;

	private String mail;
	private String title;
	private String contents;
	
	public void sendMail() {
		ArrayList<String> toUserList = new ArrayList<>();
		
		toUserList.add(this.mail);
		
		int toUserSize = toUserList.size();
		
		SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
		
		simpleMailMessage.setTo((String[]) toUserList.toArray(new String[toUserSize]));
		
		simpleMailMessage.setSubject(this.title);
		simpleMailMessage.setText(this.contents);
		
		javaMailSender.send(simpleMailMessage);
	}
}
