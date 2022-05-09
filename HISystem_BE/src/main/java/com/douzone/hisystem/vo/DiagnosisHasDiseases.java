package com.douzone.hisystem.vo;

import lombok.Data;

@Data
public class DiagnosisHasDiseases {

	int diagnosis_no;	// 진단번호[FK]
	int diseases_code;	// 질병코드[FK]
}
