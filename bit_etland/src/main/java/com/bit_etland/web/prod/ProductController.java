package com.bit_etland.web.prod;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bit_etland.web.cate.Category;
import com.bit_etland.web.cate.CategoryMapper;
import com.bit_etland.web.cmm.IConsumer;
import com.bit_etland.web.cmm.IFunction;
import com.bit_etland.web.cmm.ISupplier;
import com.bit_etland.web.cmm.PrintService;
import com.bit_etland.web.cmm.Proxy;
import com.bit_etland.web.cust.CustController;
import com.bit_etland.web.supp.Supplier;
import com.bit_etland.web.supp.SupplierMapper;

@RestController
public class ProductController {
	private static final Logger logger = LoggerFactory.getLogger(CustController.class);
	@Autowired Map<String, Object> map;
	@Autowired ProductMapper proMap;
	@Autowired Product prod;
	@Autowired Proxy pxy;
	@Autowired PrintService ps;
	@Autowired CategoryMapper cateMap;
	@Autowired Category cate;
	@Autowired SupplierMapper suppMap;
	@Autowired Supplier supp;
	
	@Transactional
	@PostMapping("/phones")
	public Map<?, ?> regist(@RequestBody Product param) {
		logger.info("==============Product insert===============");
		List<String> list = param.getFreebies();
		ps.accept("리스트:: "+list);
		System.out.println(param.toString());
		cate.setCategoryName(param.getCategoryId());
		IFunction f = s -> cateMap.txCategory((String)s); 
		IFunction f2 = s -> suppMap.txSupplier((String)s);
		String cateId = (String) f.apply(param.getCategoryId());	 //실값=category name
		String suppId = (String) f2.apply(param.getSupplierId());    //실값=supplier name
		param.setCategoryId(cateId);
		param.setSupplierId(suppId);
		
		IConsumer i = o -> proMap.insertProduct(param);
		i.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		return map;
	}
	
	@GetMapping("/phones/page/{page}")
	public Map<?,?> list(@PathVariable String page) {
		map.clear();
		map.put("page_num", page);
		map.put("page_size", "5");
		map.put("block_size", "5");
		ISupplier sup = () -> proMap.countAllProduct();
		map.put("row_count", sup.get());
		pxy.carryOut(map);
		IFunction i = (Object o) -> proMap.selectProducts(pxy);
		List<?> list =(List<?>) i.apply(pxy);
		map.clear();
		map.put("list", list);
		map.put("pxy", pxy);
		return map;
	}
	@GetMapping("/phones/search/{search}/{page}")
	public Map<?,?> select(
			@PathVariable("search") String search, 
			@PathVariable("page") String page) {
		logger.info("==============Product select===============");
		String srch = "%"+search+"%";
		map.clear();
		map.put("srch", srch);
		map.put("page_num", page);
		map.put("page_size", "5");
		map.put("block_size", "5");
		IFunction f2 = (Object o) -> proMap.countProduct(srch);
		map.put("row_count", f2.apply(srch));
		System.out.println("로우넘 :::::"+f2.apply(srch));
		pxy.carryOut(map);
		IFunction f1 = (Object o) -> proMap.selectProduct(pxy);
		List<?> list = (List<?>) f1.apply(pxy);
		ps.accept("리스트:: "+list);
		map.clear();
		map.put("pxy", pxy);
		map.put("srch_list", list);
		return map;
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
