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
	let regi=()=>{
		$('#right_content').empty();
		$(compo.prod_regi())
		.appendTo('#right_content');
		$('#prd_post_btn').click(e=>{
			e.preventDefault();
			
			let freebies = [];
			$('.checks:checked').each(function(i) {
				freebies.push($(this).val());
			});
			let pname = $('#product_name').val();
			let price = $('#price').val();
			let unit = $('#unit').val();
			
			if($.fn.nullChecker([pname,price,unit])){
				alert('반칸을 입력해주세요.');
			}else{
				alert('반칸이 입력됨.');
			}
			
			let data = {categoryId:$('#category_id').val(),
					productName:$('#product_name').val(),
					price:$('#price').val(),
					unit:$('#unit').val(),
					supplierId:$('#supplier_id').val(),
					color:$('input[name=color]:checked').val(),
					freebies:freebies,
					comment:$('#comment').text()		
			};
			
			$.ajax({
				url:$.ctx()+'/phones',
				type:'post',
				data:JSON.stringify(data),
				dataType:'json',
				contentType:'application/json',
				success:d=>{
					alert('성공');
					regi();
				},
				error:e=>{
					alert('에러');
				}
			});/*ajax끝*/
		});
		$('#img_upload_frm').click(function(){
			let ok=(this.files[0].name.match(/jpg|gif|png|jpeg|i/))? true : false;
			if(ok){
				/*let fd = new FormData();
				fd.append('file', this.files[0]);*/
				$('#img_drag_frm').attr('action',$.ctx()+'/phones/files');
				$('#img_upload_frm').attr('action',$.ctx()+'/phones/files');
				$.ajax({
					url: $('#img_upload_frm').attr('action'),
					dataType: 'text',
					enctype: "multipart/form-data",
					beforeSubmit: function(){
						alert('로딩');
					},
					/*type: 'POST',
					data: fd,
					async: false,
					cache: false,
					contentType: false,
					processData: false,*/
					success: d=>{
						alert('업로드 성공');
					}
					/*error: e=>{
						alert('업로드 실패');
					}*/
				}).submit();
			}else{
				alert('gif, png, jpg, jpeg 파일만 업로드 할 수 있습니다.');
			}
		});
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
	return {init:init, get:get, regi:regi};
})();