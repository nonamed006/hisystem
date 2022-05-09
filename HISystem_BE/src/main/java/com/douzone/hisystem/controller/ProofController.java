package com.douzone.hisystem.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.hisystem.service.ProofService;
import com.douzone.hisystem.vo.Medicine;
import com.douzone.hisystem.vo.Proof;

import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@RequiredArgsConstructor
@RestController
public class ProofController {

	private final ProofService proofService;

	@GetMapping("/admin/proof/patient/{page}/{kwd}")
	public Map<String, Object> getPatientList(@PathVariable int page, @PathVariable String kwd	) {
		if (kwd.equals("notSearch")) {
			kwd = "";
		}
		Map<String, Object> map = proofService.getPatientList(kwd, page);
		System.out.println(map);
		return map;
	}
	
	// 진단 내역가져오기
	@GetMapping("/admin/proof/{page}/{patient_no}")
	public  Map<String, Object>  getProofList(@PathVariable int page,@PathVariable int patient_no) {
		
			System.out.println(page);
			System.out.println(patient_no);
		Map<String, Object> map = proofService.getProof(patient_no,page);
		System.out.println(map);
		return map;
//		return null;
	}
	
//	@GetMapping("/admin/proof/print")
//	public ResponseEntity<User> getProof() {
//		return ResponseEntity.ok()
//	}
//	
//	@PostMapping(
//	public String generatePef(@RequestBody Proof proof) throws Exception, JRException {
//		System.out.println(proof);
//		JRBeanCollectionDataSource beanCollectionDataSource= new JRBeanCollectionDataSource((Collection<?>) proof);
//		JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("src/main/resources/proof.jrxml"));
//		
//		HashMap<String, Object> map = new HashMap<>();
//		JasperPrint report = JasperFillManager.fillReport(compileReport, map, beanCollectionDataSource);
//		JasperExportManager.exportReportToPdfFile(report, "proof.pdf");
////		JrBeanCollectiondataSource beanCollectionDataSource= new JrBeanCollectiondataSource(proof)
//		return "generated";
//	}
	
	private static String filePath = "/proof/";
	private static String fileName= "proof.pdf";
	@PostMapping("/admin/proof/print")
	public String exportReport (@RequestBody Proof proof) throws FileNotFoundException, JRException{
		List<Proof> proofs = new ArrayList<>();
		System.out.println(proof);
		proofs.add(proof);
		File file = ResourceUtils.getFile("classpath:proof.jrxml");
		JasperReport jasper = JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(proofs);
		Map<String, Object> parameters = new HashMap<String, Object>();
		parameters.put("proof", proof);
		
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasper, parameters, ds);
		JasperExportManager.exportReportToPdfFile(jasperPrint, fileName);
		
		FileOutputStream os = new FileOutputStream(filePath+fileName);
		System.out.println(parameters);
		System.out.println(jasperPrint);
		return "redirect:"+filePath+fileName;
	}
	
	@GetMapping("/admin/proof/medicine/{diag_no}")
	public Medicine getMedicine(@PathVariable int diag_no) {
		
		return proofService.getMedicine(diag_no);
	}

}
