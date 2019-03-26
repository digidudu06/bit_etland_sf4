var cust = cust || {}
cust.permission = (()=>{
	let login = ()=>{
		/*$('<li><a href="#section2">Friends</a></li>')//스트링(반객체.. 객체 ㄴㄴ)
		.appendTo('#test')
		.click()*/
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
				alert(j.val+' 누름');
			})
			
		});
		
		$.getScript($.js()+'/component/compo.js')
		.done(()=>{
			$('#right_content').html(compo.cust_login_form());
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