SamsungWeb.extend({
	Hthree:function(){

		var target=this,renderer,scene,camera; 
		
		
		//创建渲染器
		target.createRender=function(){
			 renderer = new THREE.WebGLRenderer();
             renderer.setSize(window.innerWidth, window.innerHeight);
             document.body.appendChild(renderer.domElement);
		}
		
		//创建场景
		target.createScene=function(){
			scene = new THREE.Scene();
		}
		
		
		//创建透视相机  默认做测试用 以后改 
		target.createCamera=function(){
			camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
			camera.position.set(0, 0, 5);
		}
		
		//材质添加到场景中
		target.add=function(mc){
			 scene.add(mc);
		}
		
		
		//渲染
		target.getrenderer=function(){
			  return renderer;
		}
		
		
		//场景
		target.getscene=function(){
			  return scene;
		}
		
		
		//场景
		target.getcamera=function(){
			  return camera;
		}
		
		return target;
	}
})



