package com.douzone.hisystem.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.hisystem.dto.Page;
import com.douzone.hisystem.dto.ReceiptDto;
import com.douzone.hisystem.service.ReceiptService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ReceiptController {

	private final ReceiptService receiptService;
	
	// 수납 조회 - 날짜, 검색, 페이징
	@GetMapping("acceptance/{rec_status}/{dia_date}/{name}/{nowPage}")
	public List<ReceiptDto> findReceiptList(@PathVariable String dia_date, 
			@PathVariable int rec_status, @PathVariable String name, @PathVariable Integer nowPage){
		if(name.equals("notSearch")) name = "";
		
		name = "%" + name + "%";
		Page page = new Page(nowPage, receiptService.getCount(rec_status, name, dia_date), 5);
		
		List<ReceiptDto> receiptList = receiptService.findByDate(dia_date, rec_status, name, page.getNum2());
		
		for(ReceiptDto receipt : receiptList) {
			receipt.setPage(page);
		}
		System.out.println(receiptList);
		return receiptList;
	}
	
	// 수납 완료로 상태 변경
	@PutMapping("acceptance/{no}")
	public String updateStatus(@PathVariable int no) {
		if(receiptService.update(no)) {
			return "success";
		}else {
			return "fail";
		}
	}
	
}
