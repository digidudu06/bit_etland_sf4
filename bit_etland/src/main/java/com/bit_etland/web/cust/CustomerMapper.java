package com.bit_etland.web.cust;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface CustomerMapper {
	public void insertCustomer(Customer cus);
	
	public List<Customer> selectCustomerLists(Map<?,?> m);
	public List<Customer> selectCustomers(Map<?,?> m);
	public Customer selectCustomer(Customer cus);
	public Customer selectOneCustomer(Customer cus);
	public Map<String, Map<?,?>> selectProfile(Map<?,?> m);
	public Map<String, Map<?,?>> selectPhone(Map<?,?> m);
	
	public int countCustomer(Map<?,?> m);
	
	public void updateCustomer(Customer cus);
	
	public void deleteCustomer(Customer cus);

}
