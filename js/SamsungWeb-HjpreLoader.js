SamsungWeb.extend({
	   HjpreLoader:function(str,callback,step){
	   	    return new SamsungWeb.jpreLoader(str,callback,step)
	   	
	   },
	   jpreLoader:function(_str,callback,step){
	   	    var items=[],errors=[],onComplete=callback,onStep=step,str=_str,current=0;

	   	    function getImages(el){
			     $(el).find('*:not(script)').each(function(){
					var url = "";
					if ($(this).css('background-image').indexOf('none') == -1){
						url = $(this).css('background-image');
						if(url.indexOf('url') != -1){
							var temp = url.match(/url\((.*?)\)/);
							url = temp[1].replace(/\"/g, '');
						}
					} else if ($(this).get(0).nodeName.toLowerCase() == 'img' && typeof($(this).attr('src')) != 'undefined') {
						url = $(this).attr('src');
					}
					
					if (url.length > 0) {
						  items.push(url);
					}
				});
	   	    }
	   	    
	   	    function preloading(){
	   	    	 for(var i = 0;i<items.length;i++){
						loadImg(items[i]);
					}
	   	    }
	   	    
	   	    function loadImg(url){
	   	    	 var self=this;
				 var imgLoad = new Image();
				 $(imgLoad).load(function(){
					completeLoading();
				 })
				 .error(function() {
					errors.push($(this).attr('src'));
					completeLoading();
				 })
				 .attr('src', url); 
	   	    }
	   	    
	   	    function completeLoading(){
				current++;
				var per = Math.round((current / items.length) * 100);
				if(typeof onStep === 'function')
					onStep(per);
				if(current === items.length){
					current = items.length;
					loadComplete();
				}
	   	    }
	   	    
	   	    function loadComplete(){
	   	    	if(typeof onComplete === 'function');
			    onComplete();
	   	    }
	   	    
	   	    getImages(str);
			preloading();
	   }
})