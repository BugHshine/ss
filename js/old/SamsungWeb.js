//SamsungWeb专用于常用网站JS效果模块的总结，提供快速，灵活，初步结合JQUERY。分工具类和效果类  author:lihui
;(function(window){
	var version="1.1.0";
	var SamsungWeb=function(){

	}
	SamsungWeb.getVersion=version;
	window.SamsungWeb=SamsungWeb;
	return SamsungWeb;
})(window);

SamsungWeb.OS_PC = "pc";
SamsungWeb.OS_PC_IE8="MSIE 8.0";
SamsungWeb.OS_IPHONE = "iPhone";
SamsungWeb.OS_IPOD = "iPod";
SamsungWeb.OS_IPAD = "iPad";
SamsungWeb.OS_ANDROID = "Android";
SamsungWeb.OS_WINDOWS_PHONE = "Windows Phone";
SamsungWeb.OS_BLACK_BERRY = "BlackBerry";
SamsungWeb.OS_WEIXIN="micromessenger";
//全局变量
SamsungWeb.LGlobal=(function(){
	 function LGlobal(){
	 	 throw "SamsungWeb.LGlobal cannot be instantiated";
	 }
	 LGlobal.mobile = false;
	 LGlobal.os = SamsungWeb.OS_PC;
	 LGlobal.ios = false;
	 LGlobal.android = false;
	 LGlobal.android_new = false;
	 LGlobal.canTouch = false;
	 LGlobal.ispcIE8=false;
	 LGlobal.isweixin=false;
	 //检测浏览器
	 (function (n) {
		LGlobal.isFirefox = (n.toLowerCase().indexOf('firefox') >= 0);
		
		
		if(n.toLowerCase().match(/MicroMessenger/i) == SamsungWeb.OS_WEIXIN){
			LGlobal.isweixin=true;
		}
		
		
		if (n.indexOf(SamsungWeb.OS_IPHONE) > 0) {
			LGlobal.os = SamsungWeb.OS_IPHONE;
			LGlobal.canTouch = true;
			LGlobal.ios = true;
		} else if (n.indexOf(SamsungWeb.OS_IPOD) > 0) {
			LGlobal.os = SamsungWeb.OS_IPOD;
			LGlobal.canTouch = true;
			LGlobal.ios = true;
		} else if (n.indexOf(SamsungWeb.OS_IPAD) > 0) {
			LGlobal.os = SamsungWeb.OS_IPAD;
			LGlobal.ios = true;
			LGlobal.canTouch = true;
		} else if (n.indexOf(SamsungWeb.OS_ANDROID) > 0) {
			LGlobal.os = SamsungWeb.OS_ANDROID;
			LGlobal.canTouch = true;
			LGlobal.android = true;
			var i = n.indexOf(SamsungWeb.OS_ANDROID);
			if(parseInt(n.substr(i + 8, 1)) > 3){
				LGlobal.android_new = true;
			}
		} else if (n.indexOf(SamsungWeb.OS_WINDOWS_PHONE) > 0) {
			LGlobal.os = SamsungWeb.OS_WINDOWS_PHONE;
			LGlobal.canTouch = true;
		} else if (n.indexOf(SamsungWeb.OS_BLACK_BERRY) > 0) {
			LGlobal.os = SamsungWeb.OS_BLACK_BERRY;
			LGlobal.canTouch = true;
		}else if(n.indexOf(SamsungWeb.OS_PC_IE8)>0){
			LGlobal.ispcIE8=true;	
		}
		LGlobal.mobile = LGlobal.canTouch;
	 })(navigator.userAgent);
	 
	 return LGlobal;
})();

//继承
function Hbase(d, b, a){
	var p = null, o = d.constructor.prototype, h = {};
	if(d.constructor.name == "Object"){
		throw new Error( "When you use the extends. You must make a method like 'XX.prototype.xxx=function(){}'. but not 'XX.prototype={xxx:function(){}}'.");
	}
	
	//保存父级的方法
	if (typeof d.__ll__parent__ == "undefined") {
		d.__ll__parent__ = [];
		d.__ll__parent__ = [];
	}
	
	d.__ll__parent__.push(b.prototype);
	for (p in o) {
		h[p] = 1;
	}
	for (p in b.prototype) {
		if (!h[p]) {
			o[p] = b.prototype[p];
		}
	}

	b.apply(d, a);
}
SamsungWeb.Hextends=Hbase;

