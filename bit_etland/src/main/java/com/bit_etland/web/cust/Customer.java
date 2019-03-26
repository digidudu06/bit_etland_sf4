package com.bit_etland.web.cust;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component @Lazy
public class Customer {
	private String rnum,
	customerId,
	customerName,
	password,
	ssn,
	photo,
	phone,
	city, //지번주소
	address, 
	postalCode;
}
