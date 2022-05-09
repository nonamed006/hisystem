package com.douzone.hisystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.douzone.hisystem.vo.KanbanCardsz;

public interface KanbanCardszReposisory extends JpaRepository<KanbanCardsz, Integer>{

	@Transactional
	@Modifying
    @Query("UPDATE KanbanCardsz SET kanban_no = :kanban_no WHERE id = :id")
    int updateKanbanNo(int kanban_no, int id);
}
