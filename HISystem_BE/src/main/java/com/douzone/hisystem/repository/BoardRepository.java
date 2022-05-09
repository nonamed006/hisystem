package com.douzone.hisystem.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.hisystem.vo.Board;

@Repository
public class BoardRepository {

	@Autowired
	private SqlSession sqlSession;
	
	/*
	 * 	[공자사항 리스트] 페이징을위한 토탈카운트 가져오기
	 */
	public int getBoardTotalCount(String keyword) {
		return sqlSession.selectOne( "board.totalCount", keyword );

	}
	
	/*
	 * 	[공자사항 리스트]
	 */
	public List<Board> findAllByPageAndKeyword( String keyword, Integer page, Integer size ) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put( "keyword", keyword );
		map.put( "startIndex", (page-1)*size );
		map.put( "size", size );
		return sqlSession.selectList("board.findAllByPageAndKeyword", map);
	}
	
	/*
	 *	[공지사항 쓰기] 
	 */
	public int insert( Board board ) {
		return sqlSession.insert( "board.insert", board);
	}
	
	
	/*
	 * [공지사항 글상세]
	 */
	
	public Board findByNo( Long no ) {
		return sqlSession.selectOne( "board.findByNo", no );
	}
	/*
	 * [공지사항 글 수정]
	 */
	public int update( Board board ) {
		return sqlSession.update( "board.update", board );
		
	}
	
	
	/*
	 * 	[공지사항 삭제  삭제]
	 */
	public int delete( int no) {
		
//		Map<String, Long> map = new HashMap<String, Long>();
//		map.put( "no", no );
//		map.put( "user_no", user_no );
		
		return sqlSession.delete( "board.delete", no );
	}

	public int updateHit(Board board) {
		return sqlSession.update( "board.updateHit", board );

	}


}
