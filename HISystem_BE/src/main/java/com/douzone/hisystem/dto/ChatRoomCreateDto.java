package com.douzone.hisystem.dto;

import lombok.Data;

@Data
public class ChatRoomCreateDto {
	
	private String inputMessage;	// 채팅 방 생성 후 전송할 메시지
	private String chatRoomName;
	private int userNo;
	private String isFirst;
	private int sendUserNo;
}
