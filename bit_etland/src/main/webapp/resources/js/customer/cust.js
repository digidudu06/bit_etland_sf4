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
		$('#srch_btn').on('click', e=>{
			e.preventDefault();
			alert('서치버튼 클릭');
			let search = $('#search').val();
			if($.fn.nullChecker([search])){
				alert('검색어를 입력해주세요.');
			}else{
				let val = {s:search, p:1};
				alert('검색!');
				srch(val);
			}
		});
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
		$('#srch_grp').show();
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
	};
	let srch = x=>{
		$.getJSON($.ctx()+'/phones/search/'+x.s+'/'+x.p, d=>{
			$('#right_content').empty();
			alert('검색 상품 리스트');
			$('<div class="grid-item" id="content_1">'
					+'<h2>상품 리스트</h2>'
					+'<button id="grid_btn">그리드로 보기</button>'
					+'</div>'
				    +'<div class="grid-item" id="content_2">'
					+'<table class="table table-bordered" id="tab"><tr>'
					+'<th>이름</th>'
					+'<th>공급업체</th>'
					+'<th>카테고리</th>'
					+'<th>수량</th>'
					+'<th>가격</th>'
					+'</tr></table>'
					+'</div>').appendTo('#right_content');
			$.each(d.srch_list, (i,j)=>{
				$('<tr>'
					+'	<td>'+j.productName+'</td>'
					+'	<td>'+j.supplierId+'</td>'
					+'	<td>'+j.categoryId+'</td>'
					+'	<td>'+j.unit+'</td>'
					+'	<td>'+j.price+'</td>'
					+'</tr>'
					).appendTo('#tab');
			});
			
			$('<div style="height: 50px"></div>').appendTo('#content_1');
			$('<div class="pagination"></div>').appendTo('#content_2');
			
			if(d.pxy.existPrev){
				$('<li><a>&laquo;</a></li>')
				.appendTo('.pagination')
				.click(()=>{
					let val = {s:x.s, p:d.pxy.prevBlock};
					srch(val);
				});
			}
			let i=0;
			for(i=d.pxy.startPage;i<=d.pxy.endPage;i++){
				if(d.pxy.pageNum==i){
					$('<li><a class="page active">'+i+'</a></li>')
					.appendTo('.pagination')
					.click(function(){
						alert($(this).text());
						let val = {s:x.s, p:$(this).text()};
						srch(val);
					});
				}else{
					$('<li><a class="page">'+i+'</a></li>')
					.appendTo('.pagination')
					.click(function(){
						alert($(this).text());
						let val = {s:x.s, p:$(this).text()};
						srch(val);
					});
				}
			}
			if(d.pxy.existNext){
				$('<li><a>&raquo;</a></li>')
				.appendTo('.pagination')
				.click(()=>{
					let val = {s:x.s, p:d.pxy.nextBlock};
					srch(val);
				});
			}
			$('#grid_btn').click(e=>{
				alert('그리드 보기 클릭');
				grid(x);
			});
		});
	};
	let grid = x=>{
		$.getJSON($.ctx()+'/phones/search/'+x.s+'/grid/'+x.p, d=>{
			
			$('#right_content').empty();
			$('<div id="grid_content1">'
					+'<h2>상품 그리드</h2>'
					+'<button id="list_btn">리스트 보기</button>'
					+'<div style="height: 50px"></div>'
			+'</div>').appendTo('#right_content');
			
			$(compo.grid()).appendTo('#right_content');
			$('#grid_row').empty();
			let arr = [
				{img:'https://images.samsung.com/is/image/samsung/sec-galaxy-s9-plus-g965-sm-g965nzrakoo-GalaxyS9--99975833?$PD_GALLERY_L_JPG$'},
				{img:'https://img.hankyung.com/photo/201902/01.18936777.1.jpg'},
				{img:'http://static2.e-himart.co.kr/contents/goods/00/01/76/69/53/0001766953__SM-G970N128YL__M_450_450.jpg'},
				{img:'https://img.hankyung.com/photo/201810/01.17977202.1.jpg'}
			];
			$.each(d.srch_list,(i,j)=>{
				$('<div class="col-md-4">'
						+'<div class="thumbnail">'
						+'<a href="'+j.img+'" target="_blank">'
							+'<img src="'+j.img+'" style="width:100%">'
							+'<div class="caption">'
								+'<p>Lorem ipsum donec id elit non mi porta gravida at eget metus.</p>'
							+'</div>'
						+'</a>'
					+'</div>'
				+'</div>').appendTo('#grid_row');
			});
			
			$('<div class="pagination"></div>').appendTo('#grid_content2');
			
			if(d.pxy.existPrev){
				$('<li><a>&laquo;</a></li>')
				.appendTo('.pagination')
				.click(()=>{
					let val = {s:x.s, p:d.pxy.prevBlock};
					grid(val);
				});
			}
			let i=0;
			for(i=d.pxy.startPage;i<=d.pxy.endPage;i++){
				if(d.pxy.pageNum==i){
					$('<li><a class="page active">'+i+'</a></li>')
					.appendTo('.pagination')
					.click(function(){
						alert($(this).text());
						let val = {s:x.s, p:$(this).text()};
						grid(val);					
					});
				}else{
					$('<li><a class="page">'+i+'</a></li>')
					.appendTo('.pagination')
					.click(function(){
						alert($(this).text());
						let val = {s:x.s, p:$(this).text()};
						grid(val);
					});
				}
			}
			if(d.pxy.existNext){
				$('<li><a>&raquo;</a></li>')
				.appendTo('.pagination')
				.click(()=>{
					let val = {s:x.s, p:d.pxy.nextBlock};
					grid(val);
				});
			}
			$('#list_btn').click(e=>{
				srch(x);
			});
		});
	};
	return{init:init,
		list:list, 
		srch:srch,
		grid:grid};
})();