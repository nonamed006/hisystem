package com.douzone.hisystem.repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.hisystem.dto.ChatMessageDto;
import com.douzone.hisystem.dto.ChatRoomCreateDto;
import com.douzone.hisystem.dto.ChatRoomDto;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ChatRoomRepository {

	private final SqlSession sqlSession;

	private Map<String, ChatRoomDto> chatRoomDTOMap;

	@PostConstruct
	private void init() {
		chatRoomDTOMap = new LinkedHashMap<>();
	}

	public List<ChatRoomDto> findAllRooms(int no) {
		// 채팅방 생성 순서 최근 순으로 반환
		// List<ChatRoomDto> result = sqlSession.selectList("chat.findAll");
		return sqlSession.selectList("chat.findAll", no);
	}

	public ChatRoomDto findRoomById(String id) {
		return chatRoomDTOMap.get(id);
	}

	public ChatRoomDto createChatRoomDTO(String name) {
		// ChatRoomDto room = ChatRoomDto.create(name);
		// chatRoomDTOMap.put(room.getRoomId(), room);
		return null;
		// return room;
	}

	public List<ChatMessageDto> findAllMessgeByRoomNo(int no) {
		return sqlSession.selectList("chat.findAllMessage", no);
	}

	public void addMessage(Map<String, Object> map) {
		System.out.println(map.get("msg"));
		System.out.println(map.get("send_no"));
		System.out.println(map.get("room_no"));
		sqlSession.insert("chat.addMessage", map);
	}
	
	// 채팅방 생성
	public boolean createChatRoom(String name) {
		return sqlSession.insert("chat.createChatRoom", name) == 1;
	}

	// 채팅방에 사람 추가
	public boolean createChatInfo(Map<String, Object> map ) {
		return sqlSession.insert("chat.createChatInfo", map) == 1; 
	}

	public int getMaxRoomId() {
		return sqlSession.selectOne("chat.getMaxRoomId");
	}
	
	public int chatting(int i, int you) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("i", i);
		map.put("you", you);
		return sqlSession.selectOne("chat.chatting", map);
	}
}