package com.douzone.hisystem.dto;

import lombok.Data;

@Data
public class DiaInfoDto {
	private String dis_code;  
	private String dis_kr_name; 
	private String dis_en_name;
	private String med_code; 
	private String med_name; 
	private String med_company; 
	private String med_ingredient; 
	private String med_additive; 
	private String med_origin;
	private String pre_code; 
	private String pre_date; 
	private String pre_desc; 
	private String pre_desc_detail; 
	private String pre_price;
}
