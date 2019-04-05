package com.bit_etland.web.cmm;

import java.io.File;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.FileItemFactory;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.apache.tomcat.util.http.fileupload.servlet.ServletRequestContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;
@Component @Data @Lazy
public class Proxy {
	private int rowCount, pageNum, pageSize, blockSize, startRow, endRow, startPage, endPage, prevBlock, nextBlock;
	private boolean existPrev, existNext;
	private String search;
	@Autowired Image img;
	public void carryOut(Map<?,?> paramMap) {
		//page_num, page_size, block_size
		search = (String) paramMap.get("srch");
		String _pageNum = (String)paramMap.get("page_num");
		System.out.println("1........:::페이지 넘:::" + pageNum+"_pageNum ::: "+_pageNum);
		this.pageNum = (_pageNum == null) ? 1 : Integer.parseInt(_pageNum);
		String _pageSize = (String)paramMap.get("page_size");
		this.pageSize = (_pageSize == null) ? 5 : Integer.parseInt(_pageSize);
		System.out.println("2........:::페이지 넘:::" + this.pageNum + ":::::페이지 사이즈:::::" + this.pageSize+" if전_pageSize ::: "+_pageSize);

		String _blockSize = (String)paramMap.get("block_size");
		this.blockSize = (_blockSize == null) ? 5 : Integer.parseInt(_blockSize);
		
		this.rowCount = (int) paramMap.get("row_count");
		System.out.println("전체 카운트" + this.rowCount);
		int nmg = rowCount % pageSize;
		int pageCount = (nmg==0)? rowCount/pageSize : rowCount/pageSize+1;
		System.out.println("pageCount@@@@" + pageCount);
		startRow = (pageNum - 1) * pageSize;
		endRow = (startRow + (pageSize - 1) < rowCount) ? startRow + (pageSize - 1) : rowCount;

		System.out.println("토탈::::::" + rowCount + "::::스타트::::" + startRow + ":::엔드:::" + endRow);

		int blockNum = 0;
		blockNum = (pageNum - 1) / blockSize;
//int pageCount = (int) Math.ceil(rowCount / (double) pageSize);
		
		if(existPrev) {
			startPage=blockNum*blockSize+1;
		}else {
			startPage=1;
		}
		
		startPage = pageNum -((pageNum-1)%blockSize);
		endPage = startPage+(blockSize-1);
		
		if(endPage>pageCount) {
			endPage=pageCount;
		}

		System.out.println("startPage@@@@" + startPage + "  endPage@@@@" + endPage);
		prevBlock = startPage - blockSize;
		nextBlock = startPage + blockSize;

		if (prevBlock < 0) {
			existPrev = false;
			existNext = true;
		} else {
			existPrev = true;
			existNext = false;
		}

		System.out.println("prevBlock@@@@" + prevBlock + "  nextBlock@@@@" + nextBlock);

	}
	public void fileUpload(String customerId) {
		System.out.println("이미지 프록시 1번");
	
		FileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setFileSizeMax(1024 * 1024 * 40); //40MB
		upload.setSizeMax(1024 * 1024 * 50); //50MB
		List<FileItem> items = null;
		try {
			File file = null;
//			items = upload.parseRequest(new ServletRequestContext(request));
			Iterator<FileItem> it = items.iterator();
			while(it.hasNext()) {
				FileItem item = it.next();
				if(!item.isFormField()) {
					String fileName = item.getName();
					file = new File(""+fileName);
					item.write(file);
					img = new Image();
					
					img.setImgName(fileName.substring(0,fileName.indexOf(".")));
					img.setImgExtention(fileName.substring(fileName.indexOf(".")+1));
				
					System.out.println("파일명 : "+img.getImgName()+"******확장자 : "+img.getImgExtention());					
					
//					System.out.println("이미지 : "+request.getParameter("customer_id"));
					img.setOwner(customerId);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
