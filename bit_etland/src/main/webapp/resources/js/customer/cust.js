var cust = cust || {}
cust = (()=>{
	let r_ctn, l_ctn, data;
	
	let init =(d)=>{
		r_ctn = '#right_content';
		l_ctn = '#left_content ul.nav';
		data = d;
		onCreate();
	};
	let onCreate = ()=>{
		setContentView();
	};
	let setContentView =()=>{
		$(l_ctn).empty();
		$.each(cust_navi(), (i,j)=>{
			$('<li><a href="#">'+j.val+'</a></li>')
			.attr('name', j.name)
			.appendTo(l_ctn)
			.click(function(){
				let that = $(this).attr('name');
				$(this).addClass('active');
				$(this).siblings().removeClass('active');
				alert(that+' 누름');
				
				switch(that){
				case 'mypage': 
					$(r_ctn).empty();
					mypage();
					break;
				case 'update': 
					$(r_ctn).empty();
					$(compo.cust_login_form())
					.appendTo(r_ctn);
					$('form button[type=submit]').click(e=>{
						e.preventDefault();
						login();
					});
					break;
				case 'delete': 
					$(r_ctn).empty();
					$(compo.cust_join_form())
					.appendTo(r_ctn);
					$('form button[type=submit]').click(e=>{
						alert('누름');
						e.preventDefault();
						join();
					});
					break;
				case 'shop': 
					$(r_ctn).empty();
					prod.init();
					break;
				case 'purchase_h': 
					$(r_ctn).empty();
					$(compo.emp_regist_form())
					.appendTo(r_ctn);
					break;
				case 'basket': 
					$(r_ctn).empty();
					$(compo.emp_regist_form())
					.appendTo(r_ctn);
					break;
				};
				
			});
		});
		mypage();
		$('li[name=mypage]').addClass('active');
	};
	let cust_navi = ()=>{
		return [
			{name: 'mypage', val:'마이페이지'},
			{name: 'update', val:'정보수정'},
			{name: 'delete', val:'회원탈퇴 '},
			{name: 'shop', val:'쇼핑몰'},
			{name: 'p_history', val:'구매내역'},
			{name: 'basket', val:'장바구니'}
			];
			
	};
	let mypage = ()=>{
		$(r_ctn).html(compo.cust_mypage(
			{name:data.customerName,
				id:data.customerId,
				phone:data.phone,
				city:data.city,
				address:data.address,
				postalCode:data.postalCode
			}));
	};
	let list = (x)=>{
		$.getJSON($.ctx()+'/customers/page/'+x, d=>{
			$('#right_content').empty();
			alert('커스터머 리스트');
			
			$('<div class="grid-item" id="content_1">'
					+'<h2>고객리스트</h2>'
					+'</div>'
				    +'<div class="grid-item" id="content_2">'
					+'<table class="table table-bordered" id="tab"><tr>'
					+'<th>NO.</th>'
					+'<th>이름</th>'
					+'<th>아이디</th>'
					+'<th>성별</th>'
					+'<th>전화번호</th>'
					+'<th>주소</th>'
					+'<th>상세주소</th>'
					+'<th>우편번호</th>'
					+'</tr></table>'
					+'</div>').appendTo('#right_content');
			
			$.each(d.list, (i,j)=>{
				/*alert(j.customerId);*/
				
				$('<tr>'
					+'	<td>'+j.rownum+'</td>'
					+'	<td>'+j.customerName+'</td>'
					+'	<td>'+j.customerId+'</td>'
					+'	<td>여</td>'
					+'	<td>'+j.phone+'</td>'
					+'	<td>'+j.city+'</td>'
					+'	<td>'+j.address+'</td>'
					+'	<td>'+j.postalCode+'</td>'
					+'</tr>'
					).appendTo('#tab');
			});
			
			/*
			 * <div class="container">
  <h2>Pagination</h2>
  <p>The .pagination class provides pagination links:</p>                  
  <ul class="pagination">
    <li><a href="#">1</a></li>
    <li><a href="#">2</a></li>
    <li><a href="#">3</a></li>
    <li><a href="#">4</a></li>
    <li><a href="#">5</a></li>
  </ul>
</div>
			 * */
			$('<div class="container" style="height: 50px"></div>').appendTo('#content_2');
			$('<ul class="pagination"></ul>').appendTo('.container');
			
			if(d.pxy.existPrev){
				$('<li><a>&laquo;</a></li>')
				.appendTo('.pagination')
				.click(()=>{
					list(d.pxy.prevBlock);
				});
			}
			let i=0;
			for(i=d.pxy.startPage;i<=d.pxy.endPage;i++){
				if(d.pxy.pageNum==i){
					$('<li><a class="page active">'+i+'</a></li>')
					.appendTo('.pagination')
					.click(function(){
						alert($(this).text());
						list($(this).text());
					});
				}else{
					$('<li><a class="page">'+i+'</a></li>')
					.appendTo('.pagination')
					.click(function(){
						alert($(this).text());
						list($(this).text());
					});
				}
			}
			if(d.pxy.existNext){
				$('<li><a>&raquo;</a></li>')
				.appendTo('.pagination')
				.click(()=>{
					list(d.pxy.nextBlock);
				});
			}
			
			/*$(html).appendTo('#content_2');*/
		});
		
		/*
		 * <div style="height: 50px"></div>    
	<div class="center">
	  <div class="pagination">
		  <c:if test="${pagination.existPrev}">
			  <a href='${ctx}/customer.do?cmd=cust_list&page=list&page_num=${pagination.prevBlock}'>&laquo;</a>
		  </c:if>
		  <c:forEach begin="${pagination.startPage}" end="${pagination.endPage}" varStatus="status">
			  <c:choose>
			  	<c:when test="${pagination.pageNum eq status.index}">
			  		<a href="#" class="page active">${status.index}</a>
			  	</c:when>
			  	<c:otherwise>
			  		<a href="#" class="page">${status.index}</a>
			  	</c:otherwise>
			  </c:choose>
		  </c:forEach>
		  
		  <c:if test="${pagination.existNext}">
			  <a href='${ctx}/customer.do?cmd=cust_list&page=list&page_num=${pagination.nextBlock}'>&raquo;</a>
		  </c:if>
	  </div>
	</div>
</div>
		 * */
	};
	return{init:init,
		list:list};

})();