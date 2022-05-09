package com.douzone.hisystem.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.hisystem.vo.Patient;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class PatientRepository {
	private final SqlSession sqlSession;
	
	/* 	환자 조회
		페이징, 검색 정보 포함
	*/
	public List<Patient> findAll(Map<String, Object> map) {
		return sqlSession.selectList("patient.findAll", map);
	}
	
	public List<Patient> findAllPatient() {
		return sqlSession.selectList("patient.findAllPatient");
	}
	
	/*	환자 수 조회
		검색어에 해당하는 환자
	*/	
	public int getCount() {
		return sqlSession.selectOne("patient.getCount");
	}
	
	// 환자 등록	
	public boolean insertPatient(Patient patient) {
		int count = sqlSession.insert("patient.insertPatient", patient);
		return count == 1;
	}

	/* 	환자 삭제
		삭제는 등록을 잘못 했을 경우에만 가능하다
		접수기록이 존재하는 경우 삭제가 불가능하다
	*/
	public boolean deleteById(int id) {
		if(sqlSession.delete("patient.deleteById", id) == 1) {
			return true;
		}else {
			return false;
		}
	}

	public Patient findPatientById(int id) {
		return sqlSession.selectOne("patient.findPatientById", id);
	}
	
	public boolean updateVisDate(int id) {
		return sqlSession.update("patient.updateVisDate", id) == 1;
	}
}
