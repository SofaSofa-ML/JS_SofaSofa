document.writeln("<div class=\'modal fade\' id=\'logoutModal\'> <div class=\'modal-dialog\' role=\'document\'>");
document.writeln("		<div class=\'modal-content\'>	<div class=\'modal-header\'>		<button type=\'button\' class=\'close\' data-dismiss=\'modal\' aria-label=\'Close\'>	  <span aria-hidden=\'true\'>&times;</span>");
document.writeln("				  <span class=\'sr-only\'>Close</span>		</button>");
document.writeln("			<span style=\'font-size:20px\' class=\'modal-title\'><i class=\'fa fa-question-circle-o\' aria-hidden=\'true\'></i>&nbsp; 确认</span>     </div>   <div class=\'modal-body\'>");
document.writeln("				<p>您确认要退出登录么？</p>");
document.writeln("		    </div>    <div class=\'modal-footer\'>");
document.writeln("				<button type=\'button\' class=\'btn btn-danger\' id=\'confirm_logout\'>登出</button>");
document.writeln("				<button type=\'button\' class=\'btn btn-secondary\' data-dismiss=\'modal\'>取消</button>    </div> 	</div>   </div> </div> <div class=\'modal fade\' id=\'site_nav_Modal\'> <div class=\'modal-dialog\' role=\'document\'>	<div class=\'modal-content\'>  	<div class=\'modal-header\'>		<button type=\'button\' class=\'close\' data-dismiss=\'modal\' aria-label=\'Close\'>");
document.writeln("				  <span aria-hidden=\'true\'>&times;</span>");
document.writeln("				  <span class=\'sr-only\'>Close</span>");
document.writeln("				</button>");
document.writeln("			<span style=\'font-size:20px\' class=\'modal-title\'><i class=\'fa fa-question-circle-o\' aria-hidden=\'true\'></i>&nbsp; 确认</span>");
document.writeln("		    </div>");
document.writeln("		    <div class=\'modal-body\'>");
document.writeln("				<p>您确认要退出登录么？</p>");
document.writeln("		    </div>");
document.writeln("		    <div class=\'modal-footer\'>			<button type=\'button\' class=\'btn btn-danger\' id=\'confirm_logout\'>登出</button>");
document.writeln("				<button type=\'button\' class=\'btn btn-secondary\' data-dismiss=\'modal\'>取消</button>    </div>	</div>  </div></div><div class=\'modal fade\' id=\'nav_site_mobile\'> <div class=\'modal-dialog\' role=\'document\'>");
document.writeln("        <div class=\'modal-content\'>	<div class=\'modal-body\'>     <div style=\'width: 50%; display: block; margin-left:auto; margin-right: auto;\'>");
document.writeln("                	<span style=\'font-size: 13px\'>请带我飞去:</span><br><br>");
document.writeln("                	<a href=\'index.php\' class=\'mob-txt\' style=\'color:#00B068;\'><b>问答</b></a>");
document.writeln("       				<br><br>");
document.writeln("        			<a href=\'competitions.php\' class=\'mob-txt\' style=\'color:#20BEFF;\'><b>数据竞赛</b></a>");
document.writeln("        			<br><br>");
document.writeln("        			<a href=\'tutorials.php\' class=\'mob-txt\' style=\'color:#F46A41;\'><b>教程</b></a>");
document.writeln("        			<br><br> 			<a href=\'interviews.php\' class=\'mob-txt\' style=\'color:#bab084\'><b>面试</b></a>			<br>   </div></div><div class=\'modal-footer\'>          <button type=\'button\' class=\'btn btn-theme\' data-dismiss=\'modal\'><span style=\'font-size: 13px\'>回去啦( ͡° ͜ʖ ͡°)</span></button>");
document.writeln("            </div></div></div></div>");
$(document).on('click', '.btn_nav_site_mobile', function(){
        $('#nav_site_mobile').modal();
    });