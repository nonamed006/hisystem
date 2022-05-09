package com.douzone.hisystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.douzone.hisystem.repository.TodoRepository;
import com.douzone.hisystem.vo.ToDoList;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoService {
	
	private final TodoRepository todoRepository;
	
	// 할일 조회
	public List<ToDoList> findByNo(int user_no){
		
		return todoRepository.findByNo(user_no);
	}
	// 할일 등록
	public boolean insertTodo(ToDoList todolist) {
		return todoRepository.insertTodo(todolist);
	}
	
	// 할일 삭제
	public boolean deleteByNo(int no) {
		return todoRepository.deleteByNo(no);
	}
	// 상태 업데이트
	public boolean update(int no) {
		return todoRepository.update(no);
	}
}
