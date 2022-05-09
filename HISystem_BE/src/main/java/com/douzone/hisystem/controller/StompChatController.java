package com.douzone.hisystem.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.douzone.hisystem.dto.AlarmDto;
import com.douzone.hisystem.dto.ChatMessageDto;
import com.douzone.hisystem.repository.ChatRoomRepository;
import com.douzone.hisystem.vo.User;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class StompChatController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final ChatRoomRepository chatRoomRepository;
    
    /*	@MessageMapping 을 통해 WebSocket으로 들어오는 메세지 발행을 처리한다. 
     	Client에서는 prefix를 붙여 "/pub/chat/enter"로 발행 요청을 하면 Controller가 해당 메세지를 받아 처리하는데, 
     	메세지가 발행되면 "/sub/chat/room/[roomId]"로 메세지가 전송되는 것을 볼 수 있다
     */
    @MessageMapping(value = "/chat/enter")
    public void enter(ChatMessageDto message){
    	System.out.println("aaa");
        message.setMsg(message.getSend_user_no() + "님이 채팅방에 참여하였습니다.");
        template.convertAndSend("/sub/chat/room/" + message.getChatRoom_no(), message);
    }

    @MessageMapping(value = "/chat/message")
    public void message(ChatMessageDto message){
    	Map<String, Object> map = new HashMap<String, Object>();
		map.put( "msg", message.getMsg() );
		map.put( "send_no", message.getSend_user_no() );
		map.put( "room_no", message.getChatRoom_no() );
		System.out.println(message);
    	chatRoomRepository.addMessage(map);
    	System.out.println("여기서 인서트");
    	
        template.convertAndSend("/sub/chat/room/" + message.getChatRoom_no(), message);
    }
    
    @MessageMapping(value = "/chat/alarm")
    public void alarm(AlarmDto alarm){
    	
    	System.out.println(alarm);
    	
        template.convertAndSend("/sub/chat/room/alarm", alarm);
    }
    
    @MessageMapping(value = "/chat/kanbanReload")
    public void kanban(User o){
    	System.out.println(o);
        template.convertAndSend("/sub/chat/room/kanbanReload", o);
    }

    /*@MessageMapping(value = "/chat/message")
    public void message(ChatMessageDto message){
    	System.out.println(message);
        template.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }*/
}