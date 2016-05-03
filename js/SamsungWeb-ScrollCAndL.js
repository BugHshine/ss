/**
 * 检测原件离窗口的距离 显示或消失
 * el 原件  threshold 距离PX  startParentH是否开启取父级高度
 * */
SamsungWeb.extend({
	ScrollCAndL:function(opaction,fn){
		var target=this;
		var oneLoads=true;
		var defaultVal={
			"el":".datalazyload",
			"threshold":0,
			'startParentH':false
	    }
		
		var obj=SamsungWeb.extend(defaultVal,opaction);
		var TagArr=$(obj.el);
		
		var objfn=fn;
		
		target.init=function(){
			for(var i=TagArr.length;i--;){
				 var ele = TagArr[i];
				    if (!target.isView(ele)){
			          objfn(false,$(TagArr[i]));
			          continue;
			    }
			    objfn(true,$(ele));
			    }
		}
		
		//辅助火狐下 $('html body').scrollTop()始终都为0
		function getScrollXY(){
		var x,y;
		if(document.body.scrollTop){ //非标准写法,chrome能识别
		x=document.body.scrollLeft;
		y=document.body.scrollTop;
		}
		else{ //标准写法
		x=document.documentElement.scrollLeft;
		y=document.documentElement.scrollTop;
		}
		return {x:x,y:y};
		}
		
		//对象离窗口的TOP和LEFT
		function getPos(el){
			var pos={
				x:0,
				y:0
			}
			
			var el=$(el);
			
			if(getScrollXY().y==0&&oneLoads){
				$('html,body').animate({scrollTop: '1px'}, 0);
				pos.x=el.offset().left;
			    pos.y=el.offset().top;
			    oneLoads=false;
			    $('html,body').animate({scrollTop: '0px'}, 0);
			}else{
			    pos.x=el.offset().left;
			    pos.y=el.offset().top;
		    }
			
			return pos;
		}
		
		//屏幕高和宽
		function getViewport(){
			return {
				w:$(window).width(),
				h:$(window).height()
			}
		}
		
		
		//滚动条距离DOCUMENT的距离
		function getScrollHeight(){
			//网页被卷去的高： document.body.scrollTop;
		    var html = document.documentElement, bd = document.body;
		    var max=Math.max(window.pageYOffset || 0, html.scrollTop, bd.scrollTop);
		    return max;
		}
		
		
		//对象的高和宽
		function getEleSize(el){
			var el=$(el);
			
			return{
			    w:el.parent()&&obj.startParentH?el.parent().outerWidth(true):el.outerWidth(true),
			    h:el.parent()&&obj.startParentH?el.parent().outerHeight(true):el.outerHeight(true)
			 };
		}
		
		
		target.addEvents=function(){
			$(window).on("resize",target.fn);
			$(window).on("scroll",target.fn);
			$(window).on("touchmove",target.fn)
		}
		
		
		target.removeEvent=function(){
			$(window).off("resize",target.fn);
			$(window).off("scroll",target.fn);
			$(window).off("touchmove",target.fn)
		}
		
		
		target.fn=function(){
			target.init();
		}
		
		target.isView=function(el){
			var top=getPos(el).y, viewVal = getViewport().h, scrollVal = getScrollHeight(), eleHeight = getEleSize(el).h;
			
			//console.log(top)
			//console.log(scrollVal-eleHeight-obj.threshold,viewVal+obj.threshold+scrollVal)
			if(top>=scrollVal-eleHeight-obj.threshold&&top<=viewVal+obj.threshold+scrollVal){
				 return true;
			}
			return false;
		}
		
		target.removeArr=function(el){
			for(var i=TagArr.length;i--;){ 
				 if($(TagArr[i])[0]===el[0]){
				 	 TagArr.splice(i,1);
				 	 return;
				 }
			}
		}
		
		target.getLength=function(){
			return TagArr.length;
		}
			
	return target
	}

})

