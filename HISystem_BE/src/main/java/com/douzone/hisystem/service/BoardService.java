package com.douzone.hisystem.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.douzone.hisystem.repository.BoardRepository;
import com.douzone.hisystem.vo.Board;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {
	private static final int LIST_SIZE = 5; //리스팅되는 게시물의 수
	private static final int PAGE_SIZE = 5; //페이지 리스트의 페이지 수
	
	private final BoardRepository boardRepository;

	public Map<String, Object> getBoardList(String keyword, int currentPage) {
		// 1. 페이징을 위한 기본 데이터 계산
		int totalCount = boardRepository.getBoardTotalCount(keyword);
		int pageCount = (int) Math.ceil((double) totalCount / LIST_SIZE);
		int blockCount = (int) Math.ceil((double) pageCount / PAGE_SIZE);
		int currentBlock = (int) Math.ceil((double) currentPage / PAGE_SIZE);

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
		List<Board> list = boardRepository.findAllByPageAndKeyword( keyword, currentPage, LIST_SIZE );
		
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


		return map;
		
	}

	public void deleteBoard(int no) {
		boardRepository.delete(no);
	}

	public void addBoard(Board board) {
		boardRepository.insert(board);
	}

	public void modifyBoard(Board board) {
		boardRepository.update(board);
		
	}

	public void increaseHit(Board board) {
		boardRepository.updateHit(board);

	}

	
}
