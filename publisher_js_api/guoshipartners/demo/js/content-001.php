<?php

// Begin the session
session_start();

$guid = date('YmdHis', time());

if( $_SESSION['guid'] )
	$guid = $_SESSION['guid'];
else
	$_SESSION['guid'] = $guid;

?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<META NAME="author" CONTENT="kant Lin" />
		<META NAME="copyright" CONTENT="Only For GuoShi &amp; YAM Designed by Kant Lin 2010"/>
		<meta name="Keywords" content=""/>
		<meta name="Description" content=""/>
		<!-- <script type="text/javascript" src="js/jquery-1.4.4.js"></script> -->
		<title>果實夥伴 - Manager Today Demo</title>

		<!-- Lightbox start (Edited by guoshi Kant)-->
		  
		<!--<script type="text/javascript">
			if (typeof jQuery == "undefined") {
				document.write('<scr' + 'ipt src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></scr' + 'ipt>');
			}
		</script> -->
		  
			<script type="text/javascript" src="http://ad-specs.guoshipartners.com/static/js/lightbox.js"></script> 

		<!-- Lightbox end (Edited by guoshi Kant)-->


		<!-- <script type="text/javascript" src="jquery.js"></script> -->		
		<!-- <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script> -->
		
		
		<script type="text/javascript">			
			/*$(document).ready(function(){
			  $("button").bind("click",function(){
				$("p").slideToggle();
			  });
			});*/
		</script>	
		
		
		
		

	
		
<!-- ONEAD -->
<!-- isip_functions.js -->
<script type="text/javascript" src="isip_function.js"></script>

<script type="text/javascript">	
// InPage needs the jquery
(function() {
	var js = document.createElement('script');
	js.async = true;
	js.type = 'text/javascript';
	var useSSL = 'https:' == document.location.protocol;
	js.src = (useSSL ? 'https:' : 'http:') + 
	'//ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
	var node = document.getElementsByTagName('script')[0];
	node.parentNode.insertBefore(js, node);
})();	
</script>

<script type="text/javascript">	
	var ONEAD = {};
	ONEAD.channel =  0; // just reversed.	
	ONEAD.volume =  0.5; // range is 0 to 1 (float)	
	ONEAD.slot_limit = {width: 950, height: 390};
	// optional(s)
	// ONEAD.response_freq = {start:2, step: 3};
	ONEAD.response_freq = -1; // everytime
	// ONEAD.category = "";
	// ONEAD.wmode = "";
</script>

<script type="text/javascript">
// For OneAD, DON'T MODIFY the following
if (ONEAD){
	ONEAD.uid = "1000022";	
	ONEAD.external_url = "http://jimmy.onead.com/gsweb/"; // base_url, post-slash is necessary
	// ONEAD.external_url = "http://demo.onead.com.tw/"; // base_url, post-slash is necessary
	ONEAD.wrapper = 'ONEAD_player_wrapper';	
}

if (typeof window.isip_js == "undefined") {
	// // var src = 'http://ad-specs.guoshipartners.com/demo/js/isip.js';	
	var src = 'isip.js';
	document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
}
</script>

<script type="text/javascript">
	// ONEAD, this is tempate if you want to overwrite
	/*
	ONEAD_get_response = function(param){
		if (param.embed_string){
			// show ads
		}	
	}
	*/
	// 這個函式名稱是固定的，廣告播放完畢會呼叫之
	function changeADState(obj){			
		if (typeof jQuery != 'undefined'){
			// following is necessary for Firefox (its bug), DON'T remove it
			ONEAD_setfocus();
			
			if (obj.newstate == 'COMPLETED' || obj.newstate == 'DELETED' ){			
				if (typeof jQuery == 'function'){
					jQuery('#' + ONEAD.wrapper).empty().slideUp('slow', function(){});
				}		
			}
		}
	}
	
	$(document).ready(function(){
		// console.log('onead');
		/*
		jQuery('a[href=#onead]').text("_");
		jQuery('a[href=#onead]').focus();
		jQuery('a[href=#onead]').text("");
		*/
	});
		
</script>
<!-- ONEAD -->






		

	</head>
	
	<BODY TOPMARGIN="0" LEFTMARGIN="0" MARGINWIDTH="0" MARGINHEIGHT="0">
	
	<div align="center">
	  <TABLE BORDER="0" CELLPADDING="0" CELLSPACING="0">
	    <TR>
	      <TD COLSPAN="11"><IMG SRC="images/content-003_1.jpg" WIDTH="984" BORDER="0" HEIGHT="155"/></TD>
        </TR>
	    <TR>
	      <TD COLSPAN="11">
			<IMG SRC="images/content-003_2.jpg" WIDTH="984" BORDER="0" HEIGHT="auto"/>
			
				
