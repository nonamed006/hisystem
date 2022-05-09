package com.douzone.hisystem.dto;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.springframework.web.socket.WebSocketSession;

import lombok.Data;

@Data
public class ChatRoomDto {
	private int userNo;
    private int roomNo;
    private String roomName;
    private int count;
    private String time;
    private String msg;
    private int userCount; // 유저 몇 명 방인지
    
    //private Set<WebSocketSession> sessions = new HashSet<>();
    //WebSocketSession은 Spring에서 Websocket Connection이 맺어진 세션

//    public static ChatRoomDto create(String name){
//        ChatRoomDto room = new ChatRoomDto();
//
//        room.roomId = UUID.randomUUID().toString();
//        room.name = name;
//        return room;
//    }
}