package com.douzone.hisystem.vo;

import lombok.Data;

@Data
public class Diseases {

	int code;			// 질병코드[PK]  
	String diseases_kr;	// 병명(한국어)
	String diseases_en;	// 병명(영어)
	
}
