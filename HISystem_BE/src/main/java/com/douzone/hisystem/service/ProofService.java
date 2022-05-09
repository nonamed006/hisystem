package com.douzone.hisystem.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.douzone.hisystem.repository.ProofRepository;
import com.douzone.hisystem.vo.Medicine;
import com.douzone.hisystem.vo.Patient;
import com.douzone.hisystem.vo.Proof;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProofService {
	private static final int LIST_SIZE = 5; //리스팅되는 게시물의 수
	private static final int PAGE_SIZE = 5; //페이지 리스트의 페이지 수
	
	private final ProofRepository proofRepository;

	public Map<String, Object> getProof(int patient_no,int currentPage) {
		// 1. 페이징을 위한 기본 데이터 계산
				int totalCount = proofRepository.getProofTotalCount(patient_no);
				System.out.println("------------");
				System.out.println(totalCount);
				System.out.println("------------");
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
				
//				
				//4. 리스트 가져오기
				List<Proof> list = proofRepository.getProof(currentPage,patient_no, LIST_SIZE );
				
				//5. 리스트 정보를 맵에 저장
				Map<String, Object> map = new HashMap<String, Object>();
				
				boolean isPrevPage = beginPage > 1;
				boolean isNextPage = (endPage/PAGE_SIZE) > 1 ;
				System.out.println(isNextPage);
				map.put( "list", list );
				map.put( "totalCount", totalCount );
				map.put( "pageSize", PAGE_SIZE );
				map.put( "currentPage", currentPage );
				map.put( "beginPage", beginPage );
				map.put( "endPage", endPage );

				map.put("isPrevPage", isPrevPage);
				map.put("isNextPage", isNextPage);
//				map.put( "keyword", keyword );


				return map;
				
		

	}

	public Map<String, Object> getPatientList(String keyword, int currentPage) {
		// 1. 페이징을 위한 기본 데이터 계산
		int totalCount = proofRepository.getPatientTotalCount(keyword);
		int pageCount = (int) Math.ceil((double) totalCount / LIST_SIZE);
		int blockCount = (int) Math.ceil((double) pageCount / PAGE_SIZE);
		int currentBlock = (int) Math.ceil((double) currentPage / PAGE_SIZE);
		System.out.println("dddddddddddddddddddddd"+totalCount);
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
		List<Patient> list = proofRepository.findAllPatientByPageAndKeyword(keyword, currentPage, LIST_SIZE );
		
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

	public Medicine getMedicine(int diag_no) {
		return proofRepository.selectMedicine(diag_no);
	}

}




