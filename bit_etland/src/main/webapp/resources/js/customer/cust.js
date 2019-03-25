var cust = cust || {}
cust.permission = (()=>{
	let login = ()=>{
		$.getScript($.js()+'/component/compo.js')
		.done(()=>{
			$('#right_content').html(compo.cust_login_form());
			$('#left_content').html(compo.nav());
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