package com.douzone.hisystem.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.hisystem.vo.ToDoList;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class TodoRepository {
	private final SqlSession sqlSession;
	
	// 할일 조회
	public List<ToDoList> findByNo(int user_no){
		
		return sqlSession.selectList("todo.findByNo", user_no);
	}
	
	// 할일 등록
	public boolean insertTodo(ToDoList todolist) {
		
		return sqlSession.insert("todo.insertTodo", todolist) == 1;
	}
	
	//할일 삭제
	public boolean deleteByNo(int no) {
		return sqlSession.delete("todo.deleteByNo", no) == 1;
	}
	
	// 완료 상태 업데이트
	public boolean update(int no) {
		
		return sqlSession.update("todo.update", no) == 1;
	}
	
	// 스케줄러 관련
		public List<ToDoList> findSchedule(){
			
			return sqlSession.selectList("todo.findSchedule");
		}
}
