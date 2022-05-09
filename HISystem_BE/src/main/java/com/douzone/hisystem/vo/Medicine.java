package com.douzone.hisystem.vo;

import lombok.Data;

@Data
public class Medicine {

	int code;					// 약품코드[PK]  
	String medicine_nm;			// 약품이름
	String company;				// 약품회사이름
	String main_ingredient;		// 약품 주재료
	String additive;			// 약품성분
	String origin;				// 약 출처
	int diag_no;				// 진단번호: 여러 진료내역에서 하나 선택했을 때 그 진단번호로 디비에서 처방정보를 가져옴
	String reservation_no;		// 접수번호
	String diag_date;			// 약 처방일 
	String patient_name;		// 환자이름
	String doctor_name;			// 의사이름
}