<!-- Thu, 10 Nov 2011 11:20:39, http://demo.onead.com.tw --> 
<!-- 
<object height="360pix" width="640pix" id="FlashMediaPlayer" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"> <param value="always" name="allowScriptAccess"> <param value="true" name="allowFullScreen"> <param value="high" name="quality"> <param value="#000000" name="bgcolor"> <param value="window" name="wmode"> <param value="xmlURL=http%3A%2F%2Fdemo.onead.com.tw%2Fov_player%2Fxml%2Flink%2F1374%2Fl.xml&" name="flashvars"> <param value="http://demo-media.cdn.hinet.net/sites/default/files/DF.swf" name="movie"> <embed height="360pix" wmode="window" width="640pix" pluginspage="http://www.adobe.com/go/getflashplayer" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" name="FlashMediaPlayer" bgcolor="#000000" quality="high" flashvars="xmlURL=http%3A%2F%2Fdemo.onead.com.tw%2Fov_player%2Fxml%2Flink%2F1374%2Fl.xml&" src="http://demo-media.cdn.hinet.net/sites/default/files/DF.swf"> </object>
-->


				
				<script type="text/javascript">
					ONEAD_slot();
					// document.write('<center><a href="#onead"></a><div style="width:' + ONEAD.slot_limit.width + '"><div id="' + ONEAD.wrapper + '" style="text-align: center; margin-left: auto; margin-right: auto;"></div></div></center>'); 
				</script>						


				
							
				<!-- <P align="center"><button>略過廣告!</button></p> -->
		  </TD>
        </TR>
	    <TR>
	      <TD COLSPAN="11"><IMG SRC="images/content-003_3.jpg" WIDTH="984" BORDER="0" HEIGHT="58"></TD>
        </TR>
	    <TR>
	      <TD COLSPAN="8"><IMG SRC="images/content-003_4.jpg" WIDTH="798" BORDER="0" HEIGHT="599"></TD>
	      <TD COLSPAN="2"><IMG SRC="images/content-003_5.jpg" WIDTH="159" BORDER="0" HEIGHT="599"></TD>
	      <TD><IMG SRC="images/content-003_6.jpg" WIDTH="27" BORDER="0" HEIGHT="599"></TD>
        </TR>
	    <TR>
	      <TD COLSPAN="11"><IMG SRC="images/content-003_7.jpg" WIDTH="984" BORDER="0" HEIGHT="141"></TD>
        </TR>
	    <TR>
	      <TD><IMG SRC="images/content-003_8.jpg" WIDTH="32" BORDER="0" HEIGHT="90"></TD>
	      <TD><IMG SRC="images/content-003_9.jpg" WIDTH="220" BORDER="0" HEIGHT="90"></TD>
	      <TD><IMG SRC="images/content-003_10.gif" WIDTH="13" BORDER="0" HEIGHT="90"></TD>
	      <TD><IMG SRC="images/content-003_11.jpg" WIDTH="219" BORDER="0" HEIGHT="90"></TD>
	      <TD><IMG SRC="images/content-003_12.jpg" WIDTH="14" BORDER="0" HEIGHT="90"></TD>
	      <TD><IMG SRC="images/content-003_13.jpg" WIDTH="219" BORDER="0" HEIGHT="90"></TD>
	      <TD><IMG SRC="images/content-003_14.jpg" WIDTH="14" BORDER="0" HEIGHT="90"></TD>
	      <TD COLSPAN="2"><IMG SRC="images/content-003_15.jpg" WIDTH="219" BORDER="0" HEIGHT="90"></TD>
	      <TD COLSPAN="2"><IMG SRC="images/content-003_16.jpg" WIDTH="34" BORDER="0" HEIGHT="90"></TD>
        </TR>
	    <TR>
	      <TD COLSPAN="11"><IMG SRC="images/content-003_17.jpg" WIDTH="984" BORDER="0" HEIGHT="83"></TD>
        </TR>
	    <TR>
	      <TD><IMG SRC="images/space.gif" WIDTH="32" BORDER="0" HEIGHT="1"></TD>
	      <TD><IMG SRC="images/space.gif" WIDTH="220" BORDER="0" HEIGHT="1"></TD>
	      <TD><IMG SRC="images/space.gif" WIDTH="13" BORDER="0" HEIGHT="1"></TD>
	      <TD><IMG SRC="images/space.gif" WIDTH="219" BORDER="0" HEIGHT="1"></TD>
	      <TD><IMG SRC="images/space.gif" WIDTH="14" BORDER="0" HEIGHT="1"></TD>
	      <TD><IMG SRC="images/space.gif" WIDTH="219" BORDER="0" HEIGHT="1"></TD>
	      <TD><IMG SRC="images/space.gif" WIDTH="14" BORDER="0" HEIGHT="1"></TD>
	      <TD><IMG SRC="images/space.gif" WIDTH="67" BORDER="0" HEIGHT="1"></TD>
	      <TD><IMG SRC="images/space.gif" WIDTH="152" BORDER="0" HEIGHT="1"></TD>
	      <TD><IMG SRC="images/space.gif" WIDTH="7" BORDER="0" HEIGHT="1"></TD>
	      <TD><IMG SRC="images/space.gif" WIDTH="27" BORDER="0" HEIGHT="1"></TD>
  </TR>
  </TABLE>
    </div>
	
	
	<div id="footer">
<p>本網站上的任何部份均不得以任何形式進行複製、再發佈或利用</p>
<p>瀏覽本頁面及本網站其他頁面的任何訊息，均視為您已同意遵守本網站的隱私條款和服務使用協議</p>
<p>聯絡我們：<a href="mailto://">mailto</a>&nbsp;&nbsp;&nbsp;&nbsp;建議使用 <b><a href="http://www.mozilla.com/" target="_blank">Firefox</a></b> 或 <b><a href="http://www.google.com/chrome/" target="_blank">Google Chrome</a></b> 瀏覽器觀看</p>
</div>
	
	
</BODY>
</HTML>
