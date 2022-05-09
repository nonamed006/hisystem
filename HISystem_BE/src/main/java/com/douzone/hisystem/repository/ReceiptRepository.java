package com.douzone.hisystem.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.hisystem.dto.ReceiptDto;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ReceiptRepository {
	
	private final SqlSession sqlSession;
	
	// 수납 현황 조회 - 날짜, 검색
	public List<ReceiptDto> findByDate(String dia_date, int rec_status, String name, int nowPage){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("dia_date", dia_date);
		map.put("rec_status", rec_status);
		map.put("pat_name", name);
		map.put("nowPage", nowPage);
		
		return sqlSession.selectList("receipt.findByDate", map);
	}
	
	// 페이징 위한 총 데이터 카운트 
	public int getCount(int status, String name, String dia_date) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put( "status", status );
		map.put( "name", name );
		map.put( "dia_date", dia_date );
		return sqlSession.selectOne("receipt.getCount", map);
	}
		
	//수납 상태 완료로 상태 변경
	public boolean update(int no) {
		return sqlSession.update("receipt.update", no) == 1; 
	}
	
	// 수납 데이터 추가
	public boolean insert(Map<String, Object> map) {
		return sqlSession.update("receipt.insert", map) == 1; 
	}
}