//接口
SamsungWeb.Hinterface=function(name,methods){
	  if(arguments.length!=2){
	  	   throw new Error("2个参数必须都填写");
	  }
	  
	  this.name=name;
	  this.methods=[];
	  for(var i=1,len=methods.length;i<len;i++){
	  	    if(typeof methods[i]!=="string"){
	  	    	  throw new Error("方法必须是string类型");  
	  	    }
	  	    this.methods.push(methods[i]);
	  }
}

//检查类是否有此接口
SamsungWeb.Hinterface.ensureImplements=function(object){
	   if(arguments.length<2){
	   	      throw new Error("参数必须是2个");
	   }
	   
	   for(var i=1,len=arguments.length;i<len;i++){
	   	   //取接口类
	   	   var interface=arguments[i];
	   	   if(interface.constructor!==SamsungWeb.Hinterface){
	 	   	throw new Error("不是接口类")
	 	   }
	   	   for(var j=0,methodslen=interface.length;i<methodslen;j++){
	   	   	     //取接口的方法
	 	   	    var method=interface.methods[j];
	 	   	    //如果这个object没有这个方法  或者 这个方法不是function函数 就提出错误
	   	   	    if(!object[method]||typeof object[method]!=="function"){
	   	   	    	 throw new Error("这个类的"+interface.name+"中的"+interface.methods[j]+"方法没有定义。");
	   	   	    }
	   	   }
	   }
}


//更改默认的函数
SamsungWeb.HobjectExtends=function(defaultVal,newVal){
	  if(arguments.length!=2) throw new Error("参数必须是2个");
	  for(var p in newVal){
	  	  defaultVal[p]=newVal[p]
	  }
	  return defaultVal;
}

//时间类
SamsungWeb.Htimer=function(){
	  var timenum,nameTime,lastTime;
};

//时间完毕事件
SamsungWeb.Htimer.prototype.COMPLETE=function(){};

//设置时间差
SamsungWeb.Htimer.prototype.setLastTime=function(lastime){
	var self=this;
	self.lastTime=lastime;
	return self.lastTime;   
}

SamsungWeb.Htimer.prototype.SetInter=function(timenum){
	    var self=this;
      	self.timenum=timenum;
      	self.nameTime=setInterval(function()
		{
		var now=new Date().getTime();
		//如果没有设置self.timenum 就当计算时间用的
		if(self.timenum!==undefined){
		if(now-self.lastTime>self.timenum)
		{
			self.COMPLETE();	
		}
		}else{
			self.COMPLETE();
		}
		},self.timenum);
}

//停止时间
SamsungWeb.Htimer.prototype.StopInter=function(){
	    var self=this;
	    window.clearInterval(self.nameTime);
}


//AJAX类
SamsungWeb.HttpAjax=function(){
	
	
}

//json跨域  后台 　响应： callback({
//status:"ok",
//fantasy[{
//key1:value1,
//key2:value2
//}]
//});

SamsungWeb.HttpAjax.prototype.submitDataJson=function(url,d,callback){
	var self=this;
	self.Callback=callback;
	$.getJSON(url+"?callback=?",d,function (data) {
		if(typeof self.Callback==="function"){
             self.Callback(data);
        }
    }
    );
}

//jsonp
SamsungWeb.HttpAjax.prototype.submitDatajsonp=function(url,d,callback,str1,str2){
	  var self=this;
	  self.Callback=callback;
	  $.ajax({
             type:"get",
             async:false,
             url:url,
             data:d,
             dataType:"jsonp",
             jsonp:str1,//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
             jsonpCallback:str2,//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
             success: function(json){
             	//console.log(typeof self.Callback)
                 if(typeof self.Callback==="function"){
			        self.Callback(json);
		          }
             },
             error: function(){
                 alert('fail');
             }
         });
	
	
}


SamsungWeb.HttpAjax.prototype.submitData=function(url,d,callback,txt,method){
	this.method=method||"post";
	this.datatype=txt||"json";
	this.Callback=callback;
	var self=this;
	$.ajax({
        url:url,
        type:this.method,
        dataType:this.datatype,
        data:d,
        success:function(data){
           if(typeof self.Callback==="function"){
			      self.Callback(data);      
		     }
        },
        error:function(XHR,textStatus,errorThrown){
	             // jAlert("连接错误,请检查下自己的WIFI，或者数据线是不是没打开!","")
	            alert ("XHR="+XHR+"\ntextStatus="+textStatus+"\nerrorThrown=" + errorThrown);
	    }
    });
}

