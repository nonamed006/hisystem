package com.douzone.hisystem.vo;

import lombok.Data;

@Data
public class Prescription {

	int code;			// 처방코드[PK]  
	String reg_date;	// 처방일자
	String desc;		// 처방내용
	String price;		// 처방비용 (ex:주사비용,물리치료비용)
	String desc_detail;	// 처방상세내용
	
}
