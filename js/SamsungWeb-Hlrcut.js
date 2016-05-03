SamsungWeb.extend({
	 Hlrcut:function(options){
	    var setobject=this;     
	    var defaultVal={
	    	"id":".centerdiv",
	    	"id1":".index_ul",
			"showindex":3,
			"dis":0,
			"len":0,
			"maxNum":500,
			"timeNum":3000,
			"lastHumanNav":0,
			"pageindex":0,
			"currentPage":0,
			"direction":"add",
			"isDir":true,
			"arrowFun":function(){},
			"arrfun":function(){}
	    }
	    
	    var obj=$S.extend(defaultVal,options);
	    //时间设置
	    var timers=new $S.Htimer(); 
	    function init(){
	    	setinit();
	    }
	    
	    function setinit(){
	      	    obj.isclick=true;
			    obj.currentindex=obj.showindex;
			    obj.dis=$(obj.id).width()/obj.showindex;
				//初始化
				$(obj.id+" li").width(obj.dis);
				obj.len=$(obj.id+" li").size();
				
				obj.pageindex=Math.ceil(obj.len/obj.currentindex);
				
				//console.log("pageindex",pageindex);
				//console.log("len",len)
				initPosition();
				createli();
				LorR();
				obj.arrfun(obj.currentPage);
				//createli();
	      }
	    
	    
	    function initPosition(){
	    	for(var i=0;i<obj.len;i++){
	    		//console.log(i)
				$(obj.id+" li").eq(i).css(
				"left",obj.dis*i+'px'
				)
			}
	    }
	    
	    
	    function createli(){
	      	var htmls;
	      	for(var i=0;i<obj.pageindex;i++){
	      	  	   htmls='<li><img src="images/heidian_14.png"></li>';
                   $(obj.id1).append(htmls);
	      	}
	      	  //$(obj.id1).hide();
	      	  
	      	$(obj.id1).addClass("onalpha0")
	      	  
	      	setTimeout(function(){
	      	  	 $(obj.id1).css("width",$(obj.id1+" li img").outerWidth(true)*obj.pageindex);
	      	     $(obj.id1+" li").css("width",100/obj.pageindex+'%');
	      	     $(obj.id1).removeClass("onalpha0")
	      	},100)
	    }
	    
	    
	    function LorR(){
		  if(obj.currentPage==obj.pageindex-1){
		  	  if(obj.arrowFun!=null){
		      if(typeof obj.arrowFun === 'function'){
				    obj.arrowFun("left");
				}
			  }
		  }else if(obj.currentPage==0){
		  	  if(obj.arrowFun!=null){
				if(typeof obj.arrowFun === 'function'){
				    obj.arrowFun("right");
				}
			  }
		  }else{
		  	    if(obj.arrowFun!=null){
				if(typeof obj.arrowFun === 'function'){
				    obj.arrowFun("all");
				}
				}
		  }
	    }
	    
	   setobject.btnClick=function(c){
	      if(obj.isclick){
	      obj.isclick=false;
	      obj.lastHumanNav = new Date().getTime();
		  timers.setLastTime(obj.lastHumanNav);
		  
		  var c=c;
		  if(!!c){
		  if(c>0){
		  	 isDir=true;
		  	 direction="add";
		  }else{
		  	 isDir=false;
		  	 direction="remove";
		  }
		  }

		  if(obj.currentPage>=obj.pageindex-1){
		  	  obj.isDir=false;
		  	  obj.direction="remove";
		  }else if(obj.currentPage<=0){
		  	  obj.isDir=true;
		  	  obj.direction="add";
		  }

	      if(obj.isDir){
	      	  obj.currentPage++
	      }else{
	      	  obj.currentPage--
	      }
	      
	      obj.arrfun(obj.currentPage);
	      LorR();

	  if(obj.direction=="add"){
	 
	  $(obj.id+" li").each(function(){
	  $(this).stop(true).animate({
	  left:(parseInt($(this).css("left"))-obj.currentindex*obj.dis)+"px"},500,function(){
      obj.isclick=true;
      })
	  })
      }else{
	  $(obj.id+" li").each(function(){
	  $(this).stop(true).animate({
	    left:(parseInt($(this).css("left"))+obj.currentindex*obj.dis)+"px"
	  },500,function(){
        obj.isclick=true;
      }
      )
	  })
	  }
      }  	
	  }
	     
	  setobject.setInter=function(){  
		 obj.lastHumanNav = new Date().getTime();
		 timers.setLastTime(obj.lastHumanNav);
		 timers.SetInter(obj.timeNum);
	   }
		 
		 
		 //侦听动画播放完毕
		 timers.addListener(function(){
		  	autoPlay();
	 	    //关闭侦听器
	 	   //stime.removeListener();
	     })
		 
		 //暂停
		 setobject.clearInter=function(){
		 	   timers.StopInter();
		 }
		 
		 
		 //自动播放代码
		 function autoPlay(){
		 	  setobject.btnClick();
			  obj.lastHumanNav = new Date().getTime();
		 	  timers.setLastTime(obj.lastHumanNav);
		 }
		 
		 init();
	     return setobject;
	 }
})