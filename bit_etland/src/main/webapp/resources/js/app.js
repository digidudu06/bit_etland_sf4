var app = app || {};

app = (() => {
	let init = x=>{
		app.$.init(x);
	};
	let onCreate = ()=>{
		$.when(
				$.getScript($.js()+'/component/compo.js'),
				$.getScript($.js()+'/product/prod.js'),
				$.getScript($.js()+'/customer/cust.js'),
				$.getScript($.js()+'/common/auth.js'),
				$.getScript($.js()+'/employee/emp.js')
		).done(()=>{//콜백
			auth.init();
		});//when done
		setContentView();
	};
	let setContentView = ()=>{
		
		
	};
	return {init : init, onCreate : onCreate};
	
})();

app.$ = {
	init : (x)=>{
		$.getScript(x+'/resources/js/router.js',()=>{
			$.extend(new Session(x));
			app.onCreate();
		});
	}
}