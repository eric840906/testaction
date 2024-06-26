/* 
http://closure-compiler.appspot.com/home
2013/04/15	remove jquery dependency
*/
ONEAD_slide = function(slider, show, callback){

	if (!slider) return;

	var minheight = 0;
	var maxheight = parseInt(slider.style.height, 10);
	var time = 600;
	var timer = null;
	var toggled = !show;

	if (show){
		slider.style.height = minheight + 'px';			
		slider.style.display = 'block';
	}		

	clearInterval(timer);
	var instanceheight = parseInt(slider.style.height, 10);		
	var init = (new Date()).getTime();
	var height = (toggled = !toggled) ? maxheight : minheight; 
	// var height = maxheight;
	var disp = height - parseInt(slider.style.height, 10);

	timer = setInterval(function() {
	var instance = (new Date()).getTime() - init;
	if(instance < time ) {
		var pos = Math.floor(disp * instance / time);			
		result = instanceheight + pos;
		slider.style.height =  result + 'px';
		// document.getElementById('log').innerHTML = 'Current Height : <b>' + result + '</b><br /> Current Time : <b>' + instance + '</b>';
	}else {
		slider.style.height = height + 'px'; //safety side ^^
		clearInterval(timer);

		if (!show){
			slider.style.display = 'none';
		}

		if (typeof callback == 'function'){
			callback();
		}
	  // controler.value = toggled ? ' Slide Up ' :' Slide Down ';
	  // document.getElementById('log').innerHTML = 'Current Height : <b>' + height + '</b><br /> Current Time : <b>' + time + '</b>';
	}
  },1);
}

slideDown = function(div_id, width, height){

	// $('#ad_inpage iframe[width="1"]', window.parent.parent.document).css({"width": "972", "height": "413", "display": "none"}).slideDown("slow");

	var doc = window.parent.parent.document,
		tag_array = doc.getElementsByTagName("iframe"),
		element = false,
		i=0;
	// var div_id = 'ad_inpage';

	try{
		for (i=0, len=tag_array.length; i < len; i++) {
			if (tag_array[i].parentElement.id == div_id){
				if(tag_array[i].clientHeight == 1 && tag_array[i].clientWidth == 1){
					
					element = tag_array[i].parentElement;

					element.style.display = 'none';
					element.style.width = width + 'px';
					element.style.height = height + 'px';

					tag_array[i].style.width = '100%';
					tag_array[i].style.height = '100%';

					ONEAD_slide(element, true, function(){

					});

					break;
				}
			}
		}
	}catch(e){		
	}
}

slideUp = function(div_id){
	
	// $('#ad_inpage iframe[width="1"]', window.parent.parent.document).slideUp("slow");

	var doc = window.parent.parent.document,
		tag_array = doc.getElementsByTagName("iframe"),
		element = false,
		i=0;
	// var div_id = 'ad_inpage';

	try{
		for (i=0, len=tag_array.length; i < len; i++) {
			if (tag_array[i].parentElement.id == div_id){
				element = tag_array[i].parentElement;
				ONEAD_slide(element, false, function(){});
				break;
			}		    
		}
	}catch(e){		
	}
}

getArgs = function() {
	var args = new Object();
	var query = location.search.substring(1);
	var pairs = query.split("&");
	for(var i = 0; i < pairs.length; i++) {
	var pos = pairs[i].indexOf('=');
	if (pos == -1) continue;
	var argname = pairs[i].substring(0,pos);
	var value = pairs[i].substring(pos+1);
	args[argname] = unescape(value);
	}
	return args;
}

function exec(args){
		// console.debug("query_string:" + args.strHTML);				
		eval(args.strHTML);	
		// $("img", window.parent.parent.document).remove();		
		// $('img', window.parent.parent.document).remove();
}

(function() {	
	try{		
		var args = getArgs();
		exec(args);	
	}catch(e){
	}
})();	
