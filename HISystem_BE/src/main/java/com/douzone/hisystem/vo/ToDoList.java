package com.douzone.hisystem.vo;

import lombok.Data;

@Data
public class ToDoList {
	private int no;
	private String contents;
	private String reg_date;
	private String rev_date;
	private String fin_yn;
	private int user_no;
	
}
