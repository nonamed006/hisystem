package com.douzone.hisystem.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.hisystem.dto.DutyTodayDto;
import com.douzone.hisystem.repository.DutyRepository;
import com.douzone.hisystem.service.DutyService;
import com.douzone.hisystem.service.UserService;
import com.douzone.hisystem.vo.Duty;
import com.douzone.hisystem.vo.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class DutyController {

	private final DutyRepository dutyRepository;
	private final UserService userService;
	private final DutyService dutyService;
	private final HttpSession session;

	// 듀티표 - 간호사 조회
//		@GetMapping("admin/duty")
//		public Map<String, Object> getDutyList() {
//			List<Duty> duty = dutyService.getDutyList();
//			List<User> nurse = userService.getNurseList();
//			System.out.println(duty);
//			System.out.println(nurse);
//			Map<String, Object> map = new HashMap<String, Object>();
//			map.put("duty", duty);
//			map.put("nurse", nurse);
//			return map;
//		}	

//	@GetMapping("admin/duty")
//	public Map<String, Object>  getDutyList() {
//		List<Duty> duty = dutyService.getDutyList();
//		List<User> nurse =  userService.getNurseList();
//		Map<String, Object> map = new HashMap<String, Object>();
//		map.put("duty", duty);
//		map.put("nurse", nurse);
//		System.out.println(nurse);
//		return map;
//	}
	
	@GetMapping("admin/duty")
	public List<Duty>  getDutyList() {
		List<Duty> dutyList = dutyService.getDutyList();
		System.out.println(dutyList);
		return dutyList;
	}
	
	@GetMapping("admin/nurse")
	public List<User>  getNurseList() {
		List<User> nurse = userService.getNurseList();
		System.out.println(nurse);
		return nurse;
	}
	
	
	
	@PostMapping("admin/duty")
	public void addDuty(@RequestBody Duty duty) {
		System.out.println(duty);
		System.out.println(duty.getUser_no());
		
		
		dutyService.addDuty(duty);
	}
	

	@PostMapping("admin/duty/update")
	public void updateDuty(@RequestBody Duty duty) {
		
		dutyService.updateDuty(duty);
	}
	
	
	@PostMapping("admin/duty/delete")
	public void deleteDuty(@RequestBody Duty duty) {
		System.out.println("---------------");
		System.out.println(duty);
		System.out.println("---------------");
		dutyService.deleteDuty(duty);
	}
	
	
	@GetMapping("admin/today")
	public List<DutyTodayDto> getTodayDuty() {
		List<DutyTodayDto> today = dutyRepository.today();
		return today;
	}
	
}
