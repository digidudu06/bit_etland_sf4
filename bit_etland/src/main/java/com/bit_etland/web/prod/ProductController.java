package com.bit_etland.web.prod;

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
import com.bit_etland.web.cmm.Users;
import com.bit_etland.web.cust.CustController;

@RestController
public class ProductController {
	private static final Logger logger = LoggerFactory.getLogger(CustController.class);
	@Autowired Map<String, Object> map;
	@Autowired ProductMapper proMap;
	@Autowired Product pro;
	
	@PostMapping("/phones")
	public Map<?, ?> insert(
			@RequestBody Product param) {
		logger.info("==============Product insert===============");
		IConsumer i = (Object o) -> proMap.insertProduct(param);
		i.accept(param);
		return map;
	}
	
	@GetMapping("/phones/page/{page}")
	public List<Product> list(
			@PathVariable String page,
			@RequestBody Product param
			) {
		IFunction i = (Object o) -> proMap.selectProductList(map);
		return (List<Product>) i.apply(param);
	}
	@GetMapping("/phones/{prodid}")
	public Product select(
			@PathVariable String prodid,
			@RequestBody Product param) {
		logger.info("==============Product select===============");
		IFunction i = (Object o) -> proMap.selectProduct(param);
		return (Product) i.apply(prodid);
	}
	@PutMapping("/phones/{prodid}")
	public Map<?, ?> update(
			@PathVariable String prodid,
			@RequestBody Product param) {
		logger.info("==============Product update===============");
		IConsumer i = (Object o) -> proMap.updateProduct(param);
		i.accept(param);
		return map;
	}
	@DeleteMapping("/phones/{prodid}")
	public Map<?, ?> delete(
			@PathVariable String prodid,
			@RequestBody Product param) {
		logger.info("==============Product delete===============");
		IConsumer i = (Object o) -> proMap.deleteProduct(param);
		i.accept(param);
		return map;
	}
	

}
