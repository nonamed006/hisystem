package com.douzone.hisystem.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.douzone.hisystem.repository.PatientRepository;
import com.douzone.hisystem.vo.Patient;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PatientService {
	private final PatientRepository patientRepository;
	
	/* 	환자 조회
		페이징, 검색 정보 포함
	*/
	public List<Patient> getPatientAllList(Map<String, Object> map) {
		return patientRepository.findAll(map);
	}
	
	public List<Patient> getPatientAllList2() {
		return patientRepository.findAllPatient();
	}
	
	/*	환자 수 조회
		검색어에 해당하는 환자
	*/
	public int getCount() {
		return patientRepository.getCount();
	}

	// 환자 등록
	public boolean insertPatient(Patient patient) {
		return patientRepository.insertPatient(patient);
	}
	
	/* 	환자 삭제
		삭제는 등록을 잘못 했을 경우에만 가능하다
		접수기록이 존재하는 경우 삭제가 불가능하다
	*/
	public boolean deletePatient(int id) {
		return patientRepository.deleteById(id);
	}

	public Patient findPatientById(int id) {
		return patientRepository.findPatientById(id);
	}
}
