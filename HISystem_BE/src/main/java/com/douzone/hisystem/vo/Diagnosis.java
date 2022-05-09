package com.douzone.hisystem.vo;

import lombok.Data;

@Data
public class Diagnosis {

	/*int no;					// 진단번호[PK]  
	String remark;			// 진단내용
	String date;			// 진단일자
	String reservation_no;	// 비밀번호
	int user_no;			// 유저번호[FK]*/
	
	private String remark;
	private int reservation_no;
	private String diseases;
	private String medicine;
	private String prescription;
	
	private int patient_no;
	private int user_no;
	private int pk; 
}
