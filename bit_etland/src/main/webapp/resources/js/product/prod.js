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
	let post=()=>{
		$(compo.prod_regi())
		.appendTo('#right_content');
		
	};
	let get=(x)=>{
		$.getJSON($.ctx()+'/phones/page/'+x, d=>{
			$('#right_content').empty();
			alert('상품 리스트');
			
			$('<div class="grid-item" id="content_1">'
					+'<h2>상품 리스트</h2>'
					+'</div>'
				    +'<div class="grid-item" id="content_2">'
					+'<table class="table table-bordered" id="tab"><tr>'
					+'<th>NO.</th>'
					+'<th>이름</th>'
					+'<th>공급업체</th>'
					+'<th>카테고리</th>'
					+'<th>유닛</th>'
					+'<th>가격</th>'
					+'</tr></table>'
					+'</div>').appendTo('#right_content');
			
			$.each(d.list, (i,j)=>{
				$('<tr>'
					+'	<td>'+j.rownum+'</td>'
					+'	<td>'+j.productName+'</td>'
					+'	<td>'+j.supplierId+'</td>'
					+'	<td>'+j.categoryId+'</td>'
					+'	<td>'+j.unit+'</td>'
					+'	<td>'+j.price+'</td>'
					+'</tr>'
					).appendTo('#tab');
			});
			
			$('<div style="height: 50px"></div>').appendTo('#content_1');
			$('<div class="pagination"></div>').appendTo('#content_2');
			
			if(d.pxy.existPrev){
				$('<li><a>&laquo;</a></li>')
				.appendTo('.pagination')
				.click(()=>{
					get(d.pxy.prevBlock);
				});
			}
			let i=0;
			for(i=d.pxy.startPage;i<=d.pxy.endPage;i++){
				if(d.pxy.pageNum==i){
					$('<li><a class="page active">'+i+'</a></li>')
					.appendTo('.pagination')
					.click(function(){
						alert($(this).text());
						get($(this).text());
					});
				}else{
					$('<li><a class="page">'+i+'</a></li>')
					.appendTo('.pagination')
					.click(function(){
						alert($(this).text());
						get($(this).text());
					});
				}
			}
			if(d.pxy.existNext){
				$('<li><a>&raquo;</a></li>')
				.appendTo('.pagination')
				.click(()=>{
					get(d.pxy.nextBlock);
				});
			}
		});
	};
	let put=()=>{
		
	};
	let del=()=>{
		
	};
	return {init:init, get:get};
})();