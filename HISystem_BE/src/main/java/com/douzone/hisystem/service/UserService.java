package com.douzone.hisystem.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.douzone.hisystem.repository.UserRepository;
import com.douzone.hisystem.vo.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	private static final int LIST_SIZE = 6; //리스팅되는 게시물의 수
	private static final int PAGE_SIZE = 5; //페이지 리스트의 페이지 수
	
	private final UserRepository userRepository;

	public Map<String, Object> getUserList(String keyword, int currentPage) {
		// 1. 페이징을 위한 기본 데이터 계산
		int totalCount = userRepository.getUserTotalCount(keyword);
		System.out.println("a");
		int pageCount = (int) Math.ceil((double) totalCount / LIST_SIZE);
		int blockCount = (int) Math.ceil((double) pageCount / PAGE_SIZE);
		int currentBlock = (int) Math.ceil((double) currentPage / PAGE_SIZE);
//		System.out.println(pageCount);
//		System.out.println(blockCount );
//		System.out.println(currentBlock);
		//2. 파라미터 page 값  검증
		if( currentPage > pageCount ) {
			currentPage = pageCount;
			currentBlock = (int)Math.ceil( (double)currentPage / PAGE_SIZE );
		}		
		
		if( currentPage < 1 ) {
			currentPage = 1;
			currentBlock = 1;
		}
		//3. view에서 페이지 리스트를 렌더링 하기위한 데이터 값 계산
		int beginPage = currentBlock == 0 ? 1 : (currentBlock - 1) * PAGE_SIZE + 1;
		int prevPage = ( currentBlock > 1 ) ? ( currentBlock - 1 ) * PAGE_SIZE : 0;
		int nextPage = ( currentBlock < blockCount ) ? currentBlock * PAGE_SIZE + 1 : 0;
		int endPage = ( nextPage > 0 ) ? ( beginPage - 1 ) + PAGE_SIZE : pageCount;
		
		//4. 리스트 가져오기
		List<User> list = userRepository.findAllByPageAndKeword( keyword, currentPage, LIST_SIZE );
		// 주소 자르기
		for(User user: list) {
			int d_addrIndex = user.getAddr().indexOf(")")+1;
			int addrIndex = 6;
			
			String ssn1 = user.getSsn().substring(0,6);
			String ssn2 = user.getSsn().substring(7);

			String zone_code= user.getAddr().substring(0,addrIndex);
			String addr = user.getAddr().substring(addrIndex,d_addrIndex);
			String d_addr = user.getAddr().substring(d_addrIndex);

			user.setSplit_addr(addr);
			user.setSplit_zonecode(zone_code);
			
			user.setSplit_daddr(d_addr);
			
			user.setSplit_ssn1(ssn1);
			user.setSplit_ssn2(ssn2);
			
			String split_phone[] = user.getPhone().split("-");
		
			user.setSplit_phone1(split_phone[0]);
			user.setSplit_phone2(split_phone[1]);
			user.setSplit_phone3(split_phone[2]);
			
		
		}
		// 주민번호 자르기
		
		//5. 리스트 정보를 맵에 저장
		Map<String, Object> map = new HashMap<String, Object>();
		

		boolean isPrevPage = beginPage > 1;
		boolean isNextPage = (endPage/PAGE_SIZE) > 1 ;
//		boolean isNextPage = (endPage == currentPage) ? false : true; 
		System.out.println(isNextPage);
		map.put( "list", list );
		map.put( "totalCount", totalCount );
		map.put( "pageSize", PAGE_SIZE );
		map.put( "currentPage", currentPage );
		map.put( "beginPage", beginPage );
		map.put( "endPage", endPage );
//		map.put( "prevPage", prevPage );
//		map.put( "nextPage", nextPage );
		map.put("isPrevPage", isPrevPage);
		map.put("isNextPage", isNextPage);
		map.put( "keyword", keyword );
		System.out.println("d");
		
		return map;
		
	}

	public Map<String, Object> parsePageAndKwd(String jsonData) {
		Map<String, Object> map = new HashMap<String, Object>();
		String[] s = jsonData.split(",");
		System.out.println(s[0]);
		System.out.println(s[1]);
//		String[] page = s[0].split(":");
//		String[] keyword = s[1].split(":");
//		System.out.println(page[0]);
//		System.out.println(page[1]);
//		System.out.println(keyword[0]);
//		System.out.println(keyword[1]);
		
		int page = Integer.parseInt(s[0].substring( s[0].indexOf(":")+1));
		String keyword = s[1].substring(s[1].indexOf(":")+2 ,s[1].indexOf("}")-1);
//		System.out.println(page);
//		System.out.println(keyword);
		
		map.put("page", page);
		map.put("keyword", keyword);
		return map;
	}
	public void addUser(User user) {
		System.out.println(user);
		System.out.println(user.getSsn());
		
		String str1 =user.getSsn().substring(0,6);
		String str2 =user.getSsn().substring(7);
		String ssn = str1 + "-" + str2;
		user.setSsn(ssn);
		userRepository.insert(user);
	}

	public void deleteUser(int no) {
		userRepository.delete(no);
	}

	public List<User> getNurseList() {
		return userRepository.findNurse();
	}

	public User checkId(String id) {

		return userRepository.checkIdById(id);
	}


	public void updateUser(User user) {

		userRepository.update(user);
	}
	
	// 의사 진료 가능 상태 변경
	public boolean updateStatus(int user_no) {
		return userRepository.updateStatus(user_no);
	}


	public List<User> getUserList2() {
		return userRepository.getUserList2();
	}


	public List<User> findDoctor() {
		return userRepository.findDoctor();
	}
	
}
