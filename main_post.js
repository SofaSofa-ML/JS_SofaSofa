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

	$(document).on('mouseenter', '.vote_btn', function(){
    $(this)
      .children()
        .addClass('dark_yellow')
      .parent()
      .parent()
        .addClass('active')
      .children()
        .addClass('active');
	});
	$(document).on('mouseleave', '.vote_btn', function(){
    $(this)
      .children()
        .removeClass('dark_yellow')
      .parent()
      .parent()
        .removeClass('active')
      .children()
        .removeClass('active');
	});

	// 平滑滚动
	$('a[href^="#"]').on('click', function(event) {
		var target = $( $(this).attr('href') );
		if( target.length ) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: target.offset().top - 130
			}, 500);
		}
	});

	// 点赞
	$(document).on('click', '.vote_btn', function(){
		var current = $(this);
		var postid = $(this).attr('post_id');
		var method = $(this).attr('method');
		var icon = $(this).children(':first');
		$.ajax({
			method: "POST",
			url: "public_forum_exe.php?action=agree",
			data: {postid: postid, method: method},
			success: function(responseText){
				if (responseText == 'login') {
					$('#myModal_login').modal();
				}
				else if(responseText.substring(0, 5) == 'Error') {
					alert(responseText);
				}
				else {
					var agree_number = parseInt(current.parent().find('div').text());
					if(icon.hasClass('fa-sort-desc')) {
						icon.addClass('green animated tada');
						current.parent().find('div').text(parseInt(agree_number - 1));
					}
					if(icon.hasClass('fa-sort-asc')) {
						icon.addClass('green animated tada');
						current.parent().find('div').text(parseInt(agree_number + 1));
					}
				}
				return true;
			}
		});
	});



	// 修改帖子时的标签操作
	$(document).on('click', '.main_tag_radio', function(){
		$('.main_tag_radio').each(function(index, element){
			if($(element).is(':checked')){
				$(element).parent().next().removeAttr('hidden');
			} else {
				$(element).parent().next().attr('hidden', '');
			}
		});
	});

	$(document).on('click', '.edit_post_tag', function(){
		var current = $(this);
		var index_number = 0;
		$('.edit_post_tag').each(function(index, element){
			if ($(element).is(':checked')) {
				index_number = parseInt(index_number) + 1;
				if (index_number > 5) {
					message_alert('error', '每篇帖子至多可选择五个标签。', '');
					current.prop('checked', false);
				}
			}
		});
	});




	// 收藏帖子
	$(document).on('click', '.btn_favourite', function(){
		var current = $(this);
		current.removeClass('animated flash');
		var postid = $(this).attr('postid');
		var method = $(this).attr('method');
		$.ajax({
			method: "POST",
			url: "public_forum_exe.php?action=favourite",
			data: {postid: postid, method: method},
			success: function(responseText){
				if (responseText == 'login') {
					$('#myModal_login').modal();
				}
				else {
					//alert(responseText);
					current.addClass('animated flash');
					if (method == 'add') {
						current.attr('method', 'cancel');
						current.children(":first").removeClass('fa-star-o').addClass('fa-star');
					}
					if (method == 'cancel') {
						current.attr('method', 'add');
						current.children(':first').removeClass('fa-star').addClass('fa-star-o');
					}
					$('#favourite_number').html(responseText);
				}
				return true;
			}
		});
	});





	// 发表主回复
	var options_main_reply = {
		url: 'public_forum_exe.php?action=main_reply',
		type: 'post',
		beforeSubmit: function(formData, jqForm, options) {
			$('#main_reply_submit_btn').attr('disabled', '');
			$('#main_reply_submit_btn').children().first().removeClass('fa-paper-plane').addClass('fa-spin fa-spinner');
			return true;
		},
		success: function(responseText, statusText){
			$('#main_reply_submit_btn').removeAttr('disabled');
			$('#main_reply_submit_btn').children().first().removeClass('fa-spin fa-spinner').addClass('fa-paper-plane');
			//alert(responseText);
			if(responseText.substring(0, 5) == 'Error'){
				alert(responseText);
			} else {
				location.reload(true);
			}
			return true;
		}
	};
	$('#form_main_reply').ajaxForm(options_main_reply);


	// 发表二级回复
	$(document).on('click', '.btn_second_reply', function(){
		var current = $(this);
		$('.textarea_second_reply, #btn_confirm_sencond_reply').remove();
		$(this).after('<textarea class="form-control textarea_second_reply m-t" style="max-width:650px;" id="textarea_second_reply"></textarea><button class="btn btn-sm btn-primary m-t" id="btn_confirm_sencond_reply"><i class="fa fa-paper-plane"></i> 添加评论</button>');
		$('#btn_confirm_sencond_reply').attr('pid', current.attr('pid')).attr('ancestor_id', current.attr('ancestor_id'));
		$('.textarea_second_reply').focus();
	});
	$(document).on('click', '#btn_confirm_sencond_reply', function(){
		var pid = $(this).attr('pid');
		var ancestor_id = $(this).attr('ancestor_id');
		var content = $('#textarea_second_reply').val();
		$('#btn_confirm_sencond_reply').children(":first").removeClass('fa-paper-plane').addClass('fa-spinner fa-spin');
		$.ajax({
			method: "POST",
			url: "public_forum_exe.php?action=second_reply",
			data: {pid: pid, ancestor_id: ancestor_id, content: content},
			success: function(responseText){
				$('#btn_confirm_sencond_reply').children(":first").removeClass('fa-spinner fa-spin').addClass('fa-paper-plane');
				//alert(responseText);
				if(responseText.substring(0, 5) == 'Error'){
					alert(responseText);
				} else {
					location.reload(true);
				}
			}
		});
	});



	// 删除帖子
	$(document).on('click', '.delete_btn', function(){
		$('#modalDeletePost').modal();
		var rowid = $(this).attr('rowid');

		if ($(this).attr('method') == 'second') {
			$('#modalDeletePostBody').html('您确认删除本回答吗？');
		} else if ($(this).attr('method') == 'first') {
			$('#modalDeletePostBody').html('您确认删除吗？所以子回复都会被删除');
		} else {
			$('#modalDeletePostBody').html('您确定要删除本问题么？所有相关回复也会被一并删除并且无法恢复。');
		}
		$('#btnConfirmDeletePost').attr('rowid', rowid);
	});


	$(document).on('click', '#btnConfirmDeletePost', function(){
		var rowid = $(this).attr('rowid');
		$('#btnConfirmDeletePost').children(":first").removeClass('fa-trash').addClass('fa-spinner fa-spin');
		$.ajax({
			method: "POST",
			url: "public_forum_exe.php?action=delete_post",
			data: {rowid: rowid},
			success: function(responseText){
				$('#btnConfirmDeletePost').children(":first").removeClass('fa-spinner fa-spin').addClass('fa-trash');
				// location.reload(true);
				window.location = 'index.php';
				//alert(responseText);
			}
		});
	});


	// 编辑帖子
	$(document).on('click', '.edit_btn', function(){
		var title_option = $(this).attr('title_option');
		var rowid = $(this).attr('rowid');
		$('#modalEditPost').modal({backdrop: 'static', keyboard: false});
		$('#btnConfirmEditPost').attr('rowid', rowid);
		$.ajax({
			method: "POST",
			url: "public_forum_exe.php?action=edit_post_get_content",
			data: {rowid: rowid, title_option: title_option},
			success: function(responseText){
				$('#modal_edit_post_content_div').html(responseText);
			}
		});
	});
	$(document).on('click', '#btnConfirmEditPost', function(){
		var rowid = $(this).attr('rowid');
		var title = $('#editPostTitle').val();
		var content = $('#editPostContent').val();
		var tags = '';
		$('.edit_post_tag').each(function(index, element){
			if ($(element).is(':checked')) {
				tags += $(element).val();
				tags += ',';
			}
		});
		$('#btnConfirmEditPost').children(":first").removeClass('fa-pencil-square').addClass('fa-spinner fa-spin');
		$.ajax({
			method: "POST",
			url: "public_forum_exe.php?action=edit_post",
			data: {rowid: rowid, title: title, content: content, tags: tags},
			success: function(responseText){
				$('#btnConfirmEditPost').children(":first").removeClass('fa-spinner fa-spin').addClass('fa-pencil-square');
				if(responseText.substring(0, 5) == 'Error'){
					alert(responseText);
				} else {
					location.reload(true);
				}
			}
		});
	});


})


$(document).ready(function(){

$('.qa_answer').hide(0);
$(document).on('click', '.qa_header', function(){
  $(this).parent().next().slideToggle(500);
});

});