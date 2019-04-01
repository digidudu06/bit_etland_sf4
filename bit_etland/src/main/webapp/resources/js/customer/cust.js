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

		let arr = [
			{name: 'mypage', val:'마이페이지'},
			{name: 'update', val:'정보수정'},
			{name: 'delete', val:'회원탈퇴 '},
			{name: 'shop', val:'쇼핑몰'},
			{name: 'p_history', val:'구매내역'},
			{name: 'basket', val:'장바구니'}
			];
			$.each(arr, (i,j)=>{
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
	let list = ()=>{
		$('#right_content').empty();
		$.getJSON($.ctx()+'/customers/page/1', d=>{
			alert('커스터머 리스트');
			$('<table class="table table-bordered" id="tab"><tr><th>NO.</th>'
					+'<th>이름</th>'
					+'<th>아이디</th>'
					+'<th>전화번호</th>'
					+'<th>주소</th>'
					+'<th>상세주소</th>'
					+'<th>우편번호</th>'
					+'</tr></table>').appendTo('#right_content');
			
			$.each(d, (i,j)=>{
				/*alert(j.customerId);*/
				
				$('<tr>'
					+'	<td>'+j.no+'</td>'
					+'	<td>'+j.customerName+'</td>'
					+'	<td>'+j.customerId+'</td>'
					+'	<td>'+j.phone+'</td>'
					+'	<td>'+j.city+'</td>'
					+'	<td>'+j.address+'</td>'
					+'	<td>'+j.postalCode+'</td>'
					+'</tr>'
					).appendTo('#tab');
			});
		});
	};
	return{init:init,
		list:list};

})();