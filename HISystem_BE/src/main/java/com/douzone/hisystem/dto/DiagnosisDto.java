package com.douzone.hisystem.dto;

import lombok.Data;

@Data
public class DiagnosisDto {
	private int dia_no; 
	private String dia_remark; 
	private String dia_date; 
	private int dia_res_no; 
	private int dia_user_no;
	private String dis_code;
	private String dis_name; 
	private String med_code;
	private String med_name; 
	private String pre_code;
	private String pre_desc;
	private String pre_detail; 
	private int pat_no;
	private String pat_name;
}
