package com.douzone.hisystem.dto;

import lombok.Data;

@Data
public class ReceiptDto {
	private int row_no;
	private int rec_no; 
	private int rec_status;
	private int rec_price;
	private String dia_remark; 
	private String dia_date; 
	private int dia_res_no; 
	private int dia_user_no;
	private String dis_code;
	private String dis_name; 
	private String pre_code;
	private String pre_desc;
	private String pre_detail; 
	private int pre_price; 
	private int pat_no;
	private String pat_name;
	private String pat_ssn;
	private String pat_phone;
	Page page;
}
