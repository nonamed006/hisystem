package com.douzone.hisystem.config.chat;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker // Stomp를 사용하기위해 선언하는 어노테이션
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
	/*	[WebSocketMessageBrokerConfigurer]
		handshake와 통신을 담당할 endPoint를 지정 configureMessageBroker에서 Application 내부에서 사용할 path를 지정
    */
	@Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
		// connect 할 때 사용되는 url이고 절대 cors filter 태우면 안 됨
        registry.addEndpoint("/stomp/connect")
        .setAllowedOrigins("http://localhost:3000")
        .withSockJS();
    }

	/*	/topic : 암시적으로 1:N 전파를 의미
		/queue : 암시적으로 1:1 전파를 의미 */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
    	// Client에서 SEND 요청을 처리
    	registry.setApplicationDestinationPrefixes("/pub");
    	// 해당 경로로 SimpleBroker를 등록. SimpleBroker는 해당하는 경로를 SUBSCRIBE하는 Client에게 메세지를 전달하는 간단한 작업을 수행
        registry.enableSimpleBroker("/sub");
    }
}
/* 	pub/sub 메시징을 구현하기 위해
	메시지를 발행하는 요청의 prefix는 [/pub] 으로 시작하도록 설정
	메시지를 구독하는 요청의 prefix는 [/sub] 으로 시작하도록 설정 */