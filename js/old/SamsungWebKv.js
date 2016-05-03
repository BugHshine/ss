//SamsungWeb 专用于常用网站JS效果模块的总结，提供快速，灵活，复用初步结合JQUERY。分工具类和效果类  author:lihui

//kv动画接口
SamsungWeb.HanimateInferface=new SamsungWeb.Hinterface("SamsungWeb.HanimateInferface",["AnMoveKv"]);

//写个动画CLASS父类
SamsungWeb.FatherKvClass=function(id,id1,className1,calssName2,id1a){
	this.id=id;
	this.id1=id1;
	this.className1=className1;
	this.className2=calssName2;
	this.id1a=id1a;
}

SamsungWeb.FatherKvClass.prototype.changeKv=function(pre,next){
	$(this.id+" ul li:eq("+pre+")").removeClass(this.className1);
	$(this.id1+" "+this.id1a+":eq("+pre+")").removeClass(this.className2); 	
	$(this.id+" ul li:eq("+next+")").addClass(this.className1);
	$(this.id1+" "+this.id1a+":eq("+next+")").addClass(this.className2);
}

//动画完毕
SamsungWeb.FatherKvClass.prototype.AnminComplete=function(){
		
}

//透明动画 
SamsungWeb.alphaAn=function(id,id1,maxNum,className1,calssName2,id1a){
	//继承SamsungWeb.FatherKvClass
	SamsungWeb.Hextends(this,SamsungWeb.FatherKvClass,[id,id1,className1,calssName2,id1a]);
	this.id=id;
	this.maxNum=maxNum;
	this.className1=className1;
	this.className2=calssName2;
}

SamsungWeb.alphaAn.prototype.AnMoveKv=function(pre,next){
var self=this;
//默认透明
$(this.id+" li:eq("+pre+")").fadeTo(this.maxNum,0);
$(this.id+" li:eq("+next+")").fadeTo(this.maxNum,1);

setTimeout(function(){
	self.AnminComplete();
},this.maxNum)

self.changeKv(pre,next);
}

//左右动画
SamsungWeb.RighttoLAn=function(id,id1,maxNum,className1,calssName2,id1a,ease){
	//继承SamsungWeb.FatherKvClass
	SamsungWeb.Hextends(this,SamsungWeb.FatherKvClass,[id,id1,className1,calssName2,id1a]);
	this.id=id;
	this.maxNum=maxNum;
	this.className1=className1;
	this.className2=calssName2;
	this.ease=ease;
}

SamsungWeb.RighttoLAn.prototype.AnMoveKv=function(pre,next,direction){
	            var self=this;
 	            var w=$(this.id).width();
	            $(this.id+" li:eq("+next+")").css({
		            "display":"block",
		         
		            "left":direction=="add"?w+'px':-w+'px'
		        }).animate({
		            "left":"0"
		        },this.maxNum,this.ease,function() {
					  self.AnminComplete();
		       });
		      
		      $(this.id+" li:eq("+pre+")").css({
		            "display": "block"
		   
		        }).animate({
		            "left":direction=="add"?-w+'px':w+'px'
		        },this.maxNum, this.ease,function() {
					$(this).css("display", "none");
		       });
		       
		       self.changeKv(pre,next);
}


//上下动画 
SamsungWeb.ToptoLAn=function(id,id1,maxNum,className1,calssName2,id1a,ease){
	//继承SamsungWeb.FatherKvClass
	SamsungWeb.Hextends(this,SamsungWeb.FatherKvClass,[id,id1,className1,calssName2,id1a]);
	this.id=id;
	this.maxNum=maxNum;
	this.className1=className1;
	this.className2=calssName2;
	this.ease=ease;
}

SamsungWeb.ToptoLAn.prototype.AnMoveKv=function(pre,next,direction){
	            var self=this;
 	            var w=$(this.id).height();
	            $(this.id+" li:eq("+next+")").css({
		            "display":"block",
		         
		            "top":direction=="add"?w+'px':-w+'px'
		        }).animate({
		            "top":"0"
		        },this.maxNum,this.ease,function() {
					  self.AnminComplete();
		       });
		      
		      $(this.id+" li:eq("+pre+")").css({
		            "display": "block"
		   
		        }).animate({
		            "top":direction=="add"?-w+'px':w+'px'
		        },this.maxNum, this.ease,function() {
					$(this).css("display", "none");
		       });
		       self.changeKv(pre,next);
}

