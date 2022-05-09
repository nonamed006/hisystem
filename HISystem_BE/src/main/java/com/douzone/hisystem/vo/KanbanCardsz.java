package com.douzone.hisystem.vo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Data
public class KanbanCardsz {
	@Id // 기본키 설정
	@GeneratedValue(strategy = GenerationType.IDENTITY) // 해당 데이터베이스 번호증가 전략을 따라가기
	private int id;				// 카드 no
	private String title;		// 카드 제목
	private String description;	// 카드 내용
	
	private int kanban_no;		// 보드 no
	private int user_no;		// 작성한 유저 no
	private String reg_date;	// 작성한 날짜
}
