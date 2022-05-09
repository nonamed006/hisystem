package com.douzone.hisystem.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.hisystem.dto.DiagnosisDto;
import com.douzone.hisystem.vo.Diagnosis;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class DiagnosisRepository {
	private final SqlSession sqlSession;
	
	/* 	진료 기록 조회
	환자 이름으로(pk[no]) 조회
	 */
	public List<DiagnosisDto> findByNo(int no) {
		return sqlSession.selectList("diagnosis.findByNo", no);
	}
	
	// 약 처방 질병 조회
	public List<DiagnosisDto> findDiaInfo(int no) {
		if(no == 1) return sqlSession.selectList("diagnosis.findDiaInfo");
		else if(no == 2) return sqlSession.selectList("diagnosis.findDiaInfo2");
		else return sqlSession.selectList("diagnosis.findDiaInfo3");
	}

	public boolean insert(Diagnosis diagnosis) {
		System.out.println("reppppp" + diagnosis);
		return sqlSession.insert("diagnosis.insert", diagnosis) == 1;
	}

	public int GetPk() {
		return sqlSession.selectOne("diagnosis.getPk");
	}
	
	// 진료 기록 추가에 따른 질병 추가
	public boolean insertDiseases(Diagnosis diagnosis) {
		return sqlSession.insert("diagnosis.insertDiseases", diagnosis) == 1;
	}
	// 진료 기록 추가에 따른 처방약 추가
	public boolean insertMedicine(Diagnosis diagnosis) {
		return sqlSession.insert("diagnosis.insertMedicine", diagnosis) == 1;
	}
	// 진료 기록 추가에 따른 처치 추가
	public boolean insertPrescription(Diagnosis diagnosis) {
		return sqlSession.insert("diagnosis.insertPrescription", diagnosis) == 1;
	}
	
}
