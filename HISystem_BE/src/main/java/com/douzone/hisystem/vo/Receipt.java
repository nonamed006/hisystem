package com.douzone.hisystem.vo;

import lombok.Data;

@Data
public class Receipt {
	
	int no;				// 영수증번호[PK]
	int patient_no;		// 환자번호[FK]
	String status;		// 상태 [결제완료,미완료]
	int df_price;		// 기본진료비
	int diagnosis_no;	// 진단번호[FK]
	int user_no;		// 유저번호 결제담당자[FK]
		
}
