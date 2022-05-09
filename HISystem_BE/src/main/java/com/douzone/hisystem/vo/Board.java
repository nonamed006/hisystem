package com.douzone.hisystem.vo;

import lombok.Data;

@Data
public class Board {

	int row_no;
	int no;				// 게시글번호[PK]
	String title;		// 게시물제목
	String contents;	// 내용
	String reg_date;	// 등록일
	String hit; 		// 조회수
	int user_no;		// 유저번호[FK]
	String user_name;
}
