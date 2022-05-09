package com.douzone.hisystem.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.hisystem.dto.JsonResult;
import com.douzone.hisystem.dto.Page;
import com.douzone.hisystem.repository.UserRepository;
import com.douzone.hisystem.service.UserService;
import com.douzone.hisystem.vo.Patient;
import com.douzone.hisystem.vo.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class UserController {

	private final UserService userService;
	private final UserRepository userRepository;
	private final HttpSession session;

	// 관리자 - 유저 조회
	@GetMapping("/admin/user/{page}/{kwd}")
	public Map<String, Object> getUserList(@PathVariable int page,@PathVariable String kwd
//		public List<User> getUserList(
//				@RequestParam (value="keyword", required = true, defaultValue ="") String keyword,
//				@RequestParam (value="page", required = true, defaultValue ="") int page
	) {
		if(kwd.equals("notSearch") ) {
			kwd = "";
		}
		System.out.println("1");
		System.out.println(page);
		System.out.println(kwd);
		
		Map<String, Object> map = userService.getUserList(kwd, page);
		System.out.println(map);
//		List<User> user = userRepository.findNurse();
		return map;
//			return userService.getUserList(keyword,page);
	}


	// 관리자 - 유저 등록
	@PostMapping("admin/user/add")
	public void addUser(@RequestBody User user) {
		System.out.println("서버단------------------");
		userService.addUser(user);
		System.out.println("-------------------");
 
	}

	// 관리자 - 유저 삭제
	@DeleteMapping("admin/user/{no}")
	public void deleteUser(@PathVariable int no) {
		System.out.println("삭제할번호");
		System.out.println("----"+no);
		System.out.println();
		userService.deleteUser(no);
	}

	// 관리자 - 유저 수정
	@PostMapping("admin/user/update")
	public void updateUser(@RequestBody User user) {
		System.out.println("1");
		System.out.println(user);
		System.out.println("2");
			userService.updateUser(user);
	}

	// 관리자 - 유저 아이디 중복체크
	@GetMapping("admin/user/checkId/{id}")
	public JsonResult checkId(@PathVariable String id) {
		
		User userVo = userService.checkId(id);
		
		return JsonResult.success(userVo != null);
	}
	
	// 로그아웃
	@GetMapping("/logout")
	public ResponseEntity<?> logout() {
		session.removeAttribute("principal");
		return new ResponseEntity<String>("success", HttpStatus.OK);
	}
	// 로그인 유저 정보
	@GetMapping("/user")
	public User loginid() {
		User user = (User) session.getAttribute("principal");
		return user;
	}
	
	@GetMapping("/user/list")
	public List<User> getUserList() {
		return userService.getUserList2();
	}

}