//一些检测代码
SamsungWeb.HregExp=(function(){
	return{
		matchEmail:function(val){
				var self=this;
				var valnew=self.trim(val);
				if(valnew.match(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)){
					return true;
				}else{
					return false;
				}
		},
		trim:function(str){
		   //删除左右两端的空格
           return str.replace(/(^\s*)|(\s*$)/g, "");	
		},
		rtrim:function(str){
			//删除右边的空格
 	        return str.replace(/(\s*$)/g,"");
		},
		getQueryString:function(name){
			//取URL的参数
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]); return null;
		},
		formatMoney:function(obj){
			  //数字千位字符化
			  var s=obj;
			  s=s.replace(/[^\d\.]/g,"");
			  s=s.replace(/^(\d*\.\d{0,2}).*$/g,"$1");
			  while(/\d{4}(\.|,|$)/.test(s))
			  s=s.replace(/(\d)(\d{3}(\.|,|$))/,"$1,$2");
			  return s;
		},
		formatNumber:function(obj){
			  //去掉千位字符
			  var s=obj;
			  s=s.replace(/[^\d\.]/g,"");
			  return s;
		},
		matchUserName:function(val,minnum,maxnum){
            //检测用户名长度
			var self=this;
			var minnun=minnum||2,maxnum=maxnum||20;
		  	var valnew = self.trim(val);
			if(valnew.length>=minnun&&valnew.length<maxnum){
				return true;
			}else{
				return false;
			}
		},
		log:function(){
			try{
				console.log.apply(console,arguments);
			}catch(e){
				try{
				opera.postError.apply(opera,arguments);
					
				}catch(e){
				alert(Array.prototype.join.call(arguments," "))
				//TODO handle the exception
				}
				//TODO handle the exception
			}
		}
	}
	
})()

//JS模拟CSS 响应式函数   惰性单例模式
SamsungWeb.HDetectResolution=(function(){
	var uniqueInstance;
	function constructor(){
	return{
	    $wrapper:null,
		className:'',
		arr:[],
		iewidth:0,
		contentAreaWidth:0,
		init:function(id,arr,className,iewidth){
			this.$wrapper=$(id)||$('#Wrapper'); //CSSWrapper
			this.className= className||"sam"; 
			this.contentAreaWidth = iewidth||$(window).width();
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
		     contentAreaWidth = iewidth||$(window).width();
		     //把数组 按数字从大到小排序
			 arr1=this.arr.sort(function(a,b){return a<b?1:-1});//从大到小排序
			 for(var i=0,len=arr1.length;i<len;i++){
			
			 	 if(i==(len-1)||arr1.length==1){
			 	 if(contentAreaWidth<=arr1[i]&&contentAreaWidth>=0){
				      this.$wrapper.removeClass().addClass(this.className + arr1[i]);
				      isW=true;
				      break;
				 }
			 	 }
			 	 
			 	 if(contentAreaWidth<=arr1[i]&&contentAreaWidth>=arr1[i+1]){
				  this.$wrapper.removeClass().addClass(this.className + arr1[i]);
				  isW=true;
				  break;
				 }
			 }
			 
			 if(!isW){
			 	 this.$wrapper.removeClass();
			 }
		}
	}
	}
	return {
	     getInstance:function(){
	     if(!uniqueInstance){
			uniqueInstance=constructor();
		 }
		 return uniqueInstance;
		 }
	}
})();


//loading调用形式读取
SamsungWeb.HjpreLoader=function(str,callback,step){
	  return new SamsungWeb.jpreLoader(str,callback,step);
}

//loading读取
SamsungWeb.jpreLoader=function(str,callback,step){
	   this.items=[];
	   this.errors=[];
	   this.onComplete=callback;
	   this.onStep=step;
	   this.str=str;
	   this.current=0;
	   this.getImages(this.str);
	   this.preloading();
}

SamsungWeb.jpreLoader.prototype.getImages=function(el){
	  var self=this;
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
				self.items.push(url);
			}
		});
}

