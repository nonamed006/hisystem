package com.douzone.hisystem.config.filter;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.douzone.hisystem.config.filter.CorsFilter;
import com.douzone.hisystem.config.filter.JwtAuthenticationFilter;
import com.douzone.hisystem.config.filter.JwtAuthorizationFilter;
import com.douzone.hisystem.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration	
public class FilterConfig {

	private final UserRepository userRepository;
	
	@Bean
	public FilterRegistrationBean<CorsFilter> corsFilter(){
		System.out.println("[FilterConfig.java] CORS 필터 등록");
		FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter());
		bean.addUrlPatterns("/admin/*");		// 관리자
		bean.addUrlPatterns("/user/*");			// 유저
		bean.addUrlPatterns("/patient/*");		// 환자
		bean.addUrlPatterns("/reservation/*");	// 접수, 예약
		bean.addUrlPatterns("/receipt/*");	//예약
		bean.addUrlPatterns("/chat/*");			// 채팅
		bean.addUrlPatterns("/diagnosis/*");			// 진료
		bean.addUrlPatterns("/acceptance/*");			// 수납
		bean.addUrlPatterns("/kanban/*");			// 칸반 
		bean.addUrlPatterns("/mail/*");			// 메일 
		bean.addUrlPatterns("/todolist/*");			// 메일 
		bean.addUrlPatterns("/untact/*");			// 메일
		
		bean.addUrlPatterns("/login/*");		 
		bean.addUrlPatterns("/logout/*");
		
		bean.setOrder(0); // 낮은 번호부터 실행됨.
		return bean;
	}
	
	// Login
	@Bean
	public FilterRegistrationBean<JwtAuthenticationFilter> jwtAuthenticationFilter(){
		System.out.println("[FilterConfig.java] Jwt Authentication Filter 필터 등록");
		FilterRegistrationBean<JwtAuthenticationFilter> bean = 
				new FilterRegistrationBean<>(new JwtAuthenticationFilter(userRepository));
		bean.addUrlPatterns("/login");
		bean.setOrder(1);
		return bean;
	}
	
	// 인증이 필요한 요청
	@Bean
	public FilterRegistrationBean<JwtAuthorizationFilter> jwtAuthorizationFilter(){
		System.out.println("[FilterConfig.java] Jwt Authorization Filter 필터 등록");
		FilterRegistrationBean<JwtAuthorizationFilter> bean = 
				new FilterRegistrationBean<>(new JwtAuthorizationFilter(userRepository));
		bean.addUrlPatterns("/user/*");
		bean.setOrder(2);
		return bean;
	}
}
