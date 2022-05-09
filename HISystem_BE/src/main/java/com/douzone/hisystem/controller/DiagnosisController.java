package com.douzone.hisystem.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.hisystem.dto.DiagnosisDto;
import com.douzone.hisystem.repository.DiagnosisRepository;
import com.douzone.hisystem.repository.PatientRepository;
import com.douzone.hisystem.repository.ReceiptRepository;
import com.douzone.hisystem.repository.ReservationRepository;
import com.douzone.hisystem.service.DiagnosisService;
import com.douzone.hisystem.service.UserService;
import com.douzone.hisystem.vo.Diagnosis;
import com.douzone.hisystem.vo.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class DiagnosisController {
	
	private final DiagnosisService diagnosisService;
	private final DiagnosisRepository diagnosisRepository;
	private final ReceiptRepository receiptRepository;
	private final ReservationRepository reservationRepository;
	private final PatientRepository patientRepository;
	private final UserService userService;
	private final HttpSession session;

	/* 	진료 기록 조회
		환자 이름으로(pk[no]) 조회
		
	*/
	@GetMapping("/diagnosis/{no}")
	public List<DiagnosisDto> getPatientAllList(@PathVariable int no) {
		System.out.println(diagnosisService.getBeforeDianosis(no));
		return diagnosisService.getBeforeDianosis(no);
	}
	
	@PostMapping("/user/diagnosis")
	@Transactional(rollbackFor = Exception.class)
	public String insert(@RequestBody Diagnosis diagnosis ) {
		System.out.println(diagnosis);
		// 진료 / 질병 / 약 / 처방 / 수납 / 접수 상태 변경 -> 진료 완료 / 환자 최근 방문일 업데이트
		/*	넘어오는 Data
		 	remark = 소견
      		reservation_no = 접수 번호
      		diseases = 질병 코드
      		medicine = 약 코드
      		prescription = 처방 코드
		 */
		User doctor = (User)session.getAttribute("principal");
		System.out.println(doctor);
		
		diagnosis.setUser_no(doctor.getNo());
		System.out.println(diagnosis);
		int pk = diagnosisService.insertDiagnosisAndGetPk(diagnosis);
		System.out.println(pk);
		if(pk > 0) {
			diagnosis.setPk(pk);
			diagnosisRepository.insertDiseases(diagnosis); // 질병
			diagnosisRepository.insertMedicine(diagnosis); // 약
			diagnosisRepository.insertPrescription(diagnosis); // 처치
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("patient_no", diagnosis.getPatient_no());
			map.put("dia_no", diagnosis.getPk());
			map.put("doctor_no", doctor.getNo());
			if(receiptRepository.insert(map)) {
				reservationRepository.update3(diagnosis.getReservation_no());
				patientRepository.updateVisDate(diagnosis.getPatient_no());
				userService.updateStatus(doctor.getNo());
				return "success";
			}
		}
		
		return "fail";
	}
	
	@GetMapping("/diagnosis/info/{no}")
	public List<DiagnosisDto> getDiaInfo(@PathVariable int no) {
		System.out.println(diagnosisRepository.findDiaInfo(no));
		return diagnosisRepository.findDiaInfo(no);
	}
	
}


		