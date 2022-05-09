package com.douzone.hisystem.vo;

import lombok.Data;

@Data
public class Duty {

	int no;			// 업무번호[PK]  
	int user_no;	// 유저번호[FK]
//	String date;	// 업무 날짜
	String start_date;
	String end_date;
	String part_no;	// 파트번호[FK]
	
	String part_name;
	String part_time;
	String user_name;
}
