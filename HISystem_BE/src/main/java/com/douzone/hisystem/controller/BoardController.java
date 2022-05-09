package com.douzone.hisystem.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.hisystem.service.BoardService;
import com.douzone.hisystem.vo.Board;
import com.douzone.hisystem.vo.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class BoardController {
	private final BoardService boardService;
	private final HttpSession session;
	private final Schedule schegule; 
	
	// 관리자 - 공지사항 조회
	@GetMapping("/admin/board/{page}/{kwd}")
	public Map<String, Object> getBoardList(@PathVariable int page, @PathVariable String kwd
//				@RequestParam (value="keyword", required = true, defaultValue ="") String keyword,
//				@RequestParam (value="page", required = true, defaultValue ="") int page
	) {
		if (kwd.equals("notSearch")) {
			kwd = "";
		}
		Map<String, Object> map = boardService.getBoardList(kwd, page);
		System.out.println(map);
		return map;
	}

	// 관리자 - 공지 삭제
	@DeleteMapping("admin/board/{no}")
	public void deleteUser(@PathVariable int no) {
		System.out.println("------------"+no);
		boardService.deleteBoard(no);
	}

	// 관리자 - 공지 등록
	@PostMapping("/user/board/add")
	public Board addBoard(@RequestBody Board board) {

		User staff = (User) session.getAttribute("principal");
		System.out.println(board);
			board.setUser_no(staff.getNo());
			board.setUser_name(staff.getName());
//
			boardService.addBoard(board);

		return board;
	}

	// 관리자 - 공지 수정
	@PostMapping("/user/board/update")
	public Board updateBoard(@RequestBody Board board) {

		System.out.println("112233");
		System.out.println(board);
		boardService.modifyBoard(board);
		return board;
	}

	// 관리자 - 공지 조회수 증가
	@PostMapping("/admin/board/hit")
	public Board updatehit(@RequestBody Board board) {

		System.out.println("___________________");
		System.out.println(board);
		System.out.println("---------------------");
		String prevHit =  board.getHit(); 
		if(prevHit == "") {
			prevHit = "0";
		}
		String hit =  Integer.toString(Integer.parseInt(prevHit)+1);
		board.setHit(hit);
		boardService.increaseHit(board);
		return board;
	}

	// 관리자 - 계정 가져오기
	@GetMapping("/user/board")
	public User getUser() {

		User staff = (User) session.getAttribute("principal");
		System.out.println(staff);
		return staff;

	}

}
