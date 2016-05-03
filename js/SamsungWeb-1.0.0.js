//SamsungWeb以JQUERY框架模式 以及接口模式写东西，并且结合AS3的一些OOP概念开发。缺点命名空间会有冲突。适合小团队开发网站.
;(function($,w){
	//如果不用JQUERY 就用IE8以上支持的querySelectorAll()来选取 以后会自己试着写个正则来获取 
	var _$=$,DOC=w.document,hasOwn = ({}).hasOwnProperty,version = "1.0.0";
	var O={},Arr=[],Slice=Array.prototype.slice,W3C=DOC.dispatchEvent;//w3c事件触发器
	var HTML  = DOC.documentElement;
	//检测类型
	var class2type = {
        "[object HTMLDocument]"   : "Document",
        "[object HTMLCollection]" : "NodeList",
        "[object StaticNodeList]" : "NodeList",
        "[object IXMLDOMNodeList]": "NodeList",
        "[object DOMWindow]"      : "Window"  ,
        "[object global]"         : "Window"  ,
        "null"                    : "Null"    ,
        "NaN"                     : "NaN"     ,
        "undefined"               : "Undefined"
    }
    var toString = class2type.toString;
    
	var SamsungWeb=function(selector){
		  return SamsungWeb.fn.init(selector);
	}
	
	SamsungWeb.fn=SamsungWeb.prototype={
		 samsungweb:version,
		 constructor:SamsungWeb,
		 length:0,
		 each:function(fn){
		 	 //console.log(this.length)
             for(var i=0;i<this.length;i++){
             	  fn.call(this[i],i,this[i])
             }
             return this;
		 },
		 hide:function(){
		 	 this.each(function(){
		 	 	 this.style.display="none"
		 	 })
		 	 
		 	 return this;
		 },
		 show:function(){
		 	this.each(function(){
		 	 	 this.style.display="block"
		 	})
		 	return this;
		 }
	}
	
	//选择器
	SamsungWeb.fn.init=function(selector){
		 	var nodelist,i=0
		 	if(_$===undefined){
		 	nodelist=DOC.querySelectorAll(selector);	
		 	}else{
		 	nodelist=_$(selector),i=0;
		    }
		 	
			this.length=nodelist.length;
			
			for(;i<this.length;i++){
				 this[i]=nodelist[i]
			}
			return this
	}
	
    SamsungWeb.fn.init.prototype=SamsungWeb.fn;
    

    //此继承代码直接用的JQUERY的源码
	SamsungWeb.extend=SamsungWeb.fn.extend=function(){
		var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;
		if ( typeof target === "boolean"){
		deep = target;
		//跳过DEEP参数到复制的目标
		target = arguments[ i ] || {};
		i++;
	    }
		
		//传进来的是个字符串或者不是对象和函数类型,进行深COPY
		if(typeof target !== "object" && !SamsungWeb.isFunction(target)){
			target = {};
		}
		
		//参数 target等于THIS
		if(i===length){
			target = this;
			i--;
		}
		
		for ( ; i < length; i++ ) {
		//对象属性不为空
		if ( (options = arguments[ i ]) != null ) {
			//继承对象
			for (name in options){
				//检测接口函数命和FN下的是一样的就提示。
//				if(target.hasOwnProperty(name)){
//					SamsungWeb.log("SamsungWeb.fn中"+name+"函数名不可用,已经有了.");
//					continue;
//				}
				
				src = target[name];
				copy = options[name];
              
				// 目标函数已经有的就不覆盖了进行下个循环
				if ( target === copy ) {
					continue;
				}
				//console.log(SamsungWeb.isPlainObject(copy))
				if ( deep && copy && (SamsungWeb.isPlainObject(copy) || (copyIsArray = SamsungWeb.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && SamsungWeb.isArray(src) ? src : [];

					} else {
						clone = src && SamsungWeb.isPlainObject(src) ? src : {};
					}

					//深COPY SamsungWeb.fn
					target[ name ] = SamsungWeb.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					//浅COPY SamsungWeb
					target[ name ] = copy;
					//console.log(target[ name ])
				}
				
			
			}
		}
	}
	//返回目标函数
	return target;
	}
	
	SamsungWeb._S=_$;
	
	SamsungWeb.extend({
		/**
		 *检测是否为FUNCTION 依据JQUERY版本
		 *!!fn 检测不为NULL 和  undefiend NaN 
		 */
		isFunction:function(fn){
			  return !!fn&&typeof fn!="string"&&!fn.nodeName&&
			  fn.constructor!=Array&&/^\s?function/.test(fn);
		},
		/**
		是否为纯净的JAVASCRIPT对象，用于深拷贝.避开WINDOW那样自己引用自己的对象.
		*/
		isPlainObject:function(obj){
			 //基础类型不是OBJECT 有DOM节点 和 是WINDOW对象 
			 if($S.type(obj,object)||obj.nodeType||$S.isWindow(obj)){
			 	   return false;
			 }
			 
			 //回溯最新的原型对象是否有 isPrototypeOf  旧版本的IE 不暴露 constructor propertype
			 try{
			 	//检测有原型 检测出来原型没有 isPrototypeOf方法.
			 	if(obj.constructor&&!hasOwn.call(obj.constructor.prototype,"isPrototypeOf")){
			 		 return false;
			 	}
			 	
			 }catch(e){
			 	return false;
			 	//TODO handle the exception
			 } 
			 return true;
		},
		/**
		直接用数组自带的isArray
		*/
		isArray:function(obj){
			  return Array.isArray;
		},
		isString:function(obj){
			  return $S.type(obj,"String");
		},
	   /**
         * 用于取得数据的类型（一个参数的情况下）或判定数据的类型（两个参数的情况下）
         * @param {Any} obj 要检测的东西
         * @param {String} str 可选，要比较的类型
         * @return {String|Boolean}   
         */
		type:function(obj,str){
		   //obj!=null 检测null obj!=obj 检测NAN  nodeName节点的NAME 例如DIV
		   var result=class2type[(obj!=null||obj!==obj?obj:toString.call(obj))]||obj.nodeName||"#";
		   
		   //处理IE 6 7 8
		   if(result.charAt(0)=="#"){
		   	    if(obj==obj.document&&obj.document!=obj){
		   	    	result="Window";
		   	    }else if(obj.callee){
		   	    	result="Arguments";
		   	    }else if(isFinite(obj.length)&&obj.item){
		   	    	result="NodeList"
		   	    }else{
		   	    	//截取8,-1数组
		   	    	result=toString.call(obj).slice(8,-1);
		   	    }
		   }
		   if(str){
		   	  //不区分大小写检测
		   	  return str.toLowerCase()==result.toLowerCase();
		   }
		   return result;
		},
		log:function(){
			try{
				   console.log.apply(console,arguments);
			}catch(e){
				try{
				   opera.postError.apply(opera,arguments);	
				}catch(e){
				   alert(Arr.join.call(arguments," "))
				}
			}
		}
	})
	
	SamsungWeb.noop=function(){};
	
	
	//IE下检测DOM树是否完成
	function doScorllCheck(){
		try{
		  //DOM 未建完之前处理doScroll抛出错误.
		  HTML.doScroll("left");
		  fireReady();
			
		}catch(e){
		  //延迟再试
		  setTimeout(doScorllCheck,31);
			//TODO handle the exception
		}
	}
	
	
	//绑定事件简化版
	SamsungWeb.extend({
         bind:W3C?function(el,type,fn,phase){
         	  el.addEventListener(type,fn,!!phase);
         	  return fn;
         }:function(el,type,fn){
         	  el.attachEvent("on"+type,fn);
         	  return fn;
         },
         unbind:W3C?function(el,type,fn,phase){
         	  el.removeEventListener(type,fn||SamsungWeb.noop,!!phase);
         }:function(el,type,fn){
         	 if(el.detachEvent){
         	 	el.detachEvent(type,fn||SamsungWeb.noop);
         	 }
         }
	})
	
	//domReady
	var readyList=[],readyFn,ready=W3C?"DOMContentLoaded":"readystatechange";
	SamsungWeb.extend({
	     ready:function(fn){
	     	if(readyList){
	     		readyList.push(fn);
	     	}else{
	     		fn();
	     	}
	     }
	})
	
	
	function fireReady(){
	  _init();
	  for(var i=0,fn;fn=readyList[i++];){
	       fn();
	  }
	  readyList=null;
	  if(readyFn){
	  	  SamsungWeb.unbind(DOC,ready,readyFn);
	  }
	  
	  //清空免得2次加载
	  fireReady=SamsungWeb.noop;
	}
	
	
	function _init(){
		SamsungWeb.assert=function(){
		 	return new SamsungWeb.Hassert();
		}();
	}
	
//	//火狐3.6不存在 readyState 属性
//	if(!DOC.readyState){
//		 var readyState=DOC.readyState=DOC.body?"complete":"loaded";
//		 
//	}


	if(DOC.readyState==="complete"){
		 
		 fireReady();//如果在domReady之外加载
	}else{
		 SamsungWeb.bind(DOC,ready,readyFn=function(){
		 	  if(W3C||DOC.readyState==="complete"){
		 	  	 fireReady();
		 	  }
		 })
		 
		 //如果跨域报错，哪时就肯定存在2个窗口
		 if(HTML.doScroll&&self.eval===parent.eval){
		 	 doScorllCheck();
		 }	
	}
	
	
	
	//断言
	SamsungWeb.extend({
		Hassert:function(){
			var target=this,queue=[],paused=false,results=DOC.createElement("ul");
			DOC.body.appendChild(results);
			
			target.test=function(name,fn){
			    queue.push(function(){
			    	 results=target.assert(true,name).appendChild(DOC.createElement("ul"));
			    	 fn();
			    })
			    runTest();
			}
			
			target.pause=function(){
				paused=true; 
				//$S.log("paused",paused);
			}
			
			
			target.resume=function(){
				paused=false;
				setTimeout(runTest,1);
			}
			
			function runTest(){
				 if(!paused&&queue.length){
				 	  queue.shift()();
				 	  if(!paused){
				 	  	  target.resume();
				 	  }
			     }
                 
			}
			
			target.assert=function(value,desc){
				 var li=DOC.createElement("li");
				 li.appendChild(DOC.createTextNode(desc));
				 
				 if(!value){
				 	 li.style["textDecoration"]="line-through";
			         li.style.color="red";
				 }
				 results.appendChild(li);
				 return li;
			}
			
			
			return target;
			
		}
	})
	
	
	//检测浏览器环境
    var OS_PC = "pc",OS_PC_IE8="MSIE 8.0",OS_IPHONE = "iPhone",OS_IPOD = "iPod",OS_IPAD = "iPad",
    OS_ANDROID = "Android",OS_WEIXIN="micromessenger"
    
    //全局变量
    SamsungWeb.LGlobal=(function(){
	 function LGlobal(){
	 	 throw "SamsungWeb.LGlobal cannot be instantiated";
	 }
	 LGlobal.mobile = false;
	 LGlobal.os = OS_PC;
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
		if (n.indexOf(OS_IPHONE) > 0) {
			LGlobal.os = OS_IPHONE;
			LGlobal.canTouch = true;
			LGlobal.ios = true;
		} else if (n.indexOf(OS_IPOD) > 0) {
			LGlobal.os = OS_IPOD;
			LGlobal.canTouch = true;
			LGlobal.ios = true;
		} else if (n.indexOf(OS_IPAD) > 0) {
			LGlobal.os = OS_IPAD;
			LGlobal.ios = true;
			LGlobal.canTouch = true;
		} else if (n.indexOf(OS_ANDROID) > 0) {
			LGlobal.os = OS_ANDROID;
			LGlobal.canTouch = true;
			LGlobal.android = true;
			var i = n.indexOf(OS_ANDROID);
			if(parseInt(n.substr(i + 8, 1)) > 3){
				LGlobal.android_new = true;
			}
		}else if(n.indexOf(OS_PC_IE8)>0){
			LGlobal.ispcIE8=true;	
		}
		LGlobal.mobile = LGlobal.canTouch;
	 })(navigator.userAgent);
	 
	  return LGlobal;
	 })();
	
	 //自定义事件
	 SamsungWeb.extend({
	 	  HEvent:function(){
	 	  	  var target=this;
	 	  	  var _listener={};
	 	  	  var args;
	 	  	  target.add=function(type,fn){
	 	  	  	  if(arguments.length>2){
	 	  	  	  	 args=Slice.call(arguments).slice(2).join(',');
	 	  	  	  }
	 	  	  	  if(SamsungWeb.isString(type)&&SamsungWeb.isFunction(fn)){
	 	  	  	  	    if(typeof _listener[type]==="undefined"){
	 	  	  	  	    	 _listener[type]=[{sfn:fn,arg:args}];
	 	  	  	  	    }else{
	 	  	  	  	    	 _listener[type].push({sfn:fn,arg:args});
	 	  	  	  	    }
	 	  	  	  }
	 	  	  }
	 	  	  
	 	  	  function find(type,fn){
	 	  	  	 var i=0;
	 	  	  	 var len=_listener[type].length;
	 	  	  	 
	 	  	  	 for(;i<len;i++){
	 	  	  	 	   if(_listener[type][i].sfn===fn){
	 	  	  	 	   	    return i
	 	  	  	 	   }
	 	  	  	 }
	 	  	  	 return -1;
	 	  	  }
	 	  	  
	 	  	  target.removeEvent=function(type,fn){
	 	  	  	   var id=find(type,fn)
	 	  	  	   if(id!=-1){
	 	  	  	   	   _listener[type].splice(id,1);
	 	  	  	   }
	 	  	  }
	 	  	  
	 	  	  target.dispatchEvent=function(type){
	 	  	  	   if(type&&_listener[type]){
	 	  	  	   	  
	 	  	  	   	   var events={
	 	  	  	   	   	   type:type,
				   	       target:target,
	 	  	  	   	   },i=0
	 	  	  	   	  
	 	  	  	   	   for(;i<_listener[type].length;i++){
	 	  	  	   	   	      events.args=_listener[type][i].arg;
	 	  	  	   	   	      _listener[type][i].sfn.call(this,events);
	 	  	  	   	   }
	 	  	  	   }
	 	  	  }
	 	  	  
	 	  	   return target
	 	  }
	 })
	 
	
     //时间类
     SamsungWeb.extend({
     	Htimer:function(){
     		var timenum,nameTime,lastTime=0;
     		var target=this;
     		var timeE=new SamsungWeb.HEvent();
     		var LeventName="COMPLETE";
            var removefn;
            //侦听完成事件
     		target.addListener=function(fn){
     			removefn=fn;
     			timeE.add(LeventName,removefn);
     		}
     		
     		//删除事件
     		target.removeListener=function(){
     			timeE.removeEvent(LeventName,removefn);
     		}
     		
     		
     		target.setLastTime=function(lastime){
     			lastTime=lastime;
     			return lastTime;
     		}
     		
     		target.SetInter=function(timenum){
     			timenum=timenum;
     			nameTime=w.setInterval(function(){
     				var now=new Date().getTime();
     				//console.log(now);
     				//console.log(lastTime)
     				if(now-lastTime>timenum){
     					 timeE.dispatchEvent(LeventName);
     				} 
     			},timenum)
     		}
     		
     		target.StopInter=function(){
     			w.clearInterval(nameTime);
     		}
     		return target;
     	}
     })
     
    
     //BIND绑定类
     SamsungWeb.extend({
     	  Hbind:function(c,n){
     	  	 if(c[n]){
     	  	 var args=Slice.call(arguments).slice(2);
     	  	 return c[n].apply(c,args);
     	  	 }
     	  }
     })
     
     
     //原型继承  
     var initializing=false,fnTest=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;
     SamsungWeb.Class=function(){};
     SamsungWeb.Class.extend=function(prop){
     		  var baseClass=null;
     		  if(this!=SamsungWeb.Class){
     		  	   baseClass=this;
     		  }
     		  
     		  function F(){
     		  	 if(!initializing&&this.init){
     		  	 	  if(baseClass){
     		  	 	  	 //保存父级原型
     		  	 	  	 this._superpropertype=baseClass.prototype;
     		  	 	  }
     		  	 	  this.init.apply(this,arguments);
     		  	 }
     		  }
     		  
     		  //扩展类
     		  if(baseClass){
     		  	  initializing=true;
     		  	  F.prototype=new baseClass();
     		  	  F.prototype.constructor=F;
     		  	  initializing=false;
     		  }
     		  
     		  //继承的类都有extend
     		  F.extend=arguments.callee;
     		  
     		  for(var name in prop){
     		  	 
     		  	 if(prop.hasOwnProperty(name)){
     		  	 F.prototype[name]=typeof prop[name]=="function"&&
     		  	 typeof F.prototype[name]==="function"&&
     		  	 fnTest.test(prop[name])?
     		  	 (function(name,fn){
     		  	 	return function(){
     		  	 		this._super=baseClass.prototype[name];
     		  	 		return fn.apply(this,arguments)
     		  	 	}
     		  	 })(name,prop[name]):prop[name]
 
     		  	 }
     		  }
     		  return F;
     };

     //AJAX类
     SamsungWeb.extend({
     	   HttpAjax:function(){
     	   	   var target=this;
     	   	   target.submitDataJson=function(url,d,callback){
     	   	   	    	var self=this;
						self.Callback=callback;
						SamsungWeb._S.getJSON(url+"?callback=?",d,function (data) {
							if(typeof self.Callback==="function"){
					             self.Callback(data);
					        }
					    }
					    );
     	   	   	
     	   	  };
     	   	  
     	   	  target.submitDatajsonp=function(url,d,callback,str1,str2){
     	   	  	      var self=this;
					  self.Callback=callback;
					  SamsungWeb._S.ajax({
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
     	   	  	
     	   	  };
     	   	  
     	   	  target.submitData=function(url,d,callback,txt,method){
     	   	  	    this.method=method||"post";
					this.datatype=txt||"json";
					this.Callback=callback;
					var self=this;
					SamsungWeb._S.ajax({
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
     	   	  
     	   	  return target
     	   }
     })
     var
	//闭包赋予w._SamsungWeb w.$S用户名为undefined;
	 _SamsungWeb = w.SamsungWeb,_$S = w.$S;
	 
	 //防止$S用户名冲突  就是把$S 和 w.SamsungWeb 用户名设置为undefined 返回 SamsungWeb 自己重新取个名字 
	 SamsungWeb.noConflict = function( deep ) {
		if ( w.$S === SamsungWeb ) {
			w.$S = _$S;
		} 
		if (deep&&w.SamsungWeb===SamsungWeb) {
			w.SamsungWeb = _SamsungWeb;
		}
		return SamsungWeb;
	 };
	 
	 w.$S=w.SamsungWeb=SamsungWeb;
     
	 return SamsungWeb;
})(typeof jQuery!='undefined'?jQuery:undefined,window);


//辅助原型方法
if(!Function.prototype.bind){
	  Function.prototype.bind=function(mc){
	  	   var _this=this,_bind=mc,args=Array.prototype.slice(arguments);
	  	   return _this.apply(_bind,args)
	  }
}
