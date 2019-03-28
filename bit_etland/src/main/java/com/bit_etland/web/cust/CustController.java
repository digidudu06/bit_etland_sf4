package com.bit_etland.web.cust;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bit_etland.web.cmm.IConsumer;
import com.bit_etland.web.cmm.IFunction;
import com.bit_etland.web.cmm.PrintService;

@RestController
@RequestMapping("/cust")
public class CustController {
	
	private static final Logger logger = LoggerFactory.getLogger(CustController.class);
	@Autowired Customer cust;
	@Autowired CustomerMapper custMap;
	@Autowired Map<String, Object> map;
	@Autowired PrintService ps;
	@PostMapping("/login")
	public Customer login(@RequestBody Customer param) {
		logger.info("==============customer login===============");
		IFunction i = (Object o) -> custMap.selectOneCustomer(param);
		return (Customer)i.apply(param);
	}
	@PostMapping("/join")
	public Map<String, Object> join(@RequestBody Customer param) {
		logger.info("==============customer join ===============");
		System.out.println(param.toString());
		IConsumer i = (Object o) -> custMap.insertCustomer(param);
		i.accept(param);
		map.clear();
		map.put("msg", "success");
		return map;
	}
	@PutMapping("/update")
	public Customer update(@RequestBody Customer param) {
		logger.info("==============customer ===============");
		System.out.println(param.toString());
		IConsumer i = (Object o) -> custMap.insertCustomer(param);
		i.accept(param);
		
		return null;
	}
	@DeleteMapping("/delete")
	public Customer delete(@RequestBody Customer param) {
		logger.info("==============customer ===============");
		System.out.println(param.toString());
		IConsumer i = (Object o) -> custMap.insertCustomer(param);
		i.accept(param);
		
		return null;
	}
	
	
}
