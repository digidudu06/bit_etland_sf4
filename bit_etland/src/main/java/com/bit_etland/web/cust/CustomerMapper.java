package com.bit_etland.web.cust;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.bit_etland.web.cmm.Proxy;

@Repository
public interface CustomerMapper {
	public void insertCustomer(Customer cus);
	
	public List<Customer> selectCustomerLists();
	public List<?> selectCustomers(Proxy pxy);
	public Customer selectCustomer(Customer cus);
	public Customer selectOneCustomer(Customer cus);
	public Map<String, Map<?,?>> selectProfile(Map<?,?> m);
	public Map<String, Map<?,?>> selectPhone(Map<?,?> m);
	
	public int countCustomer(Map<?,?> m);
	public int countAllCustomer();
	
	public void updateCustomer(Customer cus);
	
	public void deleteCustomer(Customer cus);

}
