package com.douzone.hisystem.vo;

import lombok.Data;

@Data
public class Part {

	int no;			// 파트번호[PK]
	String name;	// 파트이름 [ day,evening,night ] 
	String time;	// 파트의 시간: [day: 08~15, evening: 14~22, night: 22~08]
	
}
