var prod = prod||{};
prod = (()=>{
	let r_ctn;
	let init =()=>{
		r_ctn='#right_content';
		onCreate();
	};
	let onCreate =()=>{
		setContentView();
	};
	let setContentView =()=>{
		$(r_ctn).html(compo.carousel());
	};
	return {init:init};
})();