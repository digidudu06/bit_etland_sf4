package com.bit_etland.web.emp;

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
import com.bit_etland.web.cmm.ISupplier;
import com.bit_etland.web.cmm.PrintService;
import com.bit_etland.web.cmm.Users;
import com.bit_etland.web.emp.EmployeeMapper;

@RestController
public class EmpController {
	private static final Logger logger = LoggerFactory.getLogger(EmpController.class);
	@Autowired Employee emp;
	@Autowired EmployeeMapper empMap;
	@Autowired Map<String, Object> map;
	@Autowired PrintService ps;
	
	@GetMapping("/employees")
	public Employee access() {
		logger.info("==============emp login===============");
		ISupplier i = ()-> empMap.findOneEmployee();
		return (Employee) i.get();
	}
	@SuppressWarnings("unchecked")
	@GetMapping("/employees/page/{page}")
	public List<Users<?>> list(
			@PathVariable String page,
			@RequestBody Map<?,?> param) {
		logger.info("==============emp join ===============");
		IFunction i = (Object o) -> empMap.selectEmplyoees(param);
		
		return (List<Users<?>>) i.apply(param);
	}	
	@PostMapping("/employees")
	public Map<?, ?> register(@RequestBody Employee param) {
		logger.info("==============emp join ===============");
		System.out.println(param.toString());
		IConsumer i = (Object o) -> empMap.insertEmployee(param);
		i.accept(param);
		map.clear();
		map.put("msg", "success");
		return map;
	}
	@PutMapping("/employees/{userid}")
	public Map<?, ?> update(
			@PathVariable String userid,
			@RequestBody Employee param) {
		logger.info("==============emp ===============");
		IConsumer i = (Object o) -> empMap.updateEmployee(param);
		i.accept(param);
		map.clear();
		map.put("msg", "success");
		return map;
	}
	@DeleteMapping("/employees/{userid}")
	public Map<?, ?> delete(
			@PathVariable String userid,
			@RequestBody Employee param) {
		logger.info("==============emp ===============");
		IConsumer i = (Object o) -> empMap.deleteEmployee(param);
		i.accept(param);
		map.clear();
		map.put("msg", "success");
		return map;
	}

}
