SamsungWeb.extend({
	 kv:function(){
	 	var target=this;
	 	var p='private'
	 	target.name='gg'
	 	//私有方法
	 	function init(){
	 		function inits(){
	 	
	 		}
	 		
	 	}
	 	
	 	//公有方法
	 	target.pulicmethod=function(){
	 		 
	 	}
	 	
	 	return target;
	 }
})


var a=new $S.kv();
a.init();
a.pulicmethod();
console.log(a.p)