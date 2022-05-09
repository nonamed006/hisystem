package com.douzone.hisystem.vo;

import lombok.Data;

@Data
public class DiagnosisHasMedicine {

	int diagnosis_no;	// 진단번호[FK]
	int medicine_code;	// 약품코드[FK]
	
}
