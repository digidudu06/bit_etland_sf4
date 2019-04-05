package com.bit_etland.web.prod;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.bit_etland.web.cmm.Proxy;


@Repository
public interface ProductMapper {
	public void insertProduct(Product pro);
	
	public List<?> selectProductList(Map<?,?> map);
	public List<?> selectProducts(Proxy pxy);
	public List<?> selectProduct(Proxy pxy);
	public int countProduct(String search);
	public int countAllProduct();
	public boolean existsProduct(Product pro);
	
	public void updateProduct(Product pro);
	
	public void deleteProduct(Product pro);
}
