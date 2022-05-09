package com.douzone.hisystem.controller;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.hisystem.repository.KanbanCardszReposisory;
import com.douzone.hisystem.repository.KanbanRepository;
import com.douzone.hisystem.vo.Kanbanz;
import com.douzone.hisystem.vo.User;
import com.douzone.hisystem.vo.KanbanCardsz;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class KanbanController {

	private final KanbanRepository kanbanRepository;
	private final KanbanCardszReposisory kanbanCardszReposisory;
	private final HttpSession session;

	// kanban 전체 list 조회
	@GetMapping("/kanban")
	public List<Kanbanz> findAll() {
		return kanbanRepository.findAll();
	}
	
	// kanban board 생성
	@GetMapping("/user/kanban/{board}")
	public String newBoard(@PathVariable String board) {
		User user = (User)session.getAttribute("principal");
		Kanbanz newKanbanz = new Kanbanz();
		newKanbanz.setTitle(board);
		newKanbanz.setUser_no(user.getNo());
		kanbanRepository.save(newKanbanz);
		return "success";
	}
	
	// kanban card 추가
	@PostMapping("/user/kanban")
	public String insert(@RequestBody KanbanCardsz kanbanCards) {
		User user = (User)session.getAttribute("principal");
		System.out.println(kanbanCards);
		//kanbanCards.setKanban_no(1);
		kanbanCards.setUser_no(user.getNo());
		
		System.out.println(kanbanCards);
		
		kanbanCardszReposisory.save(kanbanCards);
		return "success";
	}

	// kanban board 생성
	@DeleteMapping("/user/kanban/{i}")
	public String delete(@PathVariable int i) {
		//User user = (User)session.getAttribute("principal");
		System.out.println(i);
		kanbanCardszReposisory.deleteById(i);
		
		return "success";
	}
	
	@PutMapping("/user/kanban/{card}/{kanban}")
	public String update(@PathVariable int kanban, @PathVariable int card) {
		
		System.out.println(kanban);
		System.out.println(card);
		
		KanbanCardsz cardEntiry = kanbanCardszReposisory.findById(card).get();
		cardEntiry.setKanban_no(kanban);
		
		kanbanCardszReposisory.updateKanbanNo(kanban, card);
		
		return "success";
	}	
	
}