//KV动画模块
SamsungWeb.HanimateKv=function(options,fn){
	 var setobject=this;
	 var timers=new SamsungWeb.Htimer(); 
	 var defaultVal={
			"id":".kvimg",
			"id1":".kvtitle",
			"id1a":"a",
			"navClick":true,
			"lastHumanNav":0,
			"maxNum":500,
			"timeNum":3000,
			"class1":'currenton',
			"class2":'on',
			"direction":"add",
			"pre":0,
			"next":0,
			"sizelength":0,
			"type":"RighttoLAn",
			"ease":"easeOutSine",
			"controldirection":0,
			"licss":true,
			"typebool":true
	 }
	 
	 var PageComFun=fn||function(){};
	 //direction 方向 ADD为正  REMOVE为负方向
	 //默认 是 透明度 动画 
	 //动画暂时 2种  alphaAn 
	 //RighttoLAn  左右移动 
	 //ToptoLAn  上下移动
	 //typebool 是否开启自动方向辨认
	 var obj=SamsungWeb.HobjectExtends(defaultVal,options); 
	 var img;
	 
	 //调用动画对象
	 var currentObj=null;
	 obj.sizelength=$(obj.id+" li").size();
	 
	  function init(){
	    var findcurrent = $(obj.id+" ul").children("li").filter("."+obj.class1);
		var findcurrentsrc=findcurrent.find("img").attr("src");
		//console.log(findcurrentsrc)
		img=new Image();
	    img.onload=function(){
		 	//$(obj.id+" ul").append(img);
		};
		//img.src=findcurrentsrc;
	  }
	 	
	 
      //单击移动KV效果
      setobject.clicktitle=function(C){
			var next=C;
			//找到当前的显示对象
		    var findcurrent = $(obj.id+" ul").children("li").filter("."+obj.class1);
 
		    //当前PAGE
		    obj.pre=$(obj.id+" li").index(findcurrent);
		    
            if(obj.pre==next) return;
            
			if(obj.typebool){
			if(next>obj.pre){
	    	  obj.direction="add";
		    }else{
		      obj.direction="remove";
		    }
			}
			PageComFun(next);
			if(!$(obj.id+" "+obj.idbq+":eq("+next+")").hasClass(obj.class1)){
		    if(obj.navClick){
		 	obj.navClick=false;
		 	obj.lastHumanNav = new Date().getTime();
		 	timers.setLastTime(obj.lastHumanNav);
		 	ChangeMove(obj.pre,next);
		    }
		   }
	     }
	 
	     //自动移动
	     setobject.checkNav=function(C){
    	//找到当前的显示对象
		
		 var findcurrent = $(obj.id+" ul").children("li").filter("."+obj.class1);
		//当前PAGE
		 obj.pre=$(obj.id+" li").index(findcurrent);
		 
		 if(obj.typebool){
	     if(C>0){
	    	obj.direction="add";
	     }else{
	    	obj.direction="remove";
	     }
		 }
		
		 if((obj.pre+C)>obj.sizelength-1){
		 	obj.next=0;
		 }else if((obj)<0){
		 	obj.next=obj.sizelength-1;
		 }else{
		  	obj.next=obj.pre+C;
		 }

         PageComFun(obj.next);

		 //点击发现不是当前KV 就换
		 if(!$(obj.id+" li:eq("+obj.next+")").hasClass(obj.class1)){
		 if(obj.navClick){
		 	obj.navClick=false;
		 	obj.lastHumanNav = new Date().getTime();
		 	timers.setLastTime(obj.lastHumanNav);
		 	ChangeMove(obj.pre,obj.next);
		 }
		 }
         }
	    
	     //取动画类
		 function ChangeMove(pre,next){
		 	 if(currentObj==null){
			 addRome(SamsungWeb[obj.type],pre,next)
			 }else{
			 currentObj.AnMoveKv(pre,next,obj.direction);
			 }
			 
			 if(currentObj!=null){
			 	//动画结束 
			 	currentObj.AnminComplete=function(){
				obj.navClick=true;
			    }
			 }
		 }
		
		
		 //接口方法
		 function addRome(Insterform,pre,next){
		 	//检测一下 接口是不是全
			SamsungWeb.Hinterface.ensureImplements(Insterform,SamsungWeb.HanimateInferface);
			//NEW 一个 
			currentObj=new Insterform(obj.id,obj.id1,obj.maxNum,obj.class1,obj.class2,obj.id1a,obj.ease);
			currentObj.AnMoveKv(pre,next,obj.direction);
		 }
		 
		 setobject.setInter=function()
		 {  
		 	obj.lastHumanNav = new Date().getTime();
		 	timers.setLastTime(obj.lastHumanNav);
		 	timers.SetInter(obj.timeNum)
		 }
		 
		 timers.COMPLETE=function(){
		 	   autoPlay(1);
		 }
		 
		 //暂停
		 setobject.clearInter=function(){
		 	   timers.StopInter();
		 }
		 
		 function autoPlay(C){
		 	  setobject.checkNav(C);
			  obj.lastHumanNav = new Date().getTime();
		 	  timers.setLastTime(obj.lastHumanNav);
			  //console.log("11gg11")
		 }
		 
		 init();
		 return setobject;
}