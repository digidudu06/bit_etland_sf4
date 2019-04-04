package com.bit_etland.web.supp;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.bit_etland.web.cmm.Proxy;

@Repository
public interface SupplierMapper {
	public void insertSupplier(Map<?, ?> map);
	
	public List<Supplier> selectSupplierList(Map<?,?> map);
	public List<Supplier> selectSuppliers(Proxy pxy);
	public Supplier selectSupplier(Supplier emp);
	public int countSupplier(Map<?,?> map);
	public int countAllSupplier();
	public boolean existsSupplier(Supplier emp);
	
	public void updateSupplier(Supplier emp);
	
	public void deleteSupplier(Supplier emp);
}
