package com.douzone.hisystem.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.hisystem.vo.Untact;

@Repository
public class UntactRepository {

	@Autowired
	private SqlSession sqlSession;
	
	public List<Untact> findAll() {
		return sqlSession.selectList("untact.findAll");

	}
	
	public boolean add (Untact un) {
		return sqlSession.insert("untact.add", un) == 1;
	}

	public boolean ok1(int no) {
		return sqlSession.update("untact.ok1", no) == 1; 
		
	}
	
	public int searct(int no) {
		return sqlSession.selectOne("untact.search", no); 
		
	}
	
	public Untact find(int no) {
		return sqlSession.selectOne("untact.find", no);
	}
	
}
