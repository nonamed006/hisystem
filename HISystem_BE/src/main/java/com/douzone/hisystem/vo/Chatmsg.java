package com.douzone.hisystem.vo;

import lombok.Data;

@Data
public class Chatmsg {

	int no;					// 챗메시지번호[PK]  
	String msg;				// msg내용
	String reg_date;		// 등록일
	String send_user_no;	// 보낸사람유저번호[FK]
	String read_yn;			// 읽음확인 [메시지 읽음 여부 -> Y: 읽음, N: 안읽음]
	String chatroom_roomId;		// 채팅방번호[FK]
	String receive_user_no;	// 받은사람유저번호[FK]
	
}
