package com.douzone.hisystem.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.hisystem.vo.User;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserRepository {

	private final SqlSession sqlSession;

	/*
	 * [로그인] Id가 존재하는지 확인 SELECT count(*) FROM user WHERE id = id;
	 */
	public int countById(String id) {

		return sqlSession.selectOne("user.countById", id);
	}

	/*
	 * [로그인] Id가 존재하는 경우 Id와 Pwd에 해당하는 user 정보 가져오기 SELECT * FROM user WHERE id = id
	 * And pwd = pwd;
	 */
	public User findByIdAndPwd(String id, String pwd) {
		Map<String, Object> map = new HashMap<>();
		map.put("id", id);
		map.put("pwd", pwd);
		return sqlSession.selectOne("user.findByIdAndPwd", map);
	}

	/*
	 * [인증] id로 user 정보 가져오기 SELECT * FROM user WHERE id = id;
	 */
	public User findById(int personId) {
		return sqlSession.selectOne("user.findById", personId);
	}

	/*
	 * [신규등록]
	 */
	public void insert(User user) {
		sqlSession.insert("user.insert", user);
	}

	/*
	 * [직원 리스트] - 페이징을위한 토탈카운트 가져오기
	 */
	public int getUserTotalCount(String keyword) {
		return sqlSession.selectOne("user.totalCount", keyword);
	}

	/*
	 * [직원리스트]
	 */
	public List<User> findAllByPageAndKeword(String keyword, Integer page, Integer size) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("keyword", keyword);
		map.put("startIndex", (page - 1) * size);
		map.put("size", size);
		return sqlSession.selectList("user.findAllByPageAndKeword", map);

	}

	/*
	 * [직원상세보기]
	 */
	public User findByNo(Long no) {
		return sqlSession.selectOne("user.findByNo", no);
	}

	/*
	 * [직원수정]
	 */
	public void update(User user) {
		System.out.println(user);
		System.out.println("1234");
		sqlSession.update("user.update", user);
	}
	
	// 의사 진료가능 상태 변경
	public boolean updateStatus(int user_no) {
		return sqlSession.update("user.updateStatus", user_no) == 1;
	}

	/*
	 * [직원삭제]
	 */
	public void delete(int no) {
		sqlSession.delete("user.delete", no);
	}

	/*
	 * 간호사리스트 불러오기 ( 듀티표에서 간호사리스트)
	 */
	public List<User> findNurse() {
		
		return sqlSession.selectList("user.findNurse");
	}

	/*
	 * 직원 신규등록 아이디 중복체크
	 */
	public User checkIdById(String id) {

		return sqlSession.selectOne("user.checkIdById",id);
		 
	}

	public List<User> getUserList2() {
		return sqlSession.selectList("user.getUserList2");
	}
	
	/*
	 * [의사 선택위한 의사 select]
	 */
	public List<User> findDoctor() {
		return sqlSession.selectList("user.findDoctor");
	}

}
