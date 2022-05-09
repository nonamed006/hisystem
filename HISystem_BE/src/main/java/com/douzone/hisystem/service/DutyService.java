package com.douzone.hisystem.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.douzone.hisystem.repository.DutyRepository;
import com.douzone.hisystem.vo.Duty;

import ch.qos.logback.core.net.SyslogOutputStream;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DutyService {

	private final DutyRepository dutyRepository;

	public List<Duty> getDutyList() {
		return dutyRepository.findDutyList();
	}

	public void addDuty(Duty duty) {
		// 기간 쪼개기
//		String tmp[] = duty.getDate().split("~");
//		List<Duty> dutyList = new ArrayList<Duty>();
//		String date1 = tmp[0];
//		String date2 = tmp[1];
//		// 날짜 포맷 지정
//		SimpleDateFormat df = new SimpleDateFormat("yyyy-mm-dd");
//		Date FirstDate = null;
//		Date SecondDate = null;
//		Calendar cal;
//		long calDateDays = 0L;
//		try { // String Type을 Date Type으로 캐스팅하면서 생기는 예외로 인해 여기서 예외처리 해주지 않으면 컴파일러에서 에러가 발생해서
//				// 컴파일을 할 수 없다.
//				// date1, date2 두 날짜를 parse()를 통해 Date형으로 변환.
//			FirstDate = df.parse(date1);
//			SecondDate = df.parse(date2);
//
//			// Date로 변환된 두 날짜를 계산한 뒤 그 리턴값으로 long type 변수를 초기화 하고 있다.
//			// 연산결과 -950400000. long type 으로 return 된다.
//			long calDate = FirstDate.getTime() - SecondDate.getTime();
//
//			// Date.getTime() 은 해당날짜를 기준으로1970년 00:00:00 부터 몇 초가 흘렀는지를 반환해준다.
//			// 이제 24*60*60*1000(각 시간값에 따른 차이점) 을 나눠주면 일수가 나온다.
//			calDateDays = calDate / (24 * 60 * 60 * 1000);
//
//			calDateDays = Math.abs(calDateDays);
//
//			System.out.println("두 날짜의 날짜 차이: " + calDateDays);
//		} catch (ParseException e) {
//			System.out.println("ParseException Exception : " + e);
//			// 예외 처리
//		}
//		// Math.toIntExact(calDateDays) : long -> int
//
//		cal = Calendar.getInstance();
//		cal.setTime(FirstDate);
//
//		for (int i = 0; i < Math.toIntExact(calDateDays) + 1; i++) {
//
//			String day = df.format(cal.getTime());
//			// arralist add시 duty 바로 대입시 날짜 바뀔때마다 이전에 넣은 리스트들 날짜도 바뀜 그래서 매번 새 객체 생성
//			Duty dutyTmp = new Duty();
//			switch (duty.getPart_no()) {
//			case "1":
//				dutyTmp.setPart_name("day");
//				dutyTmp.setPart_time("08~17");
//				break;
//			case "2":
//				dutyTmp.setPart_name("evening");
//				dutyTmp.setPart_time("16~24");
//				break;
//			case "3":
//				dutyTmp.setPart_name("night");
//				dutyTmp.setPart_time("23~09");
//				break;
//			case "4":
//				dutyTmp.setPart_name("off");
//				break;
//			case "5":
//				dutyTmp.setPart_name("vacation");
//				break;
//			}
//			dutyTmp.setUser_no(duty.getUser_no());
//			dutyTmp.setPart_no(duty.getPart_no());
//			dutyTmp.setDate(day);
//			dutyList.add(dutyTmp);
//			//하루 더하기
//			cal.add(Calendar.DATE, 1);
//
//		}
//
//		for (Duty a : dutyList) {
//			System.out.println(a);
//		}
//
//		// 원하는 값만큼 날짜 더하기 : 기간의 차이만큼 반복하면서 날짜 리스트 입력
//
////        System.out.println(df.format(cal.getTime()));

		dutyRepository.insert(duty);

	}

	public void updateDuty(Duty duty) {
		dutyRepository.update(duty);
	}

	public void deleteDuty(Duty duty) {
		dutyRepository.delete(duty);
		
	}

}
