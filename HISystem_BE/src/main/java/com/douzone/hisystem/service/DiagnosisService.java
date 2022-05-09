package com.douzone.hisystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.douzone.hisystem.dto.DiagnosisDto;
import com.douzone.hisystem.repository.DiagnosisRepository;
import com.douzone.hisystem.vo.Diagnosis;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DiagnosisService {
	private final DiagnosisRepository diagnosisDtoRepository;
	
	/* 	진료 기록 조회
	환자 이름으로(pk[no]) 조회
	
	 */
	public List<DiagnosisDto> getBeforeDianosis(int no) {
		return diagnosisDtoRepository.findByNo(no);
	}

	// 인서트 후 pk 리턴
	public int insertDiagnosisAndGetPk(Diagnosis diagnosis) {
		
		if(diagnosisDtoRepository.insert(diagnosis)) {
			return diagnosisDtoRepository.GetPk();
		};
		
		return 0;
	}
	

}
