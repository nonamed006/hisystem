package com.douzone.hisystem.vo;

import lombok.Data;

@Data
public class User {
	int row_no;			// list 행번호
	int no;			// 유저번호[PK]  
	String name;	// 이름
	String id;		// 아이디
	String pwd;		// 비밀번호
	String ssn; 	// 주민등록번호
	String addr; 	// 주소
	String phone; 	// 전화번호
	String img;		// 사진
	String gender;	// 성별
	String reg_date;// 등록일
	String status;	// 상태 [계정의 사용 여부 -> 사용, 미사용]
	int role;	// 유저구분 [의사, 수간호사, 간호사, 원무과, 관리자]
	String connect;
	
	String split_daddr;
	String split_zonecode;
	String split_addr;
	String split_ssn1;
	String split_ssn2;
	String split_phone1;
	String split_phone2;
	String split_phone3;
	
	
}
