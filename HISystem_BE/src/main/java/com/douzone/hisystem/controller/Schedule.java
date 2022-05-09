package com.douzone.hisystem.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.douzone.hisystem.dto.AlarmDto;
import com.douzone.hisystem.repository.TodoRepository;
import com.douzone.hisystem.vo.ToDoList;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Schedule {
	
	private final TodoRepository todoRepository;
	private final SimpMessagingTemplate template;
	
	@Scheduled(cron = "1 * * * * *")
	public void testSchedule() {	
		List<ToDoList> todolist = todoRepository.findSchedule();
		
		System.out.println("---------드렁옴");
		System.out.println(todolist);
		
		for(int i=0; i<todolist.size(); i++) {
			AlarmDto alarm = new AlarmDto();
			alarm.setUserNo(todolist.get(i).getUser_no());
			alarm.setMessage(todolist.get(i).getContents());
			alarm.setType(3);
			template.convertAndSend("/sub/chat/room/alarm", alarm);
		}
		
	}

}
