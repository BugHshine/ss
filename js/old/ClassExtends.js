 (function(){
        var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
        this.Class = function(){};
        Class.extend = function(prop) {
            var _super = this.prototype;
            initializing = true;
            var prototype = new this();
            initializing = false;
            for (var name in prop) {
          if(typeof prop[name] == "function" &&typeof _super[name] == "function" && fnTest.test(prop[name])){
          	  prototype[name]=(function(name, fn){
                        return function(){
                            var tmp = this._super;
                            this._super = _super[name];
                            var ret = fn.apply(this, arguments);
                            this._super = tmp;
                            return ret;
                        };
                    })(name, prop[name])
             }else{
           	     prototype[name]=prop[name]
             }
            }
            function Class() {
                if ( !initializing && this.init )
                    this.init.apply(this, arguments);
            }
            Class.prototype = prototype;
            Class.constructor = Class;
            Class.extend = arguments.callee;
            return Class;
        };
    })();

       

	    var Foo = Class.extend({
	        qux: function() {
	            return "Foo.qux";
	        }
	    });

        var Bar = Foo.extend({
		    qux: function() {
		        return "Bar.qux, " + this._super();
		    }
		});
		

        Bar.qux