$(document).ready(function(){
  // 点击的动作
  $(document).on('click', '#form_profile .btn_edit', function() {
    var current = $(this);
    var vm = $(this).parent().parent();
    if (vm.hasClass('active')) {
      vm.removeClass('active');
      vm.find('.input_display').show();
      vm.find('input').hide();
      current.text('编辑');
      $('#submit_btn').hide();
    } else {
      // 关闭其它的行
      $('#form_profile .btn_edit').each(function(index, element) {
        $(element).text('编辑');
        $(element).parent().parent().removeClass('active');
        $(element).parent().parent().find('.input_display').show();
        $(element).parent().parent().find('input').hide();
      });
      vm.addClass('active');
      vm.find('.input_display').hide();
      vm.find('input').show();
      current.text('取消');
      $('#submit_btn').show();
    }
  });
  var options = {
		url: 'user_exe.php?action=change_profile',
		type: 'post',
		beforeSubmit: function(formData, jqForm, options) {

      var password = $('#input_new_password').val();
      if (password.trim() != $('#input_confirm_new_password').val()) {
        message_alert('error', '两次密码输入不符合', '');
        return false;
      } else {
        $('#submit_btn').attr('disabled', '');
  			$('#submit_btn').children().first().removeClass('fa-paper-plane').addClass('fa-spin fa-spinner');
  			return true;
      }
		},
		success: function(responseText, statusText){
			$('#submit_btn').removeAttr('disabled');
			$('#submit_btn').children().first().removeClass('fa-spin fa-spinner').addClass('fa-paper-plane');
			// alert(responseText);
			if(responseText.substring(0, 5) == 'Error'){
				message_alert('error', responseText, '');
			} else {
        bootbox.alert('更新成功。', function() {
          location.reload(true);
        });
			}
			return true;
		}
	};
	$('#form_profile').ajaxForm(options);
});