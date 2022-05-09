package com.douzone.hisystem.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.hisystem.dto.AlarmDto;
import com.douzone.hisystem.repository.PatientRepository;
import com.douzone.hisystem.repository.ReservationRepository;
import com.douzone.hisystem.repository.UntactRepository;
import com.douzone.hisystem.vo.Patient;
import com.douzone.hisystem.vo.Reservation;
import com.douzone.hisystem.vo.Untact;
import com.douzone.hisystem.vo.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class UntactController {
	// status : 1 확인 전 / 2 : 승락 / 3 : 거부
	private final UntactRepository repository;
	private final ReservationRepository reservationRepository;
	private final HttpSession session;
	private final PatientRepository patientRepository;
	private final SimpMessagingTemplate template;

	@GetMapping("/untact")
	public List<Untact> getBoardList(){
		return repository.findAll();
	}

	@PostMapping("/untact")
	public String add(@RequestBody Untact untact) {
		System.out.println(untact);
		repository.add(untact);
		AlarmDto alarm = new AlarmDto();
		alarm.setType(4);
		template.convertAndSend("/sub/chat/room/alarm", alarm);
		return "success";
	}

	// 접수 승인
	@GetMapping("/user/untact/ok1/{no}")
	@Transactional(rollbackFor = Exception.class)
	public String ok1(@PathVariable int no){
		Untact untact = repository.find(no);
		int userNo = repository.searct(no);
		User staff = (User)session.getAttribute("principal");
		System.out.println(untact);
		System.out.println(userNo);
		System.out.println(staff);
		if(userNo != -1) {
			repository.ok1(no);
			//#{user_staff_no}, #{patient_no}, #{remark}, 'N', #{user_doctor_no})
			Reservation reservation = new Reservation();
			reservation.setUser_staff_no(staff.getNo());
			reservation.setPatient_no(userNo);
			reservation.setRemark(untact.getRemark());
			reservation.setUser_doctor_no(untact.getDoctor_no());
			
			reservationRepository.insertReservation(reservation);
			

			return "success";
		}else {
			// 환자 추가 후 
			// repository.ok1(no);
			repository.ok1(no);
			Patient p = new Patient();
			// (null, #{name}, #{gender}, #{ssn}, #{phone}, #{addr}, now(), null, #{insurance_yn}, null)
			p.setName(untact.getName());
			p.setGender(untact.getGender());
			p.setSsn(untact.getSsn());
			p.setPhone(untact.getPhone());
			p.setAddr(untact.getAddr());
			p.setInsurance_yn(untact.getInsurance_yn());
			System.out.println(p);
			patientRepository.insertPatient(p);
			userNo = repository.searct(no);
			Reservation reservation = new Reservation();
			reservation.setUser_staff_no(staff.getNo());
			reservation.setPatient_no(userNo);
			reservation.setRemark(untact.getRemark());
			reservation.setUser_doctor_no(untact.getDoctor_no());
			
			reservationRepository.insertReservation(reservation);
			  

			return "success";
		}
		
		
		
	}
	
	
}