SamsungWeb.jpreLoader.prototype.preloading = function(){
	var self=this;
	for(var i = 0;i<self.items.length;i++){
		self.loadImg(self.items[i]);
	}
}

SamsungWeb.jpreLoader.prototype.loadImg=function(url) {
	    var self=this;
		var imgLoad = new Image();
		$(imgLoad).load(function(){
			self.completeLoading();
		})
		.error(function() {
			errors.push($(this).attr('src'));
			self.completeLoading();
		})
		.attr('src', url);
}

SamsungWeb.jpreLoader.prototype.completeLoading = function() {
	    var self=this;
		self.current++;
		var per = Math.round((self.current / self.items.length) * 100);
		if(typeof self.onStep === 'function')
			self.onStep(per);
		if(self.current === self.items.length){
			self.current = self.items.length;
			self.loadComplete();
		}
}

SamsungWeb.jpreLoader.prototype.loadComplete = function(){
	    var self=this;
		if(typeof self.onComplete === 'function');
			self.onComplete();
		return;
}


//h5上传照片 预览  原生来做
SamsungWeb.Huploadphoto=function(el,callback){
	  var self=this;
	  self.Complete=callback;
	  if(typeof el!=="string") throw "必须是id名";
	  
	  var els=document.getElementById(el);
	  //.bind 绑定this;
	  SamsungWeb.$H(els).addEvent("change",self.handleFileSelect.bind(this),false);
      SamsungWeb.$H(els).addEvent("click",function(){this.value=null},false);
}

SamsungWeb.Huploadphoto.prototype.handleFileSelect=function(n){
	    var self=this;
	    for(var u=n.target.files,t,r,i=0;t=u[i];i++){
	    r=new FileReader
	    r.onload=function(n)
	    {  
		   return function(t){
		   	 if(typeof self.Complete==="function"){
		   	   	    self.Complete(t.target.result);
		   	  }
		   }
	    }(t)
	    r.readAsDataURL(t);
        }
}

//自定义事件
SamsungWeb.$H=function(el){
	  return new SamsungWeb.Hevent(el);
}

SamsungWeb.Hevent=function(el){
	this.el = (el && el.nodeType == 1)? el: document;
}

SamsungWeb.Hevent.prototype={
         constructor:this,
	     addEvent: function(type, fn, capture){
         var el = this.el;
         if (window.addEventListener){
            el.addEventListener(type, fn, capture);
            var ev = document.createEvent("HTMLEvents");
            
            ev.initEvent(type, capture || false, false);
            
            if (!el["ev" + type]) {
                 el["ev" + type] = ev;
            }
            
         } else if(window.attachEvent){
            el.attachEvent("on" + type, fn);   
            
           // console.log(isNaN(el["cu" + type]));
            
            if (isNaN(el["cu" + type])){
                // 自定义属性
                el["cu" + type] = 0; 
            }   
            
            var fnEv = function(event) {
                if (event.propertyName == "cu" + type) {
                	//用fn方法替代el方法
                	fn.call(el); 
                }
            };
            
            el.attachEvent("onpropertychange", fnEv);
            
            if (!el["ev" + type]) {
                el["ev" + type] = [fnEv];
            } else {
                el["ev" + type].push(fnEv);    
            }
        }
        return this;
        }, 
        dispatchEvent:function(type) {
        var el = this.el;
        if (typeof type === "string") {
            if (document.dispatchEvent) {
                if (el["ev" + type]) {
                    el.dispatchEvent(el["ev" + type]);
                }
            } else if (document.attachEvent) {
            	//console.log(el["cu" + type])
                el["cu" + type]++;
            }    
        }    
        return this;
        },
        removeEvent: function(type, fn, capture) {
        var el = this.el;
        if (window.removeEventListener) {
            el.removeEventListener(type, fn, capture || false);
        } else if (document.attachEvent){
            el.detachEvent("on" + type, fn);
            var arrEv = el["ev" + type];
            if (arrEv instanceof Array) {
                for (var i=0; i<arrEv.length; i+=1) {
                    el.detachEvent("onpropertychange", arrEv[i]);
                }
            }
        }
        return this;    
        }
}


//模拟自定义事件
var HEventTarget = function() {
    this._listener = {};
    this.args={};
};

