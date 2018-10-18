$(document).ready(function(){
	//setTimeout(function(){window.scrollTo(0, 0);}, 200);

	// 加载更多
	$(document).on('click', '#btn_load_more', function(){
		var current = $(this);
		var start = current.attr('start');
		var filter = current.attr('filter');
		current.attr('disabled', '').children(':first').removeClass('fa-chevron-circle-down').addClass('fa-spin fa-spinner');
		$.ajax({
			method: "POST",
			url: "public_forum_exe.php?action=load_more",
			data: {start: start, filter: filter, type: 0},
			success: function(responseText){
				$("#forum_main_posts_container").append(responseText);
				$('#btn_load_more').attr('start', parseInt(parseInt(start) + 10));
				current.removeAttr('disabled')
					.children(':first')
					.removeClass('fa-spin fa-spinner')
					.addClass('fa-chevron-circle-down');
				if (responseText == '已显示全部相关问题。') {
					$('#btn_load_more').hide();
				}

        // 刷新帖子标题的数学符号
        //var math = document.getElementsByClassName("MathExample");
        //MathJax.Hub.Queue(["Typeset", MathJax.Hub, math[0]]);

				//alert(responseText);
			}
		});
	});
})