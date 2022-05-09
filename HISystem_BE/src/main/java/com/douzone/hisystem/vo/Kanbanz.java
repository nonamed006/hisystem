package com.douzone.hisystem.vo;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Data
public class Kanbanz {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // 해당 데이터베이스 번호증가 전략을 따라가기
	private int id;				// 보드 no
	private String title;		// 보드 제목
	
	@JsonIgnoreProperties({"kanban_no"})
	@OneToMany(mappedBy = "kanban_no", fetch = FetchType.LAZY)//LAZY
	private List<KanbanCardsz> cards;
	
	private int user_no;		// 생성한 유저 no
	private String reg_date;	// 생성한 날짜
}
