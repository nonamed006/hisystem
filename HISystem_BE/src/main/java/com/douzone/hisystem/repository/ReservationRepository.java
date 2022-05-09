package com.douzone.hisystem.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.hisystem.dto.ReservationDto;
import com.douzone.hisystem.vo.Reservation;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ReservationRepository {

	private final SqlSession sqlSession;
	
	// 환자 접수 현황 리스트 조회 / 검색
	public List<ReservationDto> findByRevdate(String status, String status2, Integer nowPage, String name){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put( "status", status );
		map.put( "status2", status2 );
		map.put( "nowPage", nowPage );
		map.put( "name", name );
		return sqlSession.selectList("reservation.findByRevdate", map);
	} 
	
	// 페이징 위한 총 데이터 카운트 - 접수
	public int getCount(String status, String status2, String name) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put( "status", status );
		map.put( "status2", status2 );
		map.put( "name", name );
		return sqlSession.selectOne("reservation.getCount", map);
	}
	
	// 환자 접수
	public boolean insertReservation(Reservation reservation) {
		int count = sqlSession.insert("reservation.insertReceipt", reservation);
		return count == 1;
	}
	
	// 환자 삭제
	public boolean deleteByNo(int no) {
		return sqlSession.delete("reservation.deleteByNo", no) == 1;
	}
	
	// 상태 대기에서 진료중으로 업데이트
	public boolean update(int no) {
		return sqlSession.update("reservation.update", no) == 1; 
	}
	
	// 상태 방문대기에서 진료대기로 업데이트
		public boolean update2(int no) {
			return sqlSession.update("reservation.update2", no) == 1; 
		}
	
	/* 예약 */
	// 예약 조회
	public List<ReservationDto> findReservation(String rev_date, String name, Integer nowPage){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("rev_date", rev_date);
		map.put("name", name);
		map.put("nowPage", nowPage);
		return sqlSession.selectList("reservation.findReservation", map);
	}
	
	// 페이징 위한 총 데이터 카운트 - 예약
		public int getCountRes(String name) {
			return sqlSession.selectOne("reservation.getCountRes", name);
		}
		
	// 예약 접수
	public boolean insertReservation2(Reservation reservation) {
		int count = sqlSession.insert("reservation.insertReservation", reservation);
		return count == 1;
	}
	
	// 상태 진료중 -> 진료완료
	public boolean update3(int no) {
		return sqlSession.update("reservation.update3", no) == 1; 
	}

}
