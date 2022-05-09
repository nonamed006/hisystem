package com.douzone.hisystem.vo;

import lombok.Data;

@Data
public class Hospitalization {

	int no;				// 입원번호[PK]  
	String fr_date;		// 입원일
	String to_date;		// 퇴원일
	String status;		// 상태 [입퇴원상태 -> 입원, 퇴원]
	int hosbed_no;		// 침상번호[FK]
	int diagnosis_no;	//진단번호[FK]
		
}
