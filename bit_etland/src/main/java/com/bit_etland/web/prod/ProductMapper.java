package com.bit_etland.web.prod;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;


@Repository
public interface ProductMapper {
	public void insertProduct(Product emp);
	
	public List<Product> selectProductList(Map<?,?> map);
	public List<Product> selectProducts(Map<?,?> map);
	public Product selectProduct(Product emp);
	public int countProduct(Map<?,?> map);
	public boolean existsProduct(Product emp);
	
	public void updateProduct(Product emp);
	
	public void deleteProduct(Product emp);
}
