package com.douzone.hisystem.vo;

import lombok.Data;

@Data
public class DiagnosisHasPrescription {

	int diagnosis_no;	// 진단번호[FK]
	int prescription_code;	// 처방코드[FK]
	
}
