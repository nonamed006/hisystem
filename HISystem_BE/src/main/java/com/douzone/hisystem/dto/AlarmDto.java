package com.douzone.hisystem.dto;

import lombok.Data;

@Data
public class AlarmDto {
	private int userNo; // 알림 받을 사람
	private int patientNo; // 환자
	private String patientName;
	
	private String message; // 메시지
	
	private int type; 
	// 1: 입실알림 / 2: 수납알림 / 3: todo 알림
	
}
/*
	1. 진료 대기 -> 진료 == 의사한테 알람 == 'aaa' 환자가 진료 받으러 들어감
	2. 진료 중  -> 진료 완료 == 원무과로 알람 == 'aaa' 환자가 진료 다 받음
	3.  
*/