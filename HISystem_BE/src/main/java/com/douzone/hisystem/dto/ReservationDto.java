package com.douzone.hisystem.dto;

import lombok.Data;

@Data
public class ReservationDto {
	/* 환자 접수 리스트 위한 dto */
	
	int row_no;			// 인덱스
	int no;				// 접수 및 예약번호[PK]  
	String reg_date;	// 등록일
	String rev_date;	// 예약일
	String status;		// 상태 [진료대기,진료중,진료종결]
	String status2;		// 상태 [진료대기,진료중,진료종결]
	int user_staff_no;	// 유저번호:접수담당자 [FK]
	int patient_no;		// 환자 번호[FK]
	String remark;		// 증상
	String rev_yn;		// 예약여부 [y:있음	n:없음]
	int user_doctor_no;	// 유저번호: 담당의사 [FK]
	String name;		// 환자이름
	String gender;		// 환자성별
	String ssn; 		// 환자주민등록번호
	String phone; 		// 환자전화번호
	String addr; 		// 환자주소
	String insurance_yn;// 보험여부 [y: 있음 n:없음]
	String doctor_name;// 보험여부 [y: 있음 n:없음]
	String dia_status; // 의사 진료가능 상태인지 Y:진료 가능 N:불가능(진료중)
	Page page;
	
}