HEventTarget.prototype={
	constructor:this,
	addEvent:function(type,fn){
		 if(arguments.length>=2){
		 	this.args=arguments[2];
		 }
		 if(typeof type==="string"&&typeof fn==="function"){
		 	  if(typeof this._listener[type]==="undefined"){
		 	  	    this._listener[type]=[fn];
		 	  }else{
		 	  	    this._listener[type].push(fn);
		 	  }
		 }
		 return this;
	},
	addEvents:function(obj){
		  obj=typeof obj==="object"?obj:{};
		  var type;
		  for(type in obj){
		  	    if(type&&typeof obj[type]==="function"){
		  	    	  this.addEvent(type,obj[type]);
		  	    }
		  }
	},
	dispatchEvent:function(type){
		   if(type&&this._listener[type]){
		   	    var events ={
		   	    	 type:type,
		   	    	 target:this,
		   	    	 args:this.args
		   	    }
		   	    
		   	    for(var i=0,len=this._listener[type].length;i<len;i++){
		   	    	    this._listener[type][i].call(this,events);
		   	    }
		   }
		   return this;
	},
	dispatchEvents:function(arr){
		   if(arr instanceof Array){
		   	    for(var i=0,len=arr.length;i<len;i++){
		   	    	 this.dispatchEvent(arr[i]);
		   	    }
		   }
	},
	removeEvent:function(type,fn){
		  var listeners = this._listener[type]; 
		  if(listeners instanceof Array){
		  	   if(typeof fn==="function"){
		  	   	   for(var i=0,i=listeners.length;i<len;i++){
		  	   	   	    if(listeners[i]==fn){
		  	   	   	    	listeners.splice(i,1);
		  	   	   	        break;
		  	   	   	    }
		  	   	   }
		  	   }else if(fn instanceof Array){
		  	       for(var lis=0,lislen=listeners.length;i<lislen;i++){
		  	       	    this.removeEvent(type,lis[i])
		  	       	  
		  	       }
		       }else {
		       	   delete this._listener[type];
		       }
		  }
		  return this;
	},
	removeEvents:function(params){
		 if(params instanceof Array){
		 	  for(var i=0;i<params.length;i++){
		 	  	   this.removeEvent(params[i]);
		 	  }
		 }else if(typeof params==="object"){
		 	  for(var type in params){
		 	  	    this.removeEvent(type, params[type]);  
		 	  }
		 }
		 return this;
	}
}

SamsungWeb.HEventTarget=HEventTarget;

//分享
SamsungWeb.HShare=function(options){
	  var defaultVal={
	  	   "imgsrc":'',
           "width":100,
           "height":100,
	       "title":document.title,
           "desc":document.title,
           "url":document.location.href
	  }
	  this.obj=SamsungWeb.HobjectExtends(defaultVal,options); 
}

//新浪微博分享 searchPic=false 禁止新浪抓图
SamsungWeb.HShare.prototype.postToWB=function(){
	var self=this;
	var title=encodeURI(self.obj.title);
	var _url=self.obj.url;
	var _source=encodeURIComponent(self.obj.desc);
	var _pic=self.obj.imgsrc;
	var _u='http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+_url+'&source='+_source+'&pic='+_pic+'&searchPic=false';
	window.open(_u); 
}


//QQ微博分享
SamsungWeb.HShare.prototype.postToQQWb=function(){
	var self=this;
	var _t = encodeURI(self.obj.title);
    var _url = encodeURI(self.obj.url);
	var _appkey = encodeURI("appkey");//你从腾讯获得的appkey
	var _pic = encodeURI(self.obj.img);
	var _site = location.href;//你的网站地址
	var _u = 'http://v.t.qq.com/share/share.php?title='+_t+'&url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic;
}


//返回矩形四边距离
SamsungWeb.HBoxRounds=function(el){
	var box=el.getBoundingClientRect(),
	doc=el.ownerDocument,
	body=doc.body,
	html=doc.documentElement,
	clientTop=html.clientTop||body.clientTop||0,
	clientLeft=html.clientLeft||body.clientLeft||0,
	top=box.top  + (self.pageYOffset || html.scrollTop  ||  body.scrollTop ) - clientTop,
    left=box.left + (self.pageXOffset || html.scrollLeft ||  body.scrollLeft) - clientLeft
	return {'top':top,'left':left}
}


