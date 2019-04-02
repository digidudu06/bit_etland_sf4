var emp = emp || {};
emp = (()=>{
	let r_ctn, l_ctn;
	
	let init = ()=>{
		r_ctn = '#right_content';
		l_ctn = '#left_content ul.nav';
		onCreate();
	};
	let onCreate = ()=>{
		setContentView();
	};
	let setContentView = ()=>{
		$(l_ctn).empty();
		$.each(emp_navi(), (i,j)=>{
			$('<li><a href="#">'+j.val+'</a></li>')
			.attr('name', j.name)
			.appendTo(l_ctn)
			.click(function(){
				let that = $(this).attr('name');
				$(this).addClass('active');
				$(this).siblings().removeClass('active');
				alert(that+' 누름');
				
				switch(that){
				case 'cust_list': 
					$(r_ctn).empty();
					cust.list();
					break;
				case 'gds_regi': 
					$(r_ctn).empty();
					$(compo.prod_regi())
					.appendTo(r_ctn);
					
					break;
				case 'gds_list': 
					$(r_ctn).empty();
					$(compo.cust_join_form())
					.appendTo(r_ctn);
					$('form button[type=submit]').click(e=>{
						alert('누름');
						e.preventDefault();
						join();
					});
					break;
				case 'gds_modi': 
					$(r_ctn).empty();
					prod.init();
					break;
				case 'gds_del': 
					$(r_ctn).empty();
					$(compo.emp_regist_form())
					.appendTo(r_ctn);
					break;
				case 'gds_sta': 
					$(r_ctn).empty();
					$(compo.emp_regist_form())
					.appendTo(r_ctn);
					break;
				};
				
			});
		});
	};
	let emp_navi = ()=>{
		return [
			{name:'cust_list', val:'고객목록'},
			{name:'gds_regi', val:'상품등록'},
			{name:'gds_list', val:'상품목록'},
			{name:'gds_modi', val:'상품수정'},
			{name:'gds_del', val:'상품삭제'},
			{name:'gds_sta', val:'상품통계'},
			];
		
	};
	return {init:init};
})();