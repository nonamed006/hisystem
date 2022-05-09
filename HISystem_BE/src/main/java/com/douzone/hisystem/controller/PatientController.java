package com.douzone.hisystem.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.hisystem.dto.Page;
import com.douzone.hisystem.service.PatientService;
import com.douzone.hisystem.vo.Patient;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class PatientController {
	private final PatientService patientService;
	
	/* 	환자 조회
		페이징, 검색 정보 포함 
	*/
	@GetMapping("/patient/{nowPage}/{name}")
	public List<Patient> getPatientAllList(@PathVariable int nowPage, @PathVariable String name) {
		Page page = new Page(nowPage, patientService.getCount(), 5);
		System.out.println(page);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put( "nowPage", page.getNum2() );
		System.out.println(page.getNum2());
		map.put( "name", name.equals("notSearch") ? "%" : "%"+name+"%" );
		List<Patient> patientList = patientService.getPatientAllList(map);
		for(Patient patient : patientList) {
			patient.setPage(page);
		}
		return patientList;
	}
	
	@GetMapping("patient/getall")
	public List<Patient> getPatientAllList2(){
		return patientService.getPatientAllList2();
	}
	
	// 환자 등록
	@PostMapping("/patient")
	public String insertPatient(@RequestBody Patient patient) {
		System.out.println(patient);
		if(patientService.insertPatient(patient)) return "success";
		else return "fail";
	}
	
	/* 	환자 삭제
		삭제는 등록을 잘못 했을 경우에만 가능하다
		접수기록이 존재하는 경우 삭제가 불가능하다
	*/
	@DeleteMapping("/patient/{id}")
	public ResponseEntity<?> deletePatient(@PathVariable int id){
		if(patientService.deletePatient(id)) {
			return new ResponseEntity<String>("success", HttpStatus.OK);
		}else {
			// 접수기록이 있어서 삭제하지 못하는 경우
			return new ResponseEntity<String>("fail", HttpStatus.OK);
		}
		
	}
	
	@GetMapping("patient/{id}")
	public ResponseEntity<?> findPatientById(@PathVariable int id){
		return new ResponseEntity<Patient>(patientService.findPatientById(id), HttpStatus.OK);
		
	}
}
