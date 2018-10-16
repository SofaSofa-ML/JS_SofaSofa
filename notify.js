$(document).ready(function(){
    $(document).on('click', '.link_notification', function() {
        var curr = $(this);
        var rowid = curr.attr('rowid');
        var link = curr.attr('link');
        $.ajax({
            type: 'post',
            url: 'notifications.php?action=clicked',
            data: { rowid },
            success: function(res) {
                window.location = link;
                return true;
            }
        });
    });

		$(document).on('click', '#btn_read_all', function() {
        var curr = $(this);
				bootbox.confirm({
			    message: "您确定将所有消息标记为已读么？",
			    buttons: {
		        confirm: {
	            label: '标记为已读',
	            className: 'btn-danger'
		        },
		        cancel: {
	            label: '取消',
	            className: 'btn-secondary'
		        }
			    },
			    callback: function (result) {
		        if (result) {
							$.ajax({
			            type: 'post',
			            url: 'notifications.php?action=mark_all_as_read',
			            success: function(res) {
										location.reload(true);
									}
			        });
						}
			    }
				});
    });
});
