function base (d, b, a) {
	var p = null, o = d.constructor.prototype, h = {};
	if(d.constructor.name == "Object"){
		console.warn( "When you use the extends. You must make a method like 'XX.prototype.xxx=function(){}'. but not 'XX.prototype={xxx:function(){}}'.");
	}
	//console.log(typeof d.__ll__parent__)
	if (typeof d.__ll__parent__ == "undefined") {
		d.__ll__parent__ = [];
		d.__ll__parent__ = [];
	}
	d.__ll__parent__.push(b.prototype);
	console.log(d.__ll__parent__)
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

var LExtends = base;

