SamsungWeb.extend({
	HFrameAn:function(options,progress,complete){
        var target=this;
        var defaultVal={
        	frametotal:36,
        	endFrame:0,
        	currentframe:0,
        	imgcurrent:1,
        	ext:'.png',
        	imgPath:'../img/png/',
        	id:'#An',
        	zeroBased:'0',
        	playSpeed:'100',
        	autoplayDirection:3,
        	dragging:false,
        	pointerStartPosX:0,
        	pointerEndPosX:0,
        	pointerDistance:0,
        	speedMultiplier:1,
            currentTargets:null,
            monitorStartTime:0,
            monitorInt:30,
            disableWrap:false,
            ticker:0,
            autoplay:false,
            play:null,
            frames:[]
        }
        
        var obj=SamsungWeb.extend(defaultVal,options);
        //console.log(obj)
        var $id=$(obj.id);
        //console.log(obj)
        
		target.progress=progress||function(){};
		target.complete=complete||function(){};
		
		
		//以1开头
		var _downcurrent=1;
		

		function loadImages(){
			var div,imgName;
			
			if(_downcurrent>obj.frametotal){
				obj.frames[obj.currentframe].className="on";
				obj.currentTargets=obj.frames[obj.currentframe];
				//console.log(obj.currentTargets);
			    target.complete();
			    
			    addEvent();
				return;
			}
			
			
			div=document.createElement("div");
			
			var imgZ=_downcurrent<=9?obj.zeroBased:'';
			
			imgName=obj.imgPath+imgZ+_downcurrent+obj.ext;
	
			var img=new Image();
			
			img.onload=function(){
				 div.appendChild(img);
				 $id.append(div);
				 obj.frames.push(div);
				 
				
				 var per=Math.floor(_downcurrent/obj.frametotal*100);
				 _downcurrent++;
				
				 target.progress(per);
				 //重复添加
				 loadImages();
			}
			img.src=imgName;
		}
		
		
		function addEvent(){
			$id.on("mousedown touchstart",downfn);
		}
		
		function downfn(event){
			 //console.log($id)
			 event.preventDefault();
			 if(event.type === 'mousedown' || event.type === 'touchstart') {
              obj.pointerStartPosX = getPointerEvent(event).pageX;
              //console.log('PosX',obj.pointerStartPosX);
              obj.dragging = true;
              $id.on("mousemove touchmove",movefn);
			  $id.on("mouseup touchend",endfn);
			  $(document).on("mouseup touched",endfn);
              //console.log("1",obj.dragging)
             }
		}
		
		function movefn(event){
			//console.log($id)
			if(obj.dragging){
				event.preventDefault();
				
				trackPointer(event);
			}
			
		}
		
		function endfn(event){
			$id.off("mousemove touchmove",movefn);
			$id.off("mouseup touchend",endfn);
			$(document).off("mouseup touched",endfn);
			obj.dragging=false;
		}
		
		
		function getPointerEvent(event){
		  return event.originalEvent.targetTouches ? event.originalEvent.targetTouches[0] : event;
		}
		
		function refresh() {
			target.StartAuto();
	    }
    
    
		function trackPointer(event) {
	
		//console.log("3",obj)
       if (obj.dragging) {
          obj.pointerEndPosX = getPointerEvent(event).pageX;
        if (obj.monitorStartTime < new Date().getTime() - obj.monitorInt) {
          obj.pointerDistance = obj.pointerEndPosX - obj.pointerStartPosX;
          
         // console.log(obj.pointerDistance/$id.width());
          
          if(obj.pointerDistance > 0){
          obj.endFrame = obj.currentframe + Math.ceil((obj.frametotal - 1) * obj.speedMultiplier * (obj.pointerDistance / $id.width()));
          }else{
          obj.endFrame = obj.currentframe + Math.floor((obj.frametotal - 1) * obj.speedMultiplier * (obj.pointerDistance / $id.width()));
          }
          refresh();
          obj.monitorStartTime = new Date().getTime();
          obj.pointerStartPosX = getPointerEvent(event).pageX;
        }
        }
        };
		
		//左右拖拉的
		var Htime=new $S.Htimer();
		
		//自动播放 
		var autoPlayTime=new $S.Htimer();
		
		target.AutoPlay=function(speed){
			 var _speed = speed || obj.playSpeed;
		      if (!obj.autoplay) {
		        obj.autoplay = true;
		        obj.play = setInterval(moveToNextFrame,_speed);
		     }
		}
		
        function moveToNextFrame(){
        	  if (obj.autoplayDirection === 1) {
		        obj.endFrame -= 1;
		      } else {
		        obj.endFrame += 1;
		      }
		      refresh();
        }
		
		function stop(){
			obj.autoplay = false;
			window.clearInterval(moveToNextFrame);
		}
		
		
		target.StartAuto=function(){
			if(obj.ticker===0){
			   Htime.SetInter(obj.playSpeed);
			}
		}
		
		Htime.addListener(function(){
		  
		   var frameEasing;
		      if (obj.currentframe !== obj.endFrame) {
		      	
		      	//console.log("11",(obj.endFrame - obj.currentframe) * 0.1)
		        frameEasing = obj.endFrame < obj.currentframe ? Math.floor((obj.endFrame - obj.currentframe) * 0.1) : Math.ceil((obj.endFrame - obj.currentframe) * 0.1);
	           // console.log(frameEasing)
		        hidePreviousFrame();
		        
		        obj.currentframe += frameEasing;
                //console.log("obj.frametotal",obj.frametotal);
                
		        if(obj.currentframe<0){
		            obj.currentframe=(obj.frametotal+frameEasing);
		            obj.endFrame=obj.currentframe;
		        }
		        
		      
		        if(obj.currentframe>(obj.frametotal-1)){
		        	obj.currentframe=0;
		        	obj.endFrame=obj.currentframe;
		        }
		        
		        showCurrentFrame();
		      
		      } else {
		        target.StopTime();
		      }
	    })
		
		
		function hidePreviousFrame(){
			//console.log(obj.currentTargets);
			
			if(obj.currentTargets){
			   obj.currentTargets.className='';
			}
		}
		
		function showCurrentFrame(){
			
			//console.log(obj.currentTargets);
			 obj.frames[obj.currentframe].className="on";
	 	     obj.currentTargets=obj.frames[obj.currentframe];
	 	     //console.log(obj.currentTargets);
		}
		
		target.StopTime=function(){
			 //关闭
	 	     Htime.StopInter();
	 	     obj.ticker=0;
		}
		
		loadImages();
		
		return target;
	}
})