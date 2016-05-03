//正则的检测类
SamsungWeb.extend({
	  HregExp:function(){
	  	var trimreg=/(^\s*)|(\s*$)/g,alltrim=/(\s*)/g,
	  	emailreg=/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
	  	
	  	return{
	  		//去除前后的空格
	  		trim:function(str){
	  			return str.replace(trimreg,"");
	  		},
	  		//去除所有的空格
	  		alltrim:function(str){
	  			var str1=this.trim(str);
	  			return str1.replace(alltrim,"");
	  		},
	  		//检测EMAIL
	  		matchEmail:function(str){
	  		   var str1=this.trim(str);
	  		   if(str1.match(emailreg)){
	  		   	 return true;
	  		   }else{
	  		   	 return false;
	  		   }
	  		},
	  		//取URL&id后面的参数
	  		getQueryString:function(name){
	  			var reg,r=window.location.search.substr(1);
	  			
	  			if(name){
	  				reg=new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	  				r=r.match(reg);
	  				
			        if (r != null) return unescape(r[2]);return null;
	  			}else{
	  				reg=/(\w+)=([^&]*)/ig;
	  				r=r.match(reg);
	  				var arr=[],temparr=[];
	  			    //console.log(r)
	  			    if(r==null) return null;
	  				
	  				for(i in r){
	  					temparr=r[i].split("=");
	  					//console.log(temparr)
	  				    for(j in temparr){
	  				      //console.log(arr[temparr[0]])
	  				      if(!arr[temparr[0]]){
	  				      arr[temparr[0]]=temparr[1];
	  				      }
	  				    }
	  				}
	  				return arr;
	  			}
	  		}
	  	}
	  }()
});