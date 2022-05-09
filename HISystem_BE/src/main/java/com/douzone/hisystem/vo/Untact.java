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

@Data
public class Untact {

	private int row_no;
	private int no;				// 보드 no
	private String name;
	private String ssn;
	private String phone;
	private String gender;
	private String insurance_yn;
	private String addr;
	private int doctor_no;
	private String remark;
	private String reg_date;
	private String status;
}
