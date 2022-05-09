package com.douzone.hisystem.vo;

import lombok.Data;

@Data
public class Hosbed {

	int no;			// 침상번호[PK]  
	String room;	// 방번호+'호'
	String use_yn;	// 침대사용여부 [침대 사용 여부 -> Y:사용, N:미사용]
	
}
