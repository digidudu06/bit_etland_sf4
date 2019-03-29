var cust = cust || {}
cust = (()=>{
	let r_ctn, l_ctn;
	
	let init =(d)=>{
		r_ctn = '#right_content';
		l_ctn = '#left_content ul.nav';
		onCreate(d);
	};
	let onCreate = (d)=>{
		setContentView(d);
	};
	let setContentView =(d)=>{
		
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
						mypage(d);
						/*$('form button[type=submit]').click(e=>{
							e.preventDefault();
							
						});*/
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
						$(compo.emp_access_form())
						.appendTo(r_ctn);
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
			mypage(d);
		$('li[name=mypage]').addClass('active');
	};
	let mypage = d=>{
		$(r_ctn).html(compo.cust_mypage(
			{name:d.customerName,
				id:d.customerId,
				city:d.city,
				address:d.address,
				postalCode:d.postalCode
			}));
	};
	return{init:init};

})();