//模拟响应式布局  固定移动端网站布局
SamsungWeb.extend({
	 HDetectResolution:function(){
	 var uniqueInstance
	 function constructor(){ 	
	    return{
	    $wrapper:null,
		className:'',
		arr:[],
		iewidth:0,
		contentAreaWidth:0,
		init:function(id,arr,className,iewidth){
			this.$wrapper=$S._S(id)||$S._S('#package'); //CSSWrapper
			this.className= className||"sam"; 
			this.contentAreaWidth = iewidth||$S._S(window).width();
			this.arr=arr;
		    if(arr.length<0) throw "arr 不能为空!";
			for(var p in arr){
			if(typeof arr[p]!=="number"){
			 	throw "数组必须为number型";
			}
			}
			this.CssChange(iewidth);
		},
		CssChange:function(iewidth){
			 var isW=false;
			 var arr1=[];
		     contentAreaWidth = iewidth||$S._S(window).width();
		     //把数组 按数字从大到小排序
			 arr1=this.arr.sort(function(a,b){return a<b?1:-1});//从大到小排序
			 
			 //console.log(arr1.length)
			 for(var i=0,len=arr1.length;i<len;i++){
			     
			     //console.log(i,len)
			 	 if(i==(len-1)||arr1.length==1){
			 	 if(contentAreaWidth<=arr1[i]&&contentAreaWidth>=0){
			 	 	  //console.log(arr1[i])
				      this.$wrapper.removeClass().addClass(this.className + arr1[i]);
				      isW=true;
				      break;
				 }
			 	 }
			 	 
			 	 if(contentAreaWidth<=arr1[i]&&contentAreaWidth>arr1[i+1]){
				  this.$wrapper.removeClass().addClass(this.className + arr1[i]);
				  isW=true;
				  break;
				 }
			 }
			 
			 if(!isW){
			 	 this.$wrapper.removeClass();
			 }
		},
		HviewPort:function(w){
		var html="<meta name=\"viewport\" content=\"target-densitydpi=device-dpi, width="+w+"px, user-scalable=no\">";
		$("head").prepend(html);
	    var DEFAULT_WIDTH = w, // 页面的默认宽度
		ua = navigator.userAgent.toLowerCase(), // 根据 user agent 的信息获取浏览器信息
		deviceWidth = window.screen.width, // 设备的宽度
		devicePixelRatio = window.devicePixelRatio || 1, // 物理像素和设备独立像素的比例，默认为1
		targetDensitydpi;
		// Android4.0以下手机不支持viewport的width，需要设置target-densitydpi
		if(ua.indexOf("android") !== -1 && parseFloat(ua.slice(ua.indexOf("android")+8)) < 4) {
			targetDensitydpi = DEFAULT_WIDTH / deviceWidth * devicePixelRatio * 160;
			$('meta[name="viewport"]').attr('content', 'target-densitydpi=' + targetDensitydpi +', width='+DEFAULT_WIDTH+', user-scalable=no');
	    }
	    }
	    }
	}
	return{
	     getInstance:function(){
	     if(!uniqueInstance){
			uniqueInstance=constructor();
		 }
		 return uniqueInstance;
		 }
	 }			
	}()
});


//求等比例SCALE
SamsungWeb.extend({
	HResizeScale:function(w,h,bool){
		var target=this,_w=w,_h=h,_b=bool||false,scale;
		target.getScale=function(w,h){
			var ww=w||$S._S(window).width(),_hh=h||0,
			hh=$S._S(window).height()-_hh;
		    if(_b){
			  scale=hh/_h;
			  }else{
			  scale=ww/_w;
			  }
			return scale
		}
	}
});
