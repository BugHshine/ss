/***
 * 依赖 ScrollCAndL.js
 *
 */
SamsungWeb.extend({
	HBigrender:function(opaction){
		var target=this;
		/**
		 * el class或者id
		 * threshold 距离窗口显示的  px
		 * startType 开启是滚动条模式延迟加载 还是手动加载
		 * startParentH 一般都要开启取父级高度
		 * */
		var defaultVal={
			"el":".datalazyload",
			"threshold":0,
			"startType":true,
			"startParentH":true
		}
		
		var tags=/^(link|script)$/i;
		var tagattr=/(href="|src=")/i;
		
		var obj=SamsungWeb.extend(defaultVal,opaction);
		var addScroll=null;
		
		target.init=function(){
			if(obj.startType){
				addScroll=new $S.ScrollCAndL(obj,target.Returnover);
				addScroll.init();
				addScroll.addEvents();
			}
		}
		
		function convert(html,tagss){
			return html.replace(/(<(\w+)[^>]*?)\/>/gm,function(all,front,tag){
				return tagss.test(tag)?front+"></"+tag+">":all;
			})
		}
		

		
		target.Returnover=function(b,mc){
			 if(b){
			 	 target.insert(mc);
			 	 addScroll.removeArr(mc);
			 }
		}
		
		function extractCode(str) {
		//为link script加</link></script>
		var styles=convert(str,tags); 	
		
		var matchStyles=ParseDate(styles,"style");
		var linkStyles=ParseDate(styles,"link");
		var matchScripts=ParseDate(styles,"script");
        
        
        if(linkStyles.length){ 
            for (var i = linkStyles.length; i --;)
            evalStyles(linkStyles[i]);
        }
        
        if(matchStyles.length){ 
            for (var i = matchStyles.length; i --;)
            evalStyles(matchStyles[i]);
        }
        
        
        if(matchScripts.length){
        	 for (var i = matchScripts.length; i --;)
            evalScripts(matchScripts[i]);
        	
        }
        }
	  
	  
	  //解析所有可能的数据格式
	  function ParseDate(str,date){
	  var scriptFragment = "<" + date + "[^>]*>([\\S\\s]*?)</" + date + "\\s*>"
      , matchAll = new RegExp(scriptFragment, "img")
      , matchOne = new RegExp(scriptFragment, "im")
      , matchResults = str.match(matchAll) || [] 
      , ret = [];

	  for(var i = 0, len = matchResults.length; i < len; i++) {
	       var temp = (matchResults[i].match(matchOne) || [ "", "" ])[0];
	       temp && ret.push(temp);
	  }
	  return ret;	 
	  }
	  
	  //将textarea中的符号进行转换
	  function decodeHTML(str){
         return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
      }
	  
	  
      function evalScripts(code){
      var head = document.getElementsByTagName("head")[0];
			var script= document.createElement('script'); 
			script.type='text/javascript'; 
			var zz=/src="[\S\s]*.js/
			var tags=code.match(zz);
			if(tags){
			   var src=tags[0].replace('src="',"");
			   script.src= src; 
			   //head.appendChild(script); 
			   head.insertBefore(script, head.lastChild);
			}else{
			   var js = document.createElement("script");
               //console.log(code);
               var strs=code.replace("<script>","").replace("</script>","");
		       js.text = strs;
		       head.insertBefore(js, head.firstChild);
		       head.removeChild(js);	
			}
      }
    
	  function evalStyles(code){
      var head = document.getElementsByTagName("head")[0];
  
      var zz=/href="[\S\s]*.css/
      var tags=code.match(zz);
      if(tags!=null){
      	  var src=tags[0].replace('href="',"");
	      var link=document.createElement("link");  
		  link.setAttribute("rel", "stylesheet");  
		  link.setAttribute("type", "text/css");  
		  link.setAttribute("href", src); 
		  head.appendChild(link);  
      }else{
      	  var strs=code.replace("<style>","").replace("</style>","");
      	  var css = document.createElement("style");
      	  css.type = "text/css";
	      try {
	        css.appendChild(document.createTextNode(strs));
	      } catch (e) {
	        css.styleSheet.cssText = strs;
	      }
	      head.appendChild(css);
      }
	  }
	  
	  target.insert=function(ele){
      var parent = ele.parent()
        , txt = decodeHTML(ele.html())
      var tx=txt.replace(new RegExp("<script[^>]*>([\\S\\s]*?)</script\\s*>", "img"), "").replace(new RegExp("<style[^>]*>([\\S\\s]*?)</style\\s*>", "img"), "").replace(new RegExp("<link[^>]*([\\S\\s]*?)/>$", "img"), "");
      parent[0].innerHTML = tx;
      //判断LINK SCRTIP 后缀有没有加.
      extractCode(txt);
      }

	  return target;
	}
})