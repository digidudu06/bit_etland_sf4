package com.bit_etland.web.prod;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.bit_etland.web.cmm.Proxy;


@Repository
public interface ProductMapper {
	public void insertProduct(Map<?, ?> map);
	
	public List<Product> selectProductList(Map<?,?> map);
	public List<Product> selectProducts(Proxy pxy);
	public Product selectProduct(Product emp);
	public int countProduct(Map<?,?> map);
	public int countAllProduct();
	public boolean existsProduct(Product emp);
	
	public void updateProduct(Product emp);
	
	public void deleteProduct(Product emp);
}
