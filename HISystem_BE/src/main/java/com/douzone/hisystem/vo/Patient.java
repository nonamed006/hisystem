package com.douzone.hisystem.vo;

import com.douzone.hisystem.dto.Page;

import lombok.Data;

@Data
public class Patient {
	int row_no;			// list 행번호
	int no;				// 환자번호[PK]  
	String name;		// 환자이름
	String gender;		// 환자성별
	String ssn; 		// 환자주민등록번호
	String phone; 		// 환자전화번호
	String addr; 		// 환자주소
	String reg_date;	// 환자등록일
	String visit_date;	// 환자 방문일
	String insurance_yn;// 보험여부 [y: 있음 n:없음]
	String memo;		// 환자에대한메모
	Page page;
}
