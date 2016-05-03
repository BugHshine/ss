//SamsungWeb 专用于常用网站JS效果模块的总结，提供快速，灵活，复用初步结合JQUERY。分工具类和效果类  author:lihui
SamsungWeb.UpFloat=function(el,upnum,lefnum,bool,timemax){
	this.el=el;
	this.upnum=upnum||0;
	this.lefnum=lefnum||0;
	this.bool=bool||false;
	this.timemax=timemax||1500;
	this.currentTop=parseInt($(this.el).css("marginTop").replace("px",""));
	this.currentLeft=parseInt($(this.el).css("marginLeft").replace("px",""));
}

SamsungWeb.UpFloat.prototype.upFloatMove=function(){
	 var self=this;
	 //当前的marginTop大于0就下沉反之上升
	 var change=parseInt($(this.el).css("marginTop").replace("px",""))+1;
     if(change>self.currentTop){
      $(this.el).animate ({marginTop:self.currentTop-self.upnum+'px'}, {duration:self.timemax, easing:'easeInOutQuad',complete:function(){self.upFloatMove()}});
      }
      else{
      $(this.el).animate ({marginTop:self.currentTop+self.upnum+'px'}, {duration:self.timemax, easing:'easeInOutQuad', complete:function(){self.upFloatMove()}});
      }
}


SamsungWeb.UpFloat.prototype.LeftFloatMove=function(){
	  var self=this;
	  var change=parseInt($(this.el).css("marginLeft").replace("px",""))+1;
      if(change>self.currentLeft){
      $(this.el).animate ({marginLeft:self.currentLeft-self.lefnum+'px'}, {duration:self.timemax, easing:'easeInOutQuad',complete:function(){self.LeftFloatMove()}});
      }
      else{
      $(this.el).animate ({marginLeft:self.currentLeft+self.lefnum+'px'}, {duration:self.timemax, easing:'easeInOutQuad', complete:function(){self.LeftFloatMove()}});
      }
}