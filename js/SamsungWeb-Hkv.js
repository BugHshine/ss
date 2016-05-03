//写个动画CLASS父类    依赖 SamsungWeb-HDetectResolution.js 和 easing.js
SamsungWeb.FatherKvClass=SamsungWeb.Class.extend({
	 init:function(id,id1,className1,calssName2,id1a){
			this.id=id;
			this.id1=id1;
			this.className1=className1;
			this.className2=calssName2;
			this.id1a=id1a;
	 },
	 changeKv:function(pre,next){
	 	   $(this.id+" ul li:eq("+pre+")").removeClass(this.className1);
		   $(this.id1+" "+this.id1a+":eq("+pre+")").removeClass(this.className2); 	
		   $(this.id+" ul li:eq("+next+")").addClass(this.className1);
		   $(this.id1+" "+this.id1a+":eq("+next+")").addClass(this.className2);
	 },
	 AnminComplete:function(){
	 	
	 }
})

//透明动画  继承 FatherKvClass
SamsungWeb.alphaAn=SamsungWeb.FatherKvClass.extend({
	  init:function(id,id1,maxNum,className1,calssName2,id1a){
	  	 this._super(id,id1,maxNum,className1,calssName2,id1a);
	  	 this.id=id;
		 this.maxNum=maxNum;
		 this.className1=className1;
		 this.className2=calssName2;
	  },
	  AnMoveKv:function(pre,next){
	  	 var self=this;
	  	  //默认透明
		 $(this.id+" li:eq("+pre+")").stop(true).fadeTo(this.maxNum,0);
		 $(this.id+" li:eq("+next+")").stop(true).fadeTo(this.maxNum,1);
         setTimeout(function(){
		    self.AnminComplete();
		 },this.maxNum)
         
	  	 this._superpropertype.changeKv.apply(this,[pre,next]);
	  }
})

//左右动画 继承 FatherKvClass
SamsungWeb.RighttoLAn=SamsungWeb.FatherKvClass.extend({
	  init:function(id,id1,maxNum,className1,calssName2,id1a,ease){
	  	this._super(id,id1,maxNum,className1,calssName2,id1a,ease);
	  	this.id=id;
		this.maxNum=maxNum;
		this.className1=className1;
		this.className2=calssName2;
		this.ease=ease;
	  },
	  AnMoveKv:function(pre,next,direction){
	  	    var self=this;
	  	    var w=$(this.id).width();
	        $(this.id+" li:eq("+next+")").css({
		            "display":"block",
		         
		            "left":direction=="add"?w+'px':-w+'px'
		     }).stop(true).animate({
		            "left":"0"
		        },this.maxNum,this.ease,function() {
					  self.AnminComplete();
		       });
		      
		      $(this.id+" li:eq("+pre+")").css({
		            "display": "block"
		   
		        }).stop(true).animate({
		            "left":direction=="add"?-w+'px':w+'px'
		        },this.maxNum, this.ease,function() {
					$(this).css("display", "none");
		      });
		       
	  	     this._superpropertype.changeKv.apply(this,[pre,next]);
	  }
	
	   
})

//上下动画  继承 FatherKvClass
SamsungWeb.ToptoLAn=SamsungWeb.FatherKvClass.extend({
	   init:function(id,id1,maxNum,className1,calssName2,id1a,ease){
	   	    this._super(id,id1,maxNum,className1,calssName2,id1a,ease);
	   	    this.id=id;
			this.maxNum=maxNum;
			this.className1=className1;
			this.className2=calssName2;
			this.ease=ease;
	   },
	   AnMoveKv:function(pre,next,direction){
	   	    var self=this;
	   	   // console.log($(this.id));
	        var w=$(this.id+" li:eq("+next+")").height();
	        //console.log("h",w);
	         $(this.id+" li:eq("+next+")").stop(true).css({
		            "display":"block",
		            "top":direction=="add"?w+'px':-w+'px'
		        }).animate({
		            "top":"0"
		        },this.maxNum,this.ease,function() {
					  self.AnminComplete();
		       });
		      
		      $(this.id+" li:eq("+pre+")").stop(true).css({
		            "display": "block"
		        }).animate({
		            "top":direction=="add"?-w+'px':w+'px'
		        },this.maxNum, this.ease,function() {
					$(this).css("display", "none");
		       });
	   	
	   	     this._superpropertype.changeKv.apply(this,[pre,next]);
	   }
})


