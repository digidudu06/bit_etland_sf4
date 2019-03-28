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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bit_etland.web.cmm.IConsumer;
import com.bit_etland.web.cmm.IFunction;
import com.bit_etland.web.cmm.PrintService;
import com.bit_etland.web.cmm.Users;
import com.bit_etland.web.emp.EmployeeMapper;

@RestController
@RequestMapping("/emp")
public class EmpController {
	private static final Logger logger = LoggerFactory.getLogger(EmpController.class);
	@Autowired Employee emp;
	@Autowired EmployeeMapper empMap;
	@Autowired Map<String, Object> map;
	@Autowired Users<?> user;
	@Autowired PrintService ps;
	
	@PostMapping("/emp/{userid}")
	public Employee login(@PathVariable String user,
							@PathVariable String userid,
							@RequestBody Employee param) {
		logger.info("==============emp login===============");
		IFunction i = (Object o) -> empMap.selectEmployee(param);
		
		return (Employee) i.apply(param);
	}
	@SuppressWarnings("unchecked")
	@GetMapping("/{user}/list")
	public List<Users<?>> list(
			@PathVariable String user,
			@RequestBody Map<?,?> param
			) {
		logger.info("==============emp join ===============");
		IFunction i = (Object o) -> empMap.selectEmplyoees(param);
		
		return (List<Users<?>>) i.apply(param);
	}	
	@PostMapping("/emp")
	public Map<?, ?> join(@RequestBody Employee param) {
		logger.info("==============emp join ===============");
		System.out.println(param.toString());
		IConsumer i = (Object o) -> empMap.insertEmployee(param);
		i.accept(param);
		map.clear();
		map.put("msg", "success");
		return map;
	}
	@PutMapping("/emp/{userid}")
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
	@DeleteMapping("/emp/{userid}")
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
