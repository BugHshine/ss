(function(exports, doc) {
  
  // 兼容低版本 IE
  Function.prototype.bind = Function.prototype.bind || function(context) {
    var that = this;
    return function() {
      return that.apply(context, arguments);
    };
  };
  
  var T = {};

  // 工具方法 begin
  T.getElementsByClassName = function(cls) {
  	
    if (doc.getElementsByClassName)
      return doc.getElementsByClassName(cls);

    var o = doc.getElementsByTagName("*")
      , rs = [];

    for (var i = 0, t, len = o.length; i < len; i++) 
      (t = o[i]) && ~t.className.indexOf(cls) && rs.push(t);
    
    //$S.log(rs)
    return rs;
  };

  T.addEvent = function(ele, type, fn) {
    ele.attachEvent ? ele.attachEvent("on" + type, fn) : ele.addEventListener(type, fn, false);
  };

  T.removeEvent = function(ele, type, fn) {
    ele.detachEvent ? ele.detachEvent("on" + type, fn) : ele.removeEventListener(type, fn, false);
  };

  T.getPos = function(ele) {
    var pos = {
      x: 0,
      y: 0
    };
    
    //ele 距离顶端的offsetTop距离
    //console.log("ee",pos.y,ele.offsetTop)
    while (ele.offsetParent) {
      pos.x += ele.offsetLeft;
      pos.y += ele.offsetTop;
      ele = ele.offsetParent;
    }
    
      //console.log("ele",ele)
    //console.log(ele.offsetLeft,ele.offsetTop)
    return pos;
  };

  T.getViewport = function() {
    var html = doc.documentElement;
    //窗口可视高度和宽度
    return { 
      w: !window.innerWidth ? html.clientHeight : window.innerWidth,
      h: !window.innerHeight ? html.clientHeight : window.innerHeight
    };
  };

  T.getScrollHeight = function() {
  	//网页被卷去的高： document.body.scrollTop;
    html = doc.documentElement, bd = doc.body;
    //console.log(window.pageYOffset,html.scrollTop,bd.scrollTop);
    var max=Math.max(window.pageYOffset || 0, html.scrollTop, bd.scrollTop);
    return max;
  };

  T.getEleSize = function(ele) {
  	//容器宽和高包括BORDE margin padding宽度和高度
    return {
      w: ele.offsetWidth,
      h: ele.offsetHeight
    };
  };
  // 工具方法 end
  T.datalazyload = {
    threshold: 0,  // {number} 阈值，预加载高度，单位(px)
    els: null,  // {Array} 延迟加载元素集合(数组)
    fn: null,   // {Function} scroll、resize、touchmove 所绑定方法，即为 pollTextareas()

    evalScripts: function(code) {
      var head = doc.getElementsByTagName("head")[0];
			var script= document.createElement('script'); 
			script.type= 'text/javascript'; 
			var zz=/src="[\S\s]*.js/
			var src=code.match(zz)[0].replace('src="',"")
			//console.log(src)
			script.src= src; 
			head.appendChild(script); 
        //, js = doc.createElement("script");

      //js.text = code;
      //console.log(js.text)
       //console.log(head.insertBefore)
      //head.insertBefore(code, head.firstChild);
      //head.removeChild(js);
      //head.innerHTML+=code;
    },

    evalStyles: function(code) {
      var head = doc.getElementsByTagName("head")[0];
      //alert(head)
      if(!+"v1"){
      	//alert(head.innerHTML);
      	  var zz=/href="[\S\s]*.css/
			    var src=code.match(zz)[0].replace('href="',"")
			    
			    //alert(src)
          var link=doc.createElement("link");  
			    link.setAttribute("rel", "stylesheet");  
			    link.setAttribute("type", "text/css");  
			    link.setAttribute("href", src); 
			    head.appendChild(link);  
      	//head.appendChild(code)
       //head.html+=code;	
       //head.innerHTML+=code;
       //alert("333")
      }else{
       head.innerHTML+=code;	
      }
 
       // , css = doc.createElement("style");

//    css.type = "text/css";
//    try {
//      css.appendChild(doc.createTextNode(code));
//    } catch (e) {
//      css.styleSheet.cssText = code;
//    }
     // head.appendChild(code);
    },

    extractCode: function(str, isStyle) {
      var cata = isStyle ? "link" : "script"
        , scriptFragment = "<" + cata + "[^>]*>([\\S\\s]*?)</" + cata + "\\s*>"
        , matchAll = new RegExp(scriptFragment, "img")
        , matchOne = new RegExp(scriptFragment, "im")
        , matchResults = str.match(matchAll) || [] 
        , ret = [];
        
        //console.log("matchOne",matchOne)

      for (var i = 0, len = matchResults.length; i < len; i++) {
        var temp = (matchResults[i].match(matchOne) || [ "", "" ])[0];
        //console.log(temp)
        temp && ret.push(temp);
      }
      return ret;
    },

    decodeHTML: function(str) {
      return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    },
    
    insert: function(ele) {
      var parent = ele.parentNode
        , txt = this.decodeHTML(ele.innerHTML)
        , matchStyles = this.extractCode(txt, true)
        , matchScripts = this.extractCode(txt);
        //console.log(matchScripts)
      //console.log(parent)
      var tx=txt.replace(new RegExp("<script[^>]*>([\\S\\s]*?)</script\\s*>", "img"), "").replace(new RegExp("<link[^>]*>([\\S\\s]*?)</link\\s*>", "img"), "");
      //console.log(tx)
      parent.innerHTML = tx;
      
      if (matchStyles.length) 
        for (var i = matchStyles.length; i --;)
          this.evalStyles(matchStyles[i]);

      // 如果延迟部分需要做 loading 效果
      //parent.className = parent.className.replace("loading", "");

      if (matchScripts.length) 
        for (var i = 0, len = matchScripts.length; i < len; i++) 
          this.evalScripts(matchScripts[i]);
    },

    inView: function(ele) {
      var top = T.getPos(ele).y
        , viewVal = T.getViewport().h
        , scrollVal = T.getScrollHeight()
        , eleHeight = T.getEleSize(ele).h;


      //console.log(top,viewVal,scrollVal,eleHeight);
      
      //console.log(top,(scrollVal - this.threshold),(scrollVal + viewVal + this.threshold))
      if (top >= scrollVal - this.threshold && top <= scrollVal + viewVal + this.threshold) {
        
        return true;
      }

      return false;
    },

    pollTextareas: function() {
      // 需延迟加载的元素已经全部加载完
      if (!this.els.length) {
        T.removeEvent(window, "scroll", this.fn);
        T.removeEvent(window, "resize", this.fn);
        T.removeEvent(doc.body, "touchMove", this.fn);
        return;
      }

      // 判断是否需要加载
      for (var i = this.els.length; i--;){
        var ele = this.els[i];
        
        if (!this.inView(ele)) 
          continue;

        this.insert(ele);
        this.els.splice(i, 1);
      }
    },

    init: function(config) {
      var cls = config.cls;
      this.threshold = config.threshold ? config.threshold : 0;
      
      this.els = Array.prototype.slice.call(T.getElementsByClassName(cls));
    
      this.fn = this.pollTextareas.bind(this);
      //alert(this.fn())
      //alert(this.fn)
      //if(this.fn){
      this.fn();
      //}
      //T.addEvent(window, "scroll", this.fn);
      //T.addEvent(window, "resize", this.fn);
     // T.addEvent(doc.body, "touchMove", this.fn);
    }
  };

  exports["T"] = T;
})(window, document);