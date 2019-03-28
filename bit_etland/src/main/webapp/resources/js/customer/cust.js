var cust = cust || {}
cust = (()=>{
	let r_ctn;
	
	let init =(d)=>{
		r_ctn = '#right_content';
		onCreate(d);
	};
	let onCreate = (d)=>{
		setContentView(d);
	};
	let setContentView =(d)=>{
		$.getScript($.js()+'/component/compo.js', (d)=>{
			$(r_ctn).html(compo.cust_mypage(
			{name:d.customerName,
				id:d.customerId,
				city:d.city,
				address:d.address,
				postalCode:d.postalCode
			}));
		})
		.fail(()=>{});
	};
	let mypage = d=>{
		
		
	};
	return{init:init};

})();