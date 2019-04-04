package com.bit_etland.web.cate;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.bit_etland.web.cmm.Proxy;


@Repository
public interface CategoryMapper {
	public void insertCategory(Map<?, ?> map);
	
	public List<Category> selectCategoryList(Map<?,?> map);
	public List<Category> selectCategorys(Proxy pxy);
	public Category selectCategory(Category emp);
	public int countCategory(Map<?,?> map);
	public int countAllCategory();
	public boolean existsCategory(Category emp);
	
	public void updateCategory(Category emp);
	
	public void deleteCategory(Category emp);
}
