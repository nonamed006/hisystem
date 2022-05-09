package com.douzone.hisystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.douzone.hisystem.dto.ReceiptDto;
import com.douzone.hisystem.repository.ReceiptRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReceiptService {

	private final ReceiptRepository receiptRepository;
	
	// 수납 조회
	public List<ReceiptDto> findByDate(String dia_date, int rec_status, String name, int nowPage){
		return receiptRepository.findByDate(dia_date, rec_status, name, nowPage);
	}
	
	// 페이징 위한 카운트
		public int getCount(int status, String name, String dia_date) {
			return receiptRepository.getCount(status, name, dia_date);
		}
		
	//수납 상태 완료로 상태 변경
	public boolean update(int no) {
		return receiptRepository.update(no);
	}
}
