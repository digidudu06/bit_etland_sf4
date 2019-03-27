var auth = auth || {};
auth = (()=>{
	let r_ctn;
	
	let init = ()=>{
		r_ctn = '#right_content';
		onCreate();
	};
	let onCreate = ()=>{
		setContentView();
	};
	let setContentView =()=>{
		$.getScript($.js()+'/component/compo.js')
		.done(()=>{
			$(r_ctn).empty();
			$(compo.cust_login_form()).appendTo(r_ctn);
			
			login();
			
			$('#left_content ul.nav').empty();
			let arr = [
			{name: 'login', val:'로그인'},
			{name: 'join', val:'회원가입'},
			{name: 'access', val:'사원접속'},
			{name: 'regist', val:'사원등록'}
			];
			$.each(arr, (i,j)=>{
				$('<li><a href="#">'+j.val+'</a></li>')
				.attr('name', j.name)
				.appendTo('#left_content ul.nav')
				.click(function(){
					let that = $(this).attr('name');
					alert(that+' 누름');
					
					switch(that){
					case 'login': 
						$(r_ctn).empty();
						$(compo.cust_login_form())
						.appendTo(r_ctn);
						login();
						break;
					case 'join': 
						$(r_ctn).empty();
						$(compo.cust_join_form())
						.appendTo(r_ctn);
						break;
					case 'access': 
						$(r_ctn).empty();
						$(compo.emp_access_form())
						.appendTo(r_ctn);
						break;
					case 'regist': 
						$(r_ctn).empty();
						$(compo.emp_regist_form())
						.appendTo(r_ctn);
						break;
					};
					
				});
			});
		})
		.fail(()=>{
			alert('componenet/compo.js를 찾지 못 했습니다.');
		});
		
	
	};
	
	let login = ()=>{
		$('form button[type=submit]').click(()=>{
			let data = {
					customerId: $('form input[name=uname]').val(),
					password: $('form input[name=psw]').val()
					};
			$.ajax({
				url: $.ctx()+'/cust/login/',
				type: 'post',
				data: JSON.stringify(data),
				dataType: 'json',
				contentType: 'application/json',
				success: d=>{
					if(d.customerId != ''){
						alert('로그인 성공'+d.customerId);
						$(r_ctn).empty();
						$(r_ctn).html(compo.cust_mypage());
					}else{
						alert('로그인 실패');
					}
				},
				error: e=>{
					alert('에러');
				}
			});
		});
	};
	let join = ()=>{};
	let mypage = ()=>{};
	return {init : init};
})();