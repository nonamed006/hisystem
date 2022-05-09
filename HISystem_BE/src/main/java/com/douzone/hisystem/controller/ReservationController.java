package com.douzone.hisystem.controller;


import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.hisystem.dto.Page;
import com.douzone.hisystem.dto.ReservationDto;
import com.douzone.hisystem.repository.PatientRepository;
import com.douzone.hisystem.service.MailService;
import com.douzone.hisystem.service.ReservationService;
import com.douzone.hisystem.service.UserService;
import com.douzone.hisystem.vo.Patient;
import com.douzone.hisystem.vo.Reservation;
import com.douzone.hisystem.vo.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ReservationController {
	
	private final ReservationService reservationService;
	private final UserService userService;
	private final HttpSession session;
	private final MailService mailService;
	private final PatientRepository patientRepository;
	
	/* 접수 */
	// 환자 접수 현황 리스트 조회
	@GetMapping("/receipt/{status}/{status2}/{name}/{nowPage}")
	public List<ReservationDto> getReceiptList(@PathVariable String status, @PathVariable String status2, @PathVariable Integer nowPage, @PathVariable String name){
		
		if(name.equals("notSearch")) name = "";
		name = "%" + name + "%";
		Page page = new Page(nowPage, reservationService.getCount(status, status2, name), 5);
		
		System.out.println(page);
		System.out.println(reservationService.getCount(status, status2, name));
		

		List<ReservationDto> receiptList = reservationService.getReceiptList(status, status2, page.getNum2(), name);
		System.out.println(receiptList);
		
		int row_no = page.getNowPage() * 5 - 4;
		
		for(ReservationDto receipt : receiptList) {
			receipt.setRow_no(row_no++);
			receipt.setPage(page);
			
		}
		return receiptList;
		// 페이지 객체 만들기
		// 	만들려면 총 개수가 필요하니까 이거 해주는 함수(쿼리) 만들기
		//	저거 만들면 객체 생성 가능
		//	getReservationList 여기서 상태랑 page에 있는 getNum()함수값 넣으면 조회를 해주잖아
		//	나온 결과에 위에서 만든 page 객체를 넣어서 리턴해주면 됩니다 
	}
	 
	// 환자 접수
	@PostMapping("/user/receipt")
	public String insertReservation(@RequestBody Reservation reservation) {
		System.out.println(reservation);
		User staff = (User)session.getAttribute("principal");
		reservation.setUser_staff_no(staff.getNo());
		reservationService.insertReservation(reservation);
		return "success";
	}
	
	// 접수 삭제
	@DeleteMapping("/receipt/{no}")
	public void deleteReceipt(@PathVariable int no){
		reservationService.deleteByNo(no);
	}
	
	// 접수 상태 진료대기에서 진료중으로 업데이트
	@PutMapping("receipt/{no}/{user_no}")
	public String updateStatus(@PathVariable int no, @PathVariable int user_no) {
		if(reservationService.update(no) && userService.updateStatus(user_no)) {
			return "success";
		}else {
			return "fail";
		}
	}
	
	// 접수 상태 방문대기에서 진료대기로 업데이트
		@PutMapping("receipt/2/{no}")
		public String updateStatus2(@PathVariable int no, @PathVariable int user_no) {
			if(reservationService.update2(no) ) {
				return "success";
			}else {
				return "fail";
			}
		}
		
	// 접수에서 의사 선택
	@GetMapping("receipt/findDoctor")
	public List<User> findDoctor() {
		return userService.findDoctor();
	}
	
	
	/* 예약 */
	//예약 조회
	@GetMapping("reservation/{rev_date}/{name}/{nowPage}")
	public List<ReservationDto> getReservationList(@PathVariable String rev_date, @PathVariable Integer nowPage, @PathVariable String name){
		if(name.equals("notSearch")) name = "";
		
		name = "%" + name + "%";
		Page page = new Page(nowPage, reservationService.getCountRes(name), 5);
		
		int row_no = page.getNowPage() * 5 - 4;
		
		List<ReservationDto> reservationList = reservationService.getReservationList(rev_date, name, page.getNum2());
		for(ReservationDto reservation : reservationList) {
			System.out.println(row_no);
			reservation.setRow_no(row_no++);
			reservation.setPage(page);
		}
	return reservationList;
	}
	
	// 예약 삭제
	@DeleteMapping("reservation/{no}")
	public void deleteReservation(@PathVariable int no){
		System.out.println("들어옴");
		reservationService.deleteByNo(no);
	}
	
	// 예약 등록
	@PostMapping("/user/reservation")
	public String insertReservation2(@RequestBody Reservation reservation) {
		System.out.println(reservation);
		User staff = (User)session.getAttribute("principal");
		reservation.setUser_staff_no(staff.getNo());
		reservationService.insertReservation2(reservation);
		
		Patient p = patientRepository.findPatientById(reservation.getPatient_no());
		
		System.out.println("###");
		mailService.setMail("lhyoundev@gmail.com");
		mailService.setTitle(p.getName() + "님 예약 확인 메일입니다. - HIsystem");
		mailService.setContents(p.getName() + "님 "+ reservation.getRev_date() + " 예약입니다.");
		//mailService.sendMail();
		System.out.println("###");
		return "success";
	}
}


