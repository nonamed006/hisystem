package com.douzone.hisystem.repository;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.hisystem.dto.DutyTodayDto;
import com.douzone.hisystem.vo.Duty;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class DutyRepository {

	private final SqlSession sqlSession;


	/*
	 * 듀티리스트 불러오기 
	 */
	public List<Duty> findDutyList() {

		return sqlSession.selectList("duty.findDutyList");
	}


	public void insert(Duty duty) {
		
		sqlSession.insert("duty.insert",duty);
	}


	public void update(Duty duty) {
		sqlSession.update("duty.update",duty);

	}


	public void delete(Duty duty) {
		sqlSession.delete("duty.delete",duty);
		
	}
//	public void insert(List<Duty> dutyList) {
//		HashMap<String, Object> map = new HashMap<String,Object>();
//		map.put("dutyList", dutyList);
//		sqlSession.insert("duty.insert",map);
//	}
	
	public List<DutyTodayDto> today() {
		return sqlSession.selectList("duty.today");
	}

}
