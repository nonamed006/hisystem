package com.douzone.hisystem.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.hisystem.vo.Medicine;
import com.douzone.hisystem.vo.Patient;
import com.douzone.hisystem.vo.Proof;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ProofRepository {

	private final SqlSession sqlSession;



	public List<Proof> getProof(int page,int patient_no, Integer size ) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put( "page", page );
		map.put( "startIndex", (page-1)*size );
		map.put( "size", size );
		map.put( "patient_no", patient_no );
		return sqlSession.selectList("proof.findProof",map);
	}



	public int getPatientTotalCount(String keyword) {
		return sqlSession.selectOne( "proof.patientTotalCount", keyword );
	}



	public List<Patient> findAllPatientByPageAndKeyword( String keyword, Integer page, Integer size) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put( "keyword", keyword );
		map.put( "startIndex", (page-1)*size );
		map.put( "size", size );
		return sqlSession.selectList("proof.findAllPatientByPageAndKeyword", map);
	}



	public int getProofTotalCount(int patient_no) {
		return sqlSession.selectOne( "proof.proofTotalCount",patient_no);
	}



	public Medicine selectMedicine(int diag_no) {
		return sqlSession.selectOne( "proof.findMedicine",diag_no);
	}



}
