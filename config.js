// JavaScript Document
// JavaScript Document

function message_alert(type, msg, url) {

	if (type=='error'){

		bootbox.alert('<h2><i class="fa fa-exclamation-triangle" style="color:red;"></i> Error</h2><div class="jumbotron jumbotron_alert"><p class="m-b-0">'+msg+'</p></div>');

	} else if (type=='success'){

		bootbox.alert('<h2><i class="fa fa-check-square-o" style="color:green;"></i> Message</h2><div class="jumbotron jumbotron_alert p-a"><p class="m-a-0">'+msg+'</p></div>', function(){
			if (url != ''){
				window.location.replace(url);
			}
		} );

	} else if (type=='warning'){

		if (url != '') {
			bootbox.alert('<h2><i class="fa fa-exclamation-triangle" style="color:#EC971F;"></i> Warning</h2><div class="jumbotron jumbotron_alert"><p class="m-b-0">'+msg+'</p></div>', function(){
			window.location = url;
			});
		} else {
			bootbox.alert('<h2><i class="fa fa-exclamation-triangle" style="color:#EC971F;"></i> Warning</h2><div class="jumbotron jumbotron_alert"><p class="m-b-0">'+msg+'</p></div>');
		}

	}
}

$.fn.scrollView = function () {
    return this.each(function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top
        }, 500);
    });
}


function load_user_activity(userid, offset, type) {
  if (userid === undefined || parseInt(userid) == 0) {
    alert('Error: Invalid user ID.');
    return;
  }
  if (offset === undefined || parseInt(offset) == 0) {
    offset = 0;
  }
  if (type != 'both' && type != 'post' && type != 'reply') {
    type = 'both';
  }
  $.ajax({
    type: 'POST',
    url: 'user_exe.php?action=load_activity',
    data: { offset: offset, type: type, userid: userid },
    success: function(response) {
      // alert(response);
      $('.btn_load_activity').remove();
      $('#card_block_trends').append(response);
      // $('.btn_load_activity').removeAttr('disabled', '')
      //   .children(':first')
      //   .addClass('fa-eye')
      //   .removeClass('fa-spin fa-spinner');
    }
  });

};
