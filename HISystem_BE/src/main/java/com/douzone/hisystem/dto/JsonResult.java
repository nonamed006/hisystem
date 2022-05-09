package com.douzone.hisystem.dto;

public class JsonResult {
	private String result;	 	/* "success" or "fail */
	private Object data; 		/* if success, set */
	private String message; 	/* if fail, set*/
	
	private JsonResult() {}		// 생성자로 필드 맘대로 세팅못하게 막는것
	private JsonResult(Object data) {
		result = "success";
		this.data = data;
		message = null;
	}
	private JsonResult(String message) {
		result = "fail";
		data = null;
		this.message = message;
	}
	
	public static JsonResult success(Object data) {
		return new JsonResult(data);
	}
	public static JsonResult fail(String message) {
		return new JsonResult(message);
	}
	
	public String getResult() {
		return result;
	}
	public Object getData() {
		return data;
	}
	public String getMessage() {
		return message;
	}
	
	
}
