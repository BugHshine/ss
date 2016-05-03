//普通滚动条拖拉类
SamsungWeb.HDrag=SamsungWeb.Class.extend({
	  init:function(options,fn){
	  var defaultVal={
			"$box":"#box",
			"$bg":"#bg",
			"$btn":"#bt",
			"leftnum":0,
			"value":0,
			"maxnum":100,
			'initleft':0,
			'inittop':0,
			'lockx':true,
			'locky':true
	  }
      this.obj=SamsungWeb.extend(defaultVal,options);
      this.obj.fn=fn||function(){};
      
      this.obj.$box=$(this.obj.$box);
	    this.obj.$btn=$(this.obj.$btn);
	  },
	  initValue:function(){
        //按下
	    this.obj.statu=false;
	    //初始化ox oy位置
	    this.obj.ox = 0;
	    this.obj.oy = 0;
	    
	    this.obj.per={
	    	
	    }
	    
	    //滚动块的LEFT位置
	    this.obj.left=this.obj.initleft;
	    
	    //滑动块的Top位置
	    this.obj.top=this.obj.inittop;
	    
	    
	    
	    //保存偏移量
	    this.obj.lx=this.obj.initleft;
	    this.obj.ly=this.obj.inittop;
	    
	    
	    //滑块底部的宽度
	    this.obj.ww=this.obj.$box.width()-this.obj.left*2;
	    
	    //滑块底部的高度
	    this.obj.hh=this.obj.$box.height()-this.obj.top*2;
	    
	    //console.log(this.obj.$box.width(),this.obj.left*2,this.obj.ww)
	    
	    //滑块底宽度部分成百分比 默认是100
	    this.obj.perw=(this.obj.ww-this.obj.$btn.width()-this.obj.lx)/this.obj.maxnum;
	    
	    
	    //滑块底高度部分成百分比 默认是100
	    this.obj.perh=(this.obj.hh-this.obj.$btn.height()-this.obj.ly)/this.obj.maxnum;
	    
	    
	    if(this.obj.lockx){
	    this.obj.$btn.css('left',this.obj.left);
	    }
	    
	    if(this.obj.locky){
	    this.obj.$btn.css('top',this.obj.top);
	    }
	    //console.log(this.obj.top)
	    this.addEvent();
	  },
	  addEvent:function(){
	    this.obj.$btn.on("mousedown touchstart",this.mousedownhandler.bind(this));
	    //console.log(this.obj.$btn);
	  },
	  mousedownhandler:function(e){
	  	 !+"\v1"? document.selection.empty() : window.getSelection().removeAllRanges();
	  	 var e=e||window.event;

	  	 if(e.type == 'touchstart'){
     	  this.obj.ox = window.event.touches[0].pageX - this.obj.left;
     	  this.obj.oy =window.event.touches[0].pageY-this.obj.top;
     	  }else{
	      this.obj.ox = e.clientX - this.obj.left;
	      this.obj.oy=e.clientY-this.obj.top;
	      }
	      this.obj.statu = true;
	  	  
	  	  $(document).on("mouseup touchend",this.mouseupfun.bind(this));
	      this.obj.$box.on("mousemove touchmove",this.moveleftfun.bind(this));
	      $(document).on("mousemove touchmove",this.clearMove); 
	  },
	  moveleftfun:function(e){
	  	   !+"\v1"? document.selection.empty() : window.getSelection().removeAllRanges();
	  	   e.preventDefault();
		     e.stopPropagation(); 
	  	   var e=e||window.event;
	  	   if(this.obj.statu){
	   	  	  if(e.type == 'touchmove'){
	   	  	  this.obj.left =window.event.touches[0].pageX - this.obj.ox;
	   	  	  this.obj.top =window.event.touches[0].pageY-this.obj.oy;
	   	  	  }else{
		        this.obj.left = e.clientX - this.obj.ox;
		        this.obj.top=e.clientY-this.obj.oy;
		     }
		     if(this.obj.left < this.obj.lx){
		        this.obj.left = this.obj.lx;
		     }
		     if(this.obj.left+this.obj.$btn.width()>= this.obj.ww){
		        this.obj.left=this.obj.ww-this.obj.$btn.width();
		     }
		      
		     if(this.obj.top < this.obj.ly){
		        this.obj.top = this.obj.ly;
		     }
		     
		     if(this.obj.top+this.obj.$btn.height()>= this.obj.hh){
		        this.obj.top=this.obj.hh-this.obj.$btn.height();
		     } 
		      
		      if(this.obj.lockx){
		      this.obj.$btn.css('left',this.obj.left);
		      }
		      
		      if(this.obj.locky){
		      this.obj.$btn.css('top',this.obj.top);
		      }
		      
		    this.obj.per.valuePerw=parseInt((this.obj.left-this.obj.lx)/this.obj.perw);
     	  this.obj.per.valuePerh=parseInt((this.obj.top-this.obj.ly)/this.obj.perh);
     	  
     	  this.obj.fn(this.obj.per);
	  }
	  },
	  clearMove:function(e){
	  	   !+"\v1"? document.selection.empty():window.getSelection().removeAllRanges();
	  },   
	  mouseupfun:function(e){
	  	  $(document).off("mouseup touchend",this.mouseupfun);
	      this.obj.$box.off("mousemove touchmove",this.moveleftfun); 
	      $(document).off("mousemove touchmove",this.clearMove); 
    	  !+"\v1"? document.selection.empty() : window.getSelection().removeAllRanges();
     	  this.obj.statu=false;

     	  this.obj.per.valuePerw=parseInt((this.obj.left-this.obj.lx)/this.obj.perw);
     	  this.obj.per.valuePerh=parseInt((this.obj.top-this.obj.ly)/this.obj.perh);
     	  
     	  this.obj.fn(this.obj.per);
	  },
	  getObj:function(){
	  	 return this.obj;
	  }
})
