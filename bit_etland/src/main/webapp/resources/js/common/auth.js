var auth = auth || {};
auth = (()=>{
	let r_ctn, l_ctn;
//	const err_msg = ''; const는 상수
	let init = ()=>{
		r_ctn = '#right_content';
		l_ctn = '#left_content ul.nav';
		onCreate();
	};
	let onCreate = ()=>{
		setContentView();
	};
	let setContentView =()=>{
		$.getScript($.js()+'/component/compo.js', ()=>{
			$(r_ctn).html(compo.cust_login_form());
			$('form button[type=submit]').click(e=>{
				e.preventDefault();	//이벤트 전파(버블링)를 중단한다. default된 css를 무효화
				login();
			});
			
			$(l_ctn).empty();
			$.each(auth_navi(), (i,j)=>{
				$('<li><a href="#">'+j.val+'</a></li>')
				.attr('name', j.name)
				.appendTo(l_ctn)
				.click(function(){
					let that = $(this).attr('name');
					//클릭 시 배경색으로 표시
					$(this).addClass('active');
					$(this).siblings().removeClass('active');
					alert(that+' 누름');
					
					switch(that){
					case 'login': 
						$(r_ctn).empty();
						$(compo.cust_login_form())
						.appendTo(r_ctn);
						$('form button[type=submit]').click(e=>{
							e.preventDefault();
							login();
						});
						break;
					case 'join': 
						$(r_ctn).empty();
						$(compo.cust_join_form())
						.appendTo(r_ctn);
						$('form button[type=submit]').click(e=>{
							alert('누름');
							e.preventDefault();
							join();
						});
						break;
					case 'access': 
						$(r_ctn).empty();
						$(compo.emp_access_form())
						.appendTo(r_ctn);
						$('#access_btn').click(e=>{
							e.preventDefault();
							access();
						});
						break;
					case 'regist': 
						$(r_ctn).empty();
						$(compo.emp_regist_form())
						.appendTo(r_ctn);
						break;
					};
					
				});
			});
			
			$('li[name=login]').addClass('active');
		})
		.fail(()=>{
			alert('componenet/compo.js를 찾지 못 했습니다.');
		});
		
	};
	//=============================================================component
	let auth_navi = ()=>{
		return [
			{name: 'login', val:'로그인'},
			{name: 'join', val:'회원가입'},
			{name: 'access', val:'사원접속'},
			{name: 'regist', val:'사원등록'}
			];
			
	};
	let login = ()=>{
		
			let data = {
					customerId: $('form input[name=uname]').val(),
					password: $('form input[name=psw]').val()
					};
			$.ajax({
				url: $.ctx()+'/customers/'+data.customerId,
				type: 'post',
				data: JSON.stringify(data),
				dataType: 'json',
				contentType: 'application/json',
				success: d=>{
					if(d.customerId != ''){
						alert('로그인 성공'+d.customerId);
						/*$(r_ctn).html(compo.cust_mypage(
								{name:d.customerName,
									id:d.customerId,
									city:d.city,
									address:d.address,
									postalCode:d.postalCode
								}));*/
						cust.init(d);
						
					}else{
						alert('로그인 실패');
					}
				},
				error: e=>{
					alert('에러');
				}
			});
		
	};
	let join = ()=>{
		let data = {
				customerId: $('form input[name=customerId]').val(),
	            customerName: $('form input[name=customerName]').val(), 
	            password: $('form input[name=password]').val(), 
	            ssn: $('form input[name=ssn]').val(),
	            phone: $('form input[name=phone]').val(),
	            city: $('form input[name=city]').val(),
	            address: $('form input[name=address]').val(),
	            postalCode: $('form input[name=postalCode]').val(),
	            photo: $('form input[name=photo]').val()
				};
		$.ajax({
			url: $.ctx()+'/customers',
			type: 'post',
			data: JSON.stringify(data),
			dataType: 'json',
			contentType: 'application/json',
			success: d=>{
				if(d.msg === 'success'){
					alert('회원가입 성공'+d.msg);
					$(r_ctn).html(compo.cust_login_form());
					$('form button[type=submit]').click(e=>{
						e.preventDefault();
						login();
					});
				}else{
					alert('회원가입 실패');
					$(r_ctn).html(compo.cust_join_form());
					$('form button[type=submit]').click(e=>{
						alert('누름');
						e.preventDefault();
						join();
					});
				}
			},
			error: e=>{
				alert('에러');
			}
		});
	};
	let register = ()=>{
		let data = {
				emploueeId: $('form input[name=emploueeId]').val(),
				name: $('form input[name=name]').val(), 
	        	manager: $('form input[name=manager]').val(),
	        	birthDate: $('form input[name=birthDate]').val(),
	        	photo: $('form input[name=photo]').val(),
	        	notes: $('form input[name=notes]').val()
				};
		$.ajax({
			url: $.ctx()+'/employees',
			type: 'post',
			data: JSON.stringify(data),
			dataType: 'json',
			contentType: 'application/json',
			success: d=>{
				if(d.msg === 'success'){
					alert('회원가입 성공'+d.msg);
					$(r_ctn).html(compo.cust_login_form());
					$('form button[type=submit]').click(e=>{
						e.preventDefault();
						login();
					});
				}else{
					alert('회원가입 실패');
					$(r_ctn).html(compo.cust_join_form());
					$('form button[type=submit]').click(e=>{
						alert('누름');
						e.preventDefault();
						join();
					});
				}
			},
			error: e=>{
				alert('에러');
			}
		});
	};
	let access = ()=>{
		let ok = confirm('사원 입니까?');
		if(ok){
			let emp_no = prompt('사원번호 입력하세요');
			$.getJSON($.ctx()+'/employees', d=>{
					if(emp_no === d.employeeId){
						alert('사원 인증');	
						// 이름 입력창을 그린다.
						$(r_ctn).empty();
						$(r_ctn).html(compo.emp_access_form());
						$('<label for="name"><b>name</b></label>'
						+'<input type="text" placeholder="Enter name" id="name" name="name" value="류지혁" required>').prependTo('form div#input_zone');
						$('form button[type=submit]').click(e=>{
							e.preventDefault();
							if($('#name').val() === d.name){
							cust.list();
							emp.init();
							}else{
								alert('사원번호가 일치하지 않습니다.1');
							}
						});
						
					}else{
						alert('사원번호가 일치하지 않습니다.2');
						// 사원 번호가 일치하지 않습니다.
					}
				});
		}else{
			alert('사원 전용 페이지 입니다.');
			// 사원 전용 페이지 입니다.
			// 되돌아가기 버튼이 보인다.
		}
	};
	
	
	let mypage = ()=>{};
	return {init : init};
})();