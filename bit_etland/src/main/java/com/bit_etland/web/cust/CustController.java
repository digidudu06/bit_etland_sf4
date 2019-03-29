package com.bit_etland.web.cust;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bit_etland.web.cmm.IConsumer;
import com.bit_etland.web.cmm.IFunction;
import com.bit_etland.web.cmm.PrintService;
import com.bit_etland.web.cmm.Users;

@RestController
public class CustController {
	
	private static final Logger logger = LoggerFactory.getLogger(CustController.class);
	@Autowired Customer cust;
	@Autowired CustomerMapper custMap;
	@Autowired Map<String, Object> map;
	@Autowired Users<?> user;
	@Autowired PrintService ps;
	
	@PostMapping("/customers/{userid}")
	public Customer login(
			@PathVariable String userid,
			@RequestBody Customer param) {
		logger.info("==============customer login===============");
		IFunction i = (Object o) -> custMap.selectOneCustomer(param);
		
		return (Customer) i.apply(param);
	}
	@SuppressWarnings("unchecked")
	@GetMapping("/customers/page/{page}")
	public List<Customer> list(
			@PathVariable String page,
			@RequestBody Map<?,?> param
			) {
		logger.info("==============customer list ===============");
		IFunction i = (Object o) -> custMap.selectCustomers(param);
		
		return (List<Customer>) i.apply(param);
	}	
	@PostMapping("/customers")
	public Map<?, ?> join(@RequestBody Customer param) {
		logger.info("==============customer join ===============");
		System.out.println(param.toString());
		IConsumer i = (Object o) -> custMap.insertCustomer(param);
		i.accept(param);
		map.clear();
		map.put("msg", "success");
		return map;
	}
	@PutMapping("/customers/{userid}")
	public Map<?, ?> update(
			@PathVariable String userid,
			@RequestBody Customer param) {
		logger.info("==============customer update===============");
		IConsumer i = (Object o) -> custMap.updateCustomer(param);
		i.accept(param);
		map.clear();
		map.put("msg", "success");
		return map;
	}
	@DeleteMapping("/customers/{userid}")
	public Map<?, ?> delete(
			@PathVariable String userid,
			@RequestBody Customer param) {
		logger.info("==============customer delete===============");
		IConsumer i = (Object o) -> custMap.deleteCustomer(param);
		i.accept(param);
		map.clear();
		map.put("msg", "success");
		return map;
	}
	
	
}
