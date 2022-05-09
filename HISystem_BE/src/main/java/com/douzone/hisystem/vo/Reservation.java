package com.douzone.hisystem.vo;

import lombok.Data;

@Data
public class Reservation {

	int no;				// 접수 및 예약번호[PK]  
	String reg_date;	// 등록일
	String rev_date;	// 예약일
	String status;		// 상태 [진료대기,진료중,진료종결]
	int user_staff_no;	// 유저번호:접수담당자 [FK]
	int patient_no;		// 환자 번호[FK]
	String remark;		// 증상
	String rev_yn;		// 예약여부 [y:있음	n:없음]
	int user_doctor_no;	// 유저번호: 담당의사 [FK]
}