SamsungWeb.getStyle=function(el,style){
        if(!+"\v1"){
            style = style.replace(/\-(\w)/g, function(all, letter){
            return letter.toUpperCase();
          });
          var value = el.currentStyle[style];
          (value == "auto")&&(value = "0px" );
          return value;
        }else{
          return document.defaultView.getComputedStyle(el, null).getPropertyValue(style)
        }
}


//拖拉类
SamsungWeb.HDrag=function(el){
	 this.el=document.getElementById(el);
	 this.isQuirk=document.documentMode ? document.documentMode == 5 : document.compatMode && document.compatMode != "CSS1Compat",
     this.options=arguments[1] || {},
     this.container=this.options.container || document.documentElement,
     this.limit=this.options.limit,
     this.lockX=this.options.lockX,
     this.lockY=this.options.lockY,
     this.ghosting=this.options.ghosting,
     this.handle=this.options.handle,
     this.revert=this.options.revert,
     this.scroll=this.options.scroll,
     this.coords=this.options.coords,
     this.onStart=this.options.onStart || function(){},
     this.onDrag=this.options.onDrag || function(){},
     this.onEnd=this.options.onEnd || function(){} ,
     this.marginLeft=parseFloat(SamsungWeb.getStyle(this.el,"margin-left")),
     this.marginRight=parseFloat(SamsungWeb.getStyle(this.el,"margin-right")),
     this.marginTop=parseFloat(SamsungWeb.getStyle(this.el,"margin-top")),
     this.marginBottom=parseFloat(SamsungWeb.getStyle(this.el,"margin-bottom")),
     this.cls,
     this._handle,
     this._ghost,
     this._top,
     this._left,
     this._html,
	 this.el.me=this; //保存THIS
	 this.z=999; //层级
	 this.el.lockX = SamsungWeb.HBoxRounds(this.el).left;;
     this.el.lockY = SamsungWeb.HBoxRounds(this.el).top;
     this.el.style.position = "absolute";
     if(this.handle){
        	//console.log(handle)
          this.cls = new RegExp("(^|\\s)" + handle + "(\\s|$)");
          //alert(cls)
          for(var i=0,l=this.el.childNodes.length;i<l;i++){
            var child =this.el.childNodes[i];
            //console.log(child.className)
            if(child.nodeType == 1 && this.cls.test(child.className)){
              this._handle = child;
              break;
            }
          }
        }
        this._html = (this._handle || this.el).innerHTML;
}

