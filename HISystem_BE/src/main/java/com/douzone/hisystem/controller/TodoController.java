package com.douzone.hisystem.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.hisystem.service.TodoService;
import com.douzone.hisystem.vo.ToDoList;
import com.douzone.hisystem.vo.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class TodoController {
	
	private final TodoService todoService;
	private final HttpSession session;
	
	@GetMapping("/user/todolist")
	public List<ToDoList> getTodoList(){
		User user = (User)session.getAttribute("principal");
		int user_no = user.getNo();
		System.out.println("###");
		System.out.println(user);

		System.out.println("asdaasddddd!!!!!!!!!!!!!!!!!!");
		System.out.println(todoService.findByNo(user_no));
		return todoService.findByNo(user_no);
	}
	
	// 할 일 등록
	@PostMapping("/user/todolist")
	public String insertTodo(@RequestBody ToDoList toDoList) {
		User user = (User)session.getAttribute("principal");
		int user_no = user.getNo();
		toDoList.setUser_no(user_no);

		if(todoService.insertTodo(toDoList)) {
			return "success";
		} else {
			return "fail";
		}
	}
	
	// 할 일 삭제
	@DeleteMapping("todolist/{no}")
	public String deleteReservation(@PathVariable int no){
		System.out.println("들어옴");
		
		if(todoService.deleteByNo(no)) {
			return "success";
		} else {
			return "fail";
		}
	}
	
	// 상태 업데이트
	@PutMapping("todolist/{no}")
	public String update(@PathVariable int no) {
		if(todoService.update(no)) {
			return "success";
		}else {
			return "fail";
		}
		}
}
