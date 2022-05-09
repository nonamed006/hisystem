package com.douzone.hisystem.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class ChatMessageDto {
	private int no;
    private String msg;
    private String reg_date;
    String send_user_no;
    String read_yn;
    int chatRoom_no;
    int receive_user_no;
	
	//private String roomId;
    //private String writer;
    //private String message;
    
}