var auth = auth || {};
auth.permission = (()=>{
	let rightCtnt = $('#right_content');
	
	let init = ()=>{
		onCreate();
	};
	let onCreate = ()=>{
		setContentView();
	};
	let setContentView =()=>{
		
	};
	let login = ()=>{
		$.getScript($.js()+'/component/compo.js')
		.done(()=>{
			rightCtnt.html(compo.cust_login_form());
			
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
					success: d=>{},
					error: e=>{}
				});
			});
			
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
						rightCtnt.empty();
						$(compo.cust_login_form())
						.appendTo('#right_content');
						
						break;
					case 'join': 
						rightCtnt.empty();
						$(compo.cust_join_form())
						.appendTo('#right_content');
						break;
					case 'access': 
						rightCtnt.empty();
						$(compo.emp_access_form())
						.appendTo('#right_content');
						break;
					case 'regist': 
						rightCtnt.empty();
						$(compo.emp_regist_form())
						.appendTo('#right_content');
						break;
					};
					
				});
			});
		})
		.fail(()=>{
			alert('componenet/compo.js를 찾지 못 했습니다.');
		});
		
	};
	let join = ()=>{};
	let mypage = ()=>{};
	return {
		login : login,
		join : join,
		mypage : mypage
	};
})();