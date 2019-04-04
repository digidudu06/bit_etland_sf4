package com.bit_etland.web.prod;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component @Lazy
public class Product {
	private String productId,
	productName, 
	supplierId,
	categoryId,
	unit,
	color,
	price;
	private List<String> freebies; //2개 이상의 값을 받음
}
