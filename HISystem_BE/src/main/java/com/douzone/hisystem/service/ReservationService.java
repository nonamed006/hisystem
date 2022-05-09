package com.douzone.hisystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.douzone.hisystem.dto.ReservationDto;
import com.douzone.hisystem.repository.ReservationRepository;
import com.douzone.hisystem.vo.Reservation;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationService {
	
	private final ReservationRepository reservationRepository;
	
	// 환자 접수 현황 리스트 조회
	public List<ReservationDto> getReceiptList(String status, String status2, Integer nowPage, String name){
		return reservationRepository.findByRevdate(status, status2, nowPage, name); 
	}
	
	// 페이징 위한 카운트
	public int getCount(String status, String status2, String name) {
		return reservationRepository.getCount(status, status2, name);
	}
	
	// 환자 접수
	public void insertReservation(Reservation reservation) {
		reservationRepository.insertReservation(reservation);
	}
	
	// 접수 삭제
	public void deleteByNo(int no) {
		reservationRepository.deleteByNo(no);
	}
	
	// 상태 대기에서 진료중으로 업데이트
	public boolean update(int no) {
		return reservationRepository.update(no);
	}
	
	// 상태 방문대기에서 진료대기로 업데이트
	public boolean update2(int no) {
		return reservationRepository.update2(no);
	}
	/* 예약 */
	// 예약 조회
	public List<ReservationDto> getReservationList(String rev_date, String name, Integer nowPage){
		return reservationRepository.findReservation(rev_date, name, nowPage);
	}
	
	// 예약 카운트
	public int getCountRes(String name) {
		return reservationRepository.getCountRes(name);
	}
	
	// 예약 접수
		public void insertReservation2(Reservation reservation) {
			reservationRepository.insertReservation2(reservation);
		}
	
}
