//拖拉
SamsungWeb.extend({
     HDrag:function(options,fn){
      var target=this;
      var defaultVal={
			"$box":"box",
			"$bg":"bg",
			"$bgcolor":"bgcolor",
			"$btn":"bt",
			"$text":"text",
            "$textval":0,
			"leftnum":0,
			"value":0,
			"maxnum":100
	  }
     	
      var obj=SamsungWeb.extend(defaultVal,options);
      obj.$box=$('#'+obj.$box);
	  obj.$bg=$('#'+obj.$bg);
	  obj.$bgcolor=$("#"+obj.$bgcolor);
	  obj.$btn=$("#"+obj.$btn);
	  obj.$text=$("#"+obj.$text);

	  
	  obj.statu = false;
	  obj.ox = 0;
	  obj.lx = 0;
	  obj.left =-obj.$btn.width()/2;
	  obj.bgleft = 0;
	  obj.ww=obj.$box.width()-obj.$btn.width()/2;
	  //console.log(obj.ww)
	  obj.fn=fn||function(){};
      
      obj.w=obj.ww/obj.maxnum;
     // console.log(obj.w)
      function init(){
	   	//console.log(obj.$text1)
	   	obj.$text.css('left',Math.ceil(obj.$textval*obj.w)+'px')
	    obj.$btn.css('left',obj.left);
	    obj.$bgcolor.width(obj.left);
	    obj.$text.html(parseInt(obj.left/obj.w)<0?0:parseInt(obj.left/obj.w));
	    obj.$btn.on("mousedown touchstart",mousedownfun);
	  }
	    
	   
	   
	   function mousedownfun(e){
       	  !+"\v1"? document.selection.empty() : window.getSelection().removeAllRanges();
       	  var e=e||window.event;
       	  
       	  obj.lx = obj.$btn.offset().left;
       	  if(e.type == 'touchstart') {
       	  obj.ox = window.event.touches[0].pageX - obj.left;	
       	  }else{
	      obj.ox = e.clientX - obj.left;
	      }
	      obj.statu = true;
	      
	      $(document).on("mouseup touchend",mouseupfun);
	      obj.$box.on("mousemove touchmove",moveleftfun);
	      $(document).on("mousemove touchmove",clearMove); 
       }
       
       function clearMove(e){
       	 !+"\v1"? document.selection.empty() : window.getSelection().removeAllRanges();
       }
       
       function mouseupfun(e){
       	  $(document).off("mouseup touchend",mouseupfun);
	      obj.$box.off("mousemove touchmove",moveleftfun); 
	      $(document).off("mousemove touchmove",clearMove); 
       	  !+"\v1"? document.selection.empty() : window.getSelection().removeAllRanges();
       	  obj.statu=false;
       	  obj.value=parseInt(obj.left/obj.w)
       	  obj.fn(obj.value);
       }
       
	   function moveleftfun(e){
	   	  !+"\v1"? document.selection.empty() : window.getSelection().removeAllRanges();
	   	  var e=e||window.event;
	   	  if(obj.statu){
	   	  	  if(e.type == 'touchmove'){
	   	  	  e.preventDefault();
		      e.stopPropagation(); 
	   	  	  obj.left = window.event.touches[0].pageX - obj.ox;	
	   	  	  }else{
		      obj.left = e.clientX - obj.ox;
		     }
		     if(obj.left < 0){
		        obj.left = 0;
		     }
		     if(obj.left>= obj.ww){
		       obj.left=obj.ww;
		       
		       console.log(obj.left)
		     }
		     
		     obj.$btn.css('left',obj.left);
		     obj.$bgcolor.width(obj.left+obj.$btn.width()/2);
		     obj.$text.html(parseInt(obj.left/obj.w));
		    }
	   }
	   
	   init();
	   return target;
     }
})