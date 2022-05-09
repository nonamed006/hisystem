package com.douzone.hisystem.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.douzone.hisystem.dto.ChatMessageDto;
import com.douzone.hisystem.dto.ChatRoomCreateDto;
import com.douzone.hisystem.dto.ChatRoomDto;
import com.douzone.hisystem.repository.ChatRoomRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/chat")
@Log4j2
public class RoomController {

    private final ChatRoomRepository repository;

    // 유저 no로 현재 소속된 채팅방 조
    @GetMapping("/rooms/{no}")
    public List<ChatRoomDto> rooms(@PathVariable int no){
        return repository.findAllRooms(no);
    }
    
    // room no로 채팅방의 채팅 내용 가져오기
    @GetMapping("/room/message/{no}")
    public List<ChatMessageDto> message(@PathVariable int no){
        return repository.findAllMessgeByRoomNo(no);
    }

    
    //채팅방 개설 2 == 유저 넣기 
    @PostMapping("/room2")
    public int create2(@RequestBody ChatRoomCreateDto dto){
    	System.out.println("333");
    	System.out.println(dto);
    	System.out.println("333");
    	int maxRoomId = repository.getMaxRoomId(); // 무조건 정확
    	
    	if(dto.getIsFirst().equals("true")){
    		Map<String, Object> map = new HashMap<String, Object>();
    		map.put("userNo", dto.getSendUserNo());
    		map.put("charRoomNo", maxRoomId);
            repository.createChatInfo(map);
    	}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userNo", dto.getUserNo());
		map.put("charRoomNo", maxRoomId);
        repository.createChatInfo(map);
        
        return maxRoomId;
    }
    
    //채팅방 개설 1 == 방 
    @PostMapping("/room1")
    public String create1(@RequestBody ChatRoomCreateDto dto){
    	if(repository.createChatRoom(dto.getChatRoomName())) return "success";
    	else return "fail"; 
    }

    //채팅방 조회
    @GetMapping("/room/{room}")
    public ChatRoomDto getRoom(@PathVariable String roomId){

        log.info("# get Chat Room, roomID : " + roomId);

        return repository.findRoomById(roomId);
    }
    
    @GetMapping("/room/{i}/{you}")
    public int chatting(@PathVariable int i, @PathVariable int you) {
    	System.out.println("###");
    	System.out.println(i);
    	System.out.println(you);
    	System.out.println("###");
    	int result;
    	try {
    		result = repository.chatting(i, you);
		} catch (Exception e) {
			return -1; 
		}
    	 
    	return repository.chatting(i, you);
    }
    
}