//KV动画模块
SamsungWeb.extend({
	HanimateKv:function(options,fn){
		var setobject=this;
		var defaultVal={
			"id":".kvimg",
			"id1":".kvtitle",
			"id1a":"a",
			"navClick":true,
			"lastHumanNav":0,
			"maxNum":1000,
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
			"typebool":true,
			"initializing":true,
			"startBool":false,
			"img_width":1920,
			"img_height":1080
	 }
	 //时间设置
	 var timers=new $S.Htimer(); 
	 var PageComFun=fn||function(){};
	 //direction 方向 ADD为正  REMOVE为负方向
	 //默认 是 透明度 动画 
	 //动画暂时 2种  alphaAn 
	 //RighttoLAn  左右移动 
	 //ToptoLAn  上下移动
	 //typebool 是否开启自动方向辨认
	 var obj=SamsungWeb.extend(defaultVal,options); 
	 var img;
	 //调用动画对象
	 var currentObj=null;
	 obj.sizelength=$(obj.id+" li").size();	
	 
	 //console.log(obj.id)
	 
	 //alert(obj.sizelength)
	 function init(){
	    var findcurrent = $(obj.id+" ul").children("li").filter("."+obj.class1);
		var findcurrentsrc=findcurrent.find("img").attr("src");
		//console.log(findcurrentsrc)
		img=new Image();
	    img.onload=function(){
	    	img.className="alphaset view_img";
	    	img.setAttribute("data-w",img.width);
	    	img.setAttribute("data-h",img.height);
		 	$(obj.id+" ul").append(img);
		 	setobject.onresizeFun();
		};
		img.src=findcurrentsrc;
	  }
	 
	  setobject.onresizeFun=function(_w,_h){
	  	    obj.img_width=_w||obj.img_width;
	  	    obj.img_height=_h||obj.img_height;
	  	    
	  	    setobject.scaleX=new $S.HResizeScale(obj.img_width,obj.img_height);
	  	    
	  	    if($S.LGlobal.ispcIE8){
	  	        setobject.getScaleX=setobject.scaleX.getScale(1280);
	  	    }else{
	  	    	setobject.getScaleX=setobject.scaleX.getScale();
	  	    }
	  	    $(".view_img").each(function(){
	  	     	var w=$(this).attr("data-w")*setobject.getScaleX,
	  	     	h=$(this).attr("data-h")*setobject.getScaleX;
	  	     	$(this).width(w).height(h);
	  	     })
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
		    if(obj.navClick||obj.startBool){
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
			 addRome(SamsungWeb[obj.type],pre,next);
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
		 	//console.log(currentObj)
		 	//检测一下 接口是不是全
			//SamsungWeb.Hinterface.ensureImplements(Insterform,SamsungWeb.HanimateInferface);
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
		 
		 
		 //侦听动画播放完毕
		 timers.addListener(function(){
		  	autoPlay(1);
	 	    //关闭侦听器
	 	   //stime.removeListener();
	     })
		 
		 //暂停
		 setobject.clearInter=function(){
		 	   timers.StopInter();
		 }
		 
		 
		 //自动播放代码
		 function autoPlay(C){
		 	  setobject.checkNav(C);
			  obj.lastHumanNav = new Date().getTime();
		 	  timers.setLastTime(obj.lastHumanNav);
		 }
		 
		 //一般自动
		 if(obj.initializing){
		   init();
		 }
		 return setobject;
	}
})