SamsungWeb.HDrag.prototype={
	 addevent:function(){
	 	var self=this;
	    if(SamsungWeb.LGlobal.os=="pc"){
	 	(self._handle || self.el).onmousedown = self.dragstart;
	 	}else{
        (self._handle || self.el).addEventListener("touchstart", self.dragstart, false);
        }
	 },
	 dragstart:function(e){
	 	var self=this.me;
	 	var el=self.el;
	 	//console.log(el)
	    var e=e||window.event;
	    if(e.type == 'touchstart') {
          	//console.log(e.touches[0].pageX,el.offsetLeft)
			el.offset_x = e.touches[0].pageX-el.offsetLeft;
			el.offset_y = e.touches[0].pageY-el.offsetTop;
		}else{
          el.offset_x = e.clientX - el.offsetLeft;
          el.offset_y = e.clientY - el.offsetTop;
        }
	    
	 	if(SamsungWeb.LGlobal.os=="pc"){
	 	document.onmousemove=self.dragmove;
	 	document.onmouseup=self.dragup;
	 	}else{
	 	document.addEventListener("touchmove",self.dragmove, false);
        document.addEventListener("touchend",self.dragup, false);	
	 	}
	 	document.me=self;
	 	
	 	if(self.ghosting){
	 		 //console.log(el);
            self._ghost = el.cloneNode(false);
            el.parentNode.insertBefore(_ghost,el.nextSibling);
            if(self._handle){
              self._handle = self._handle.cloneNode(false);
              self._ghost.appendChild(self._handle);
            }
              !+"\v1"? _ghost.style.filter = "alpha(opacity=50)" : _ghost.style.opacity = 0.5;
          }
          (self._ghost || el).style.zIndex = ++self.z;
          self.onStart({"left":el.offset_x,"top":el.offset_y});
          return false;
	 },
	 dragmove:function(e){
	 	 var e=e||window.event;
	 	 var self=this.me;
	 	 var el=self.el;
	 	 el.style.cursor="pointer";
	 	 
	 	 !+"\v1"? document.selection.empty() : window.getSelection().removeAllRanges();

	 	 if(e.type == 'touchmove'){
           e.preventDefault();
		   e.stopPropagation(); 
           self._left=e.touches[0].clientX - el.offset_x;
           self._top=e.touches[0].clientY - el.offset_y;
           }else{
           self._left = e.clientX - el.offset_x ;
           self._top = e.clientY - el.offset_y;
           }
	 	   
	 	   if(self.scroll){
          	//怪异模式式取  document.body || 标准模取 document.documentElement
            var doc = self.isQuirk ? document.body : document.documentElement;
            doc = self.options.container || doc;
            self.options.container && (self.options.container.style.overflow = "auto");
            var a = SamsungWeb.HBoxRounds(el).left + el.offsetWidth;
            var b = doc.clientWidth;
            //console.log(a,b)
            if (a > b){
              doc.scrollLeft = a - b;
            }
            var c = SamsungWeb.HBoxRounds(el).top + el.offsetHeight;
            var d = doc.clientHeight;
            if (c > d){
              doc.scrollTop = c - d;
            }
           }
          
           if(self.limit){
            var _right = self._left + el.offsetWidth ,
            _bottom = self._top + el.offsetHeight,
            _cCoords = SamsungWeb.HBoxRounds(self.container),
            _cLeft = _cCoords.left,
            _cTop = _cCoords.top,
            _cRight=_cLeft + self.container.clientWidth,
            _cBottom=_cTop + self.container.clientHeight;
            self._left = Math.max(self._left, _cLeft);
            self._top = Math.max(self._top, _cTop);
            if(_right > _cRight){
              self._left = _cRight - el.offsetWidth - self.marginLeft - self.marginRight;
            }
            if(_bottom > _cBottom){
              self._top = _cBottom - el.offsetHeight  - self.marginTop - self.marginBottom;
            }
          }
	 	 
	 	  self.lockX && ( self._left = el.lockX);
          self.lockY && ( self._top = el.lockY);
	        
	 	  (self._ghost || el).style.left = self._left + "px";
          (self._ghost || el).style.top = self._top  + "px";
          self.coords && ((self._handle || self._ghost || el).innerHTML = self._left + " x " + self._top);
          self.onDrag({'top':self._top,'left':self._left}); 
          
	 	  return false;
	 	
	 },
	 dragup:function(e){
	 	var self=this.me;
	 	var el=self.el;
	 	if(SamsungWeb.LGlobal.os=="pc"){
	 	document.onmousemove=null;
	 	document.onmouseup=null;
	 	}else{
	 	document.removeEventListener("touchmove",self.dragmove, false);
        document.removeEventListener("touchend",self.dragup, false);	
        }
        self._ghost && el.parentNode.removeChild(self._ghost);
        el.style.left = self._left + "px";
        el.style.top = self._top +"px";
        (self._handle || self.el).innerHTML = self._html;
        
        if(self.revert){
            el.style.left = el.lockX   + "px";
            el.style.top = el.lockY  + "px";
        }
        self.onEnd({"left":el.style.left,"top":el.style.top});
	 }
}

//viewport 实现定宽网页 WebApp 下布局自适应
SamsungWeb.HviewPort=function(w){
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


//回传缩放比例
SamsungWeb.HResizeScale=function(w,h,bool){
     this.w=w;
     this.h=h;
     this.scale=1;
     this.bool=bool||false;
}

//hwewixin 是来说明 微信的头部占80个像素 如果是微信H的值就设置下。
SamsungWeb.HResizeScale.prototype.getScale=function(h,w){
	 var self=this;
	 var hweixin=h||0;
	 var ww=w||$(window).width(),
	 hh=$(window).height()-hweixin

	 if(self.bool){
	 self.scale=hh/self.h;
	 }else{
	 self.scale=ww/self.w;
	 }
	 return self.scale
}

//jquery版本
SamsungWeb.WindowClone=function(obj,idname,fathername,changeid,bool){
	return new SamsungWeb.CloneNode(obj,idname,fathername,changeid,bool);
}

SamsungWeb.CloneNode=function(obj,classname,fathername,changeid,bool){
	var obj=obj;
	var bool=bool||false;
	var $clone=obj.clone(bool);
}
