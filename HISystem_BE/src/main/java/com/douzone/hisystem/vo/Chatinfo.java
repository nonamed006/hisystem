package com.douzone.hisystem.vo;

import lombok.Data;

@Data
public class Chatinfo {

	int user_no;		// 유저번호[FK]  
	int chatroom_roomId;	// 채팅방번호[FK]
	
}
