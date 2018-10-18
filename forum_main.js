$(document).ready(function(){
	//setTimeout(function(){window.scrollTo(0, 0);}, 200);

	$('.summernote').summernote({
		callbacks: {
        onPaste: function (e) {
            var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');

            e.preventDefault();

            // Firefox fix
            setTimeout(function () {
                document.execCommand('insertText', false, bufferText);
            }, 10);
        }
    },
    height: 400,
    lang: 'zh-CN',
    tabsize: 1,
    prettifyHtml:false,
		fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],
    toolbar: [
      // [groupName, [list of button]]
      ['highlight', ['highlight']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['fontname', 'superscript', 'subscript']],
      ['fontsize', ['fontsize']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['height', ['height']],
      ['insert', ['link', 'picture']],
			["view", ["fullscreen"]]
    ]
  });


	// 收藏标签
	$(document).on('click', '#like_tag', function(){
		var current = $(this);
		current.children().removeClass('animated rotateIn');
		var tagid = current.attr('tagid');
		var method = current.attr('method');
		if (method == 'like') {
			current.html('<i class="fa fa-star yellow"></i>');
			current.attr('data-tootik', '点击以取消收藏').attr('method', 'unlike');
		}
		else if (method == 'unlike') {
			current.html('<i class="fa fa-star-o yellow"></i>');
			current.attr('data-tootik', '点击以收藏标签').attr('method', 'like');
		}
		$.ajax({
			method: "POST",
			url: "public_forum_exe.php?action=like_tag",
			data: {tagid: tagid, method: method},
			success: function(responseText){
				//$("#courses_main_row_left_div").html(responseText);
				//alert(responseText);
			}
		});
		current.children().addClass('animated rotateIn');
	});



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


	// 发帖时的标签操作
	$(document).on('click', '.main_tag_radio', function(){
    $('.sub_tag_div').attr('hidden', '');
    $('#sub_tag_title').removeAttr('hidden');
		$('.main_tag_radio').each(function(index, element){
			if($(element).is(':checked')){
        $('.sub_tag_div').each(function(index, element2){
    			if ($(element2).attr('pid') == $(element).val()) {
            $(element2).removeAttr('hidden');
          }
    		});
			}
		});
	});

	$(document).on('click', '.tag_checkbox', function(){
		var current = $(this);
		var index_number = 0;
		$('.tag_checkbox').each(function(index, element){
			if ($(element).is(':checked')) {
				index_number = parseInt(index_number) + 1;
				if (index_number > 4) {
					message_alert('error', '每篇问题至多可选择五个标签。', '');
					current.prop('checked', false);
				}
			}
		});
	});



	// 发表新帖
	var options_new_post = {
		url: 'public_forum_exe.php?action=new_post',
		type: 'post',
		beforeSubmit: function(formData, jqForm, options) {
			$('#submit_btn').attr('disabled', '');
			$('#submit_btn').children().first().removeClass('fa-paper-plane').addClass('fa-spin fa-spinner');
			return true;
		},
		success: function(responseText, statusText){
			$('#submit_btn').removeAttr('disabled');
			$('#submit_btn').children().first().removeClass('fa-spin fa-spinner').addClass('fa-paper-plane');
			// alert(responseText);
			if(responseText.substring(0, 5) == 'Error'){
				alert(responseText);
			} else {
				//location.reload(true);
				window.location = 'forum_main.php';
			}
			return true;
		}
	};
	$('#form_new_post').ajaxForm(options_new_post);

})