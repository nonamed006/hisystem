package com.douzone.hisystem.config.filter;

interface JwtProps {
	// public static final
	String secret = "비밀키";
	String auth = "Bearer ";
	String header = "Authorization";
}