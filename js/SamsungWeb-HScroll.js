SamsungWeb.extend({
	   HScroll:function(options,fn){
	   	    var target=this;
	   	    var defaultVal={
	   	    	Classpage:'.node', //默认的CLASS名
	   	    	Msize:0,//页面的数目
	   	    	page_n:1,			//初始页面位置
				initP:null,			//初值控制值Y
				initPX:null, //初值控制值X
				moveP:null,			//每次获取到的值
				movePX:null,
				firstP:null,	  //第一次获取的值Y
				firstPX:null,    //第一次获取的值X
				newM:null,		//重新加载的浮层
				p_b:null,		//方向控制值
				indexP:null, 		//控制首页不能直接找转到最后一页
				move:null,			//触摸能滑动页面
				start:true,		//控制动画开始
				startM:null,			//开始移动
				position:null,			//方向值
				DNmove:false,		//其他操作不让页面切换
				mapS:null,		//地图变量值
				canmove:null,		//首页返回最后一页
				lastP:true, //控制最后一页不能返回第一页
				v_h:null,//记录设备的高度
				loop:true,  //开启不能循环拖拉
				mousedown:null,
				callBack:null,
				AblerMove:false
	   	    }
	   	
	   	    var obj=SamsungWeb.extend(defaultVal,options);
	   	    
	
	   	    target.init=function(n,callBack,callBackLorR){
			    	obj.page_n=n||1;
			    	init_pageH();
			    	initPage();
			    	changeOpen();
			    	//PAGE的数量
			    	obj.Msize=$(obj.Classpage).size();
			    	//console.log(obj.Msize)
			    	obj.callBack=callBack;
			    	obj.callBackLorR=callBackLorR;
			}
	   	    
	   	    
	   	    function init_pageH(){
	   	    	//IE BackCompat：标准兼容模式关闭。CSS1Compat：标准兼容模式开启。
		    	var fn_h=function(){
		    	   if(document.compatMode == 'BackCompat')
						var Node = document.body;
					else
						var Node = document.documentElement;
					 return Math.max(Node.scrollHeight,Node.clientHeight);
				}
		    	
		    	var page_h = fn_h();
				var m_h = $(obj.Classpage).height();
			
				page_h >= m_h ? obj.v_h = page_h : obj.v_h = m_h ;
				//设置各种模块页面的高度，扩展到整个屏幕高度
				$(obj.Classpage).height(obj.v_h); 
	   	    	
	   	    }
	   	    
	   	    function initPage(){
    	        $(obj.Classpage).addClass('hide').eq(obj.page_n-1).addClass('show').removeClass('hide');
            }
	   	    
	   	    function changeOpen(){
		    	$(obj.Classpage).on('mousedown touchstart',page_touchstart.bind(this));
				$(obj.Classpage).on('mousemove touchmove',page_touchmove.bind(this));
				$(obj.Classpage).on('mouseup touchend mouseout',page_touchend.bind(this)); 
		    }
	   	    
	   	    //点击
	   	    target.Page_click=function(n){
    	        var obj=this;
		    	if(n==1){
		    		obj.newM = obj.page_n + 1 ;
		    		//向上移动
					if(obj.page_n != obj.Msize){
						obj.newM = obj.page_n + 1 ;
					}else{
						obj.newM = 1 ;
						//return;
					}
		    	    //初始化下个页面放到浏览器顶部
					$(obj.Classpage).eq(obj.newM-1).addClass('active').css('top',obj.v_h);
		    	}else{
		    		obj.newM = obj.page_n-1;
		    		if(obj.newM<=0){
						obj.newM=obj.Msize;
					}
		    		//初始化下个页面放到浏览器底部
					$(obj.Classpage).eq(obj.newM-1).addClass('active').css('top',-obj.v_h);
		    	}
		    	$(obj.Classpage).eq(obj.newM-1).animate({'top':0},300,'easeOutSine',function(){
				/*
				** 切换成功回调的函数
				*/
				success();
			    })
		    }
	   	    
	   	    
			target.Page_clickPage=function(n){
		    	if(obj.page_n==n) return;
		    	if(obj.page_n<n){
		    		//obj.page_n=n;
		    		
		    		obj.newM = n;
		    	    //初始化下个页面放到浏览器顶部
					$(obj.Classpage).eq(obj.newM-1).addClass('active').css('top',obj.v_h);
					
		    	}else{
		    		//obj.page_n=n;
		    		obj.newM = n;
		    		//初始化下个页面放到浏览器底部
					$(obj.Classpage).eq(obj.newM-1).addClass('active').css('top',-obj.v_h);
					//obj.page_n=n;
					
		    	}
		    	$(obj.Classpage).eq(obj.newM-1).animate({'top':0},300,'easeOutSine',function(){}); 
		    	
				/*
				** 切换成功回调的函数
				*/
				success();
		    }
			
			function page_touchstart(e){
		    	
		    	if (e.type == 'touchstart') {
					obj.initP = window.event.touches[0].pageY;
				    obj.initPX= window.event.touches[0].pageX;
		    	} else {
					obj.initP = e.y || e.pageY;
					obj.initPX=e.x||e.pageX;
					obj.mousedown = true;
				}
				obj.firstP=obj.initP;
				obj.firstPX=obj.initPX;
				
				//console.log("obj.firstP",obj.firstP)
		    }
			
	    function page_touchmove(e){
    	e.preventDefault();
		e.stopPropagation(); 
		if(obj.start||obj.startM){
			obj.startM=true;
			if(e.type == 'touchmove') {
				obj.moveP=window.event.touches[0].pageY;
				//console.log("obj.moveP",obj.moveP)
				obj.movePX=window.event.touches[0].pageX;
			} else { 
				if(obj.mousedown) obj.moveP = e.y || e.pageY;
				if(obj.mousedown) obj.movePX=e.x||e.pageX;
			}
            
            if(obj.indexP==null){
			obj.page_n == 1?obj.indexP=false:obj.indexP =true ;	//true 为不是第一页 false为第一页
		    }
         }
		
		//console.log("obj.page_n",obj.page_n,"obj.Msize",obj.Msize)
		//设置一个页面开始移动
		if(obj.moveP&&obj.startM){
			if(!obj.p_b){
				obj.p_b = true;
				//console.log(obj.moveP - obj.initP,obj.movePX-obj.firstPX)
				if(Math.abs(obj.moveP - obj.initP)>Math.abs(obj.movePX-obj.firstPX)){
					//console.log("zhixing")
					obj.position=obj.moveP - obj.initP > 0 ? true : false;	//true 为向下滑动 false 为向上滑动
					
					//console.log(obj.position);
					
			        obj.AblerMove=true;
				    if(obj.loop){
					obj.page_n == 1?obj.indexP=false:obj.indexP =true ;	//true 为不是第一页 false为第一页
					obj.page_n == obj.Msize?obj.lastP=false:obj.lastP =true ;
				    }
				    if(obj.position){
                    
					if(obj.indexP){
						obj.newM = obj.page_n - 1 ;
						if(obj.newM<=0){
							obj.newM=obj.Msize;
						}
						
						//初始化下个页面放到浏览器顶部
						$(obj.Classpage).eq(obj.newM-1).addClass('active').css('top',-obj.v_h);
						//console.log("dd",obj.newM-1,-obj.v_h);
						obj.move = true;
					}else{
						if(obj.canmove){
							obj.move = true;
							obj.newM = obj.Msize;
							
					
							//初始化下个页面放到浏览器顶部
							$(obj.Classpage).eq(obj.newM-1).addClass('active').css('top',-obj.v_h);
						}
						else obj.move = false;
					}
			    }else{
			    	if(obj.lastP){
			    	//向上移动
					if(obj.page_n != obj.Msize){
						obj.newM = obj.page_n + 1 ;
						//console.log()
					}else{
						obj.newM = 1 ;
						//return;
					}
					//初始化下个页面放到浏览器底部
					$(obj.Classpage).eq(obj.newM-1).addClass('active').css('top',obj.v_h);
					
					//console.log(obj.newM-1,-obj.v_h)
					obj.move = true ;
					}else{
					obj.move = false;	
					
					}
			    
			    }
				    
					
			//根据移动设置页面的值
			if(!obj.DNmove){
				//滑动带动页面滑动
				if(obj.move){	
					//移动中设置页面的值（top）
					obj.start = false;
					var topV = parseInt($(obj.Classpage).eq(obj.newM-1).css('top'));
					//console.log(obj.newM-1,(topV+obj.moveP-obj.initP));
					$(obj.Classpage).eq(obj.newM-1).css({'top':topV+obj.moveP-obj.initP});	
					obj.initP = obj.moveP;
				}else{
					obj.moveP = null;	
				}
			    }else{
				obj.moveP = null;	
			    }   
				}else{
					obj.AblerMove=false;
					if(obj.movePX-obj.firstPX>5){
						obj.position=true; 
						obj.callBackLorR(obj.page_n,obj.position);
					}else if(obj.movePX-obj.firstPX<-5){
						obj.position=false;
						obj.callBackLorR(obj.page_n,obj.position);
					}
					
					//obj.position=obj.movePX-obj.firstPX>20?true:false; //true 为右 false为左 
			
				}
		}
		}
        }
		
		function page_touchend(e){
   		//结束控制页面
		obj.startM =null;
		obj.p_b = false;
		if(!obj.AblerMove) return;
		//判断移动的方向
		var move_p;
   	    obj.position ? move_p = obj.moveP - obj.firstP > 100 : move_p = obj.firstP - obj.moveP > 100 ;
   	    
   	    console.log('obj.move',obj.move);
   	    
   	    if(obj.move){
			//切画页面(移动成功)
			if(move_p && Math.abs(obj.moveP) >5 ){
				   
				   //console.log(obj.newM-1)
				   
				   $(obj.Classpage).eq(obj.newM-1).animate({'top':0},300,'easeOutSine',function(){
					/*
					** 切换成功回调的函数
					*/
					success();
				})
			//返回页面(移动失败)
			}else if (Math.abs(obj.moveP)>=5){	//页面退回去
				obj.position ? $(obj.Classpage).eq(obj.newM-1).animate({'top':-obj.v_h},100,'easeOutSine') : $(obj.Classpage).eq(obj.newM-1).animate({'top':obj.v_h},100,'easeOutSine');
				$(obj.Classpage).eq(obj.newM-1).removeClass('active');
				obj.start = true;
			}
		}
   
        /* 初始化值 */
        obj.AblerMove=false;
		obj.initP=null,			//初值控制值
		obj.moveP=null,			//每次获取到的值
		obj.firstP=null,		//第一次获取的值
		obj.mousedown=null;		//取消鼠标按下的控制值
       }
	   	    
	    function success(){
   	  	/*
		** 切换成功回调的函数
		*/					
		var thisPage=$(obj.Classpage).eq(obj.newM-1);	
		
		//设置页面的出现
		$(obj.Classpage).eq(obj.page_n-1).removeClass('show active').addClass('hide');
		thisPage.removeClass('active hide').addClass('show');
		//重新设置页面移动的控制值
		obj.page_n = obj.newM;
		obj.callBack(obj.page_n);
		obj.start = true;
	    }	    
	   
	   return target;
	   }
	   
})