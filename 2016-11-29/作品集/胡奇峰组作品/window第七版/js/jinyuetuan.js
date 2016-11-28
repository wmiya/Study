window.onload = function(){
	//s=83 d=68 f=70 kong=32 j=74 k=75 l=76
	var box = document.getElementById('Ybox');
	var left = box.getElementsByClassName('Yleft');
	var jlist = document.querySelector('.Ylist');
	var lis = jlist.children;
	var llist = document.querySelector('.Ytd');
	var llis = llist.children;
	var life = document.querySelector('.Ylife');
	var spanbold = life.getElementsByTagName('span');
	var Ydefen = document.querySelector('.Ydefen');
	var top = document.getElementById('Ytop');
	var btn = Ytop.getElementsByTagName('input');	
	var middle = document.querySelector('.Ymiddle');
	var gamebtn = document.getElementById('zy_game');
	console.log(gamebtn)
	
	var n=10;
	var arr=[];
	var Ybody = document.querySelector('.Ybody');
	btn[0].onclick = function(){
		top.style.display  ="none";
		box.style.display  ="block";
		setTimeout(function(){
			alert('如果您有幸看到这些字，请感谢您有一颗好心脏');},1000
		)	
	}
	btn[1].onclick = function(){
		top.style.display  ="none";
		alert('不看也得看！谁让你点来的，该！');
		box.style.display  ="block";
	}
	document.onkeydown = function(ev){
		if(ev.keyCode == 83){
			for(var i=0;i<lis.length;i++){
				mTween(lis[0],{opacity:100},100,'linear',function(){
					mTween(lis[0],{opacity:70},100,'linear')
				})
			}	
			var span1 = llis[0].children;
			for(var i=0;i<span1.length;i++){	
				if(span1[i].offsetTop > 325 ){
					spanbold[0].style.display = "none";
				}
				if(span1[i].offsetTop > 300 && span1[i].offsetTop < 335){	
					mTween(span1[i],{opacity:0},300,"linear",function(){
						n+=10;
						Ydefen.innerHTML = n;
						middle.style.display ="inline-block";
						setTimeout(function(){
							middle.style.display = "none";
						},500)
					})
				}
			}		
		}
		
		
		if(ev.keyCode == 68){
			for(var i=0;i<lis.length;i++){
				mTween(lis[1],{opacity:100},100,'linear',function(){
					mTween(lis[1],{opacity:70},100,'linear')
				})
			}
			var span2 = llis[1].children;
			for(var i=0;i<span2.length;i++){	
				if(span2[i].offsetTop > 325 ){
					spanbold[1].style.display = "none";
				}
				if(span2[i].offsetTop > 300 && span2[i].offsetTop < 335){
					mTween(span2[i],{opacity:0},300,"linear",function(){
						n+=10;
						Ydefen.innerHTML = n;
						middle.style.display ="inline-block";
						setTimeout(function(){
							middle.style.display = "none";
						},500)
					})
					
				}
			}	
		}
		
		if(ev.keyCode == 70){
			for(var i=0;i<lis.length;i++){
				mTween(lis[2],{opacity:100},100,'linear',function(){
					mTween(lis[2],{opacity:70},100,'linear')
				})
			}
			var span3 = llis[2].children;
			for(var i=0;i<span3.length;i++){	
				if(span3[i].offsetTop > 325 ){
					spanbold[2].style.display = "none";
				}
				if(span3[i].offsetTop > 300 && span3[i].offsetTop < 335){
					mTween(span3[i],{opacity:0},300,"linear",function(){
						n+=10;
						Ydefen.innerHTML = n;
						middle.style.display ="inline-block";
						setTimeout(function(){
							middle.style.display = "none";
						},500)
					})
				
				}
			}	
		}
		if(ev.keyCode == 32){
			for(var i=0;i<lis.length;i++){
				mTween(lis[3],{opacity:100},100,'linear',function(){
					mTween(lis[3],{opacity:70},100,'linear')
				})
			}
			var span4 = llis[3].children;
			for(var i=0;i<span4.length;i++){	
				if(span4[i].offsetTop > 325 ){
					spanbold[3].style.display = "none";
				}
				if(span4[i].offsetTop > 300 && span4[i].offsetTop < 335){
					mTween(span4[i],{opacity:0},300,"linear",function(){
						n+=10;
						Ydefen.innerHTML = n;
						middle.style.display ="inline-block";
						setTimeout(function(){
							middle.style.display = "none";
						},500)
					})
					
				}
			}	
		}
		if(ev.keyCode == 74){
			for(var i=0;i<lis.length;i++){
				mTween(lis[4],{opacity:100},100,'linear',function(){
					mTween(lis[4],{opacity:70},100,'linear')
				})
			}
			var span5 = llis[4].children;
			for(var i=0;i<span5.length;i++){	
				if(span5[i].offsetTop > 325 ){
					spanbold[4].style.display = "none";
				}
				if(span5[i].offsetTop > 300 && span5[i].offsetTop < 335){
					mTween(span5[i],{opacity:0},300,"linear",function(){
						n+=10;
						Ydefen.innerHTML = n;
						middle.style.display ="inline-block";
						setTimeout(function(){
							middle.style.display = "none";
						},500)
					})
					
				}
			}	
		}
		if(ev.keyCode == 75){
			for(var i=0;i<lis.length;i++){
				mTween(lis[5],{opacity:100},100,'linear',function(){
					mTween(lis[5],{opacity:70},100,'linear')
				})
			}
			var span6 = llis[5].children;
			for(var i=0;i<span6.length;i++){	
				if(span6[i].offsetTop > 325 ){
					spanbold[5].style.display = "none";
				}
				if(span6[i].offsetTop > 300 && span6[i].offsetTop < 335){
					mTween(span6[i],{opacity:0},300,"linear",function(){
						n+=10;
					Ydefen.innerHTML = n;
					middle.style.display ="inline-block";
						setTimeout(function(){
							middle.style.display = "none";
						},500)
					})
					
				}
			}	
		}
		if(ev.keyCode == 76){
			for(var i=0;i<lis.length;i++){
				mTween(lis[6],{opacity:100},100,'linear',function(){
					mTween(lis[6],{opacity:70},100,'linear')
				})
			}
			var span7 = llis[6].children;
			for(var i=0;i<span7.length;i++){	
				if(span7[i].offsetTop > 325 ){
					spanbold[6].style.display = "none";
				}
				if(span7[i].offsetTop > 300 && span7[i].offsetTop < 335){
					mTween(span7[i],{opacity:0},300,"linear",function(){
					n+=10;
					Ydefen.innerHTML = n;
					middle.style.display ="inline-block";
						setTimeout(function(){
							middle.style.display = "none";
						},500)
					})
				}
			}		
		}
		
		if(ev.keyCode){
			for(var i=0;i<spanbold.length;i++){
				if(spanbold[i].style.display == "none"){
					arr.push(i)
				}
			}
		}

		var re = [];
		arr.sort();
		re[0] = arr[0];
		for(var i = 1; i < arr.length; i++){
			if(arr[i] !== re[re.length-1]){
				re.push(arr[i]);
			}
		}
		if(re.length == 7){
			alert('呵呵，别按了，从新开始吧');
			clearInterval(time1)
			clearInterval(time2)
			clearInterval(time3)
			clearInterval(time4)
			clearInterval(time5)
			clearInterval(time6)
			clearInterval(time7)
		}
		
		
	}
	var time1=0;
	var time2=0;
	var time3=0;
	var time4=0;
	var time5=0;
	var inputs = box.getElementsByTagName('input');
	inputs[0].onclick = function(){
		inputs[0].style.display ="none";
		time1 = setInterval(function(){
			var span = document.createElement('span');	
			span.className = 'Yspanw';
			llis[0].appendChild(span);	
			mTween(span,{top:335},2000,"linear",function(){
				llis[0].removeChild(span);
		
				var miss=document.createElement('span');
				miss.innerHTML = 'miss';
				llis[0].appendChild(miss);
				miss.className = "Ymiss";
				setTimeout(function(){
					miss.innerHTML = '';
				},300)
				
			})
		},1900)
			
		time2 = setInterval(function(){
			var span = document.createElement('span');	
			span.className = 'Yspanb';
			span.style.left = 22 + 'px';
			llis[1].appendChild(span);	
			mTween(span,{top:335},3000,"linear",function(){
				llis[1].removeChild(span);
					
					var miss=document.createElement('span');
					miss.innerHTML = 'miss';
					llis[1].appendChild(miss);
					miss.className = "Ymiss";
					setTimeout(function(){
						miss.innerHTML = '';
					},300)
				
			})
		},2900)
		
		time3 = setInterval(function(){
			var span = document.createElement('span');	
			span.className = 'Yspanw';
			span.style.left = 37 + 'px';
			llis[2].appendChild(span);	
			mTween(span,{top:335},1500,"linear",function(){
				llis[2].removeChild(span);
				
					var miss=document.createElement('span');
					miss.innerHTML = 'miss';
					llis[2].appendChild(miss);
					miss.className = "Ymiss";
					setTimeout(function(){
						miss.innerHTML = '';
					},300)
			})
		},1500)
		
		time4 = setInterval(function(){
			var span = document.createElement('span');	
			span.className = 'Yspany';
			span.style.left = 58 + 'px';
			llis[3].appendChild(span);	
			mTween(span,{top:335},4500,"linear",function(){
				llis[3].removeChild(span);
				
				var miss=document.createElement('span');
				miss.innerHTML = 'miss';
				llis[3].appendChild(miss);
				miss.className = "Ymiss";
				setTimeout(function(){
					miss.innerHTML = '';
				},300)
			})
		},4500)
		
		time5 = setInterval(function(){
			var span = document.createElement('span');	
			span.className = 'Yspanw';
			span.style.left = 81 + 'px';
			llis[4].appendChild(span);	
			mTween(span,{top:335},3500,"linear",function(){
				llis[4].removeChild(span);
				
				var miss=document.createElement('span');
				miss.innerHTML = 'miss';
				llis[4].appendChild(miss);
				miss.className = "Ymiss";
				setTimeout(function(){
					miss.innerHTML = '';
				},300)
				
			})
		},3500)
		
		time6 = setInterval(function(){
			var span = document.createElement('span');	
			span.className = 'Yspanb';
			span.style.left = 101 + 'px';
			llis[5].appendChild(span);	
			mTween(span,{top:335},2500,"linear",function(){
				llis[5].removeChild(span);
				
				var miss=document.createElement('span');
				miss.innerHTML = 'miss';
				llis[5].appendChild(miss);
				miss.className = "Ymiss";
				setTimeout(function(){
					miss.innerHTML = '';
				},300)
			})
		},2500)
		
		time7 = setInterval(function(){
			var span = document.createElement('span');	
			span.className = 'Yspanw';
			span.style.left = 117 + 'px';
			llis[6].appendChild(span);	
			mTween(span,{top:335},5500,"linear",function(){
				llis[6].removeChild(span);
				var miss=document.createElement('span');
				miss.innerHTML = 'miss';
				llis[6].appendChild(miss);
				miss.className = "Ymiss";
				setTimeout(function(){
					miss.innerHTML = '';
				},300)
			})
		},5500)
	}
	
	inputs[1].onclick = function(){
		inputs[0].style.display = "inline-block";
		for(var i=0;i<llis.length;i++){
			llis[i].innerHTML ="";
		}
		for(var i=0;i<spanbold.length;i++){
			spanbold[i].style.display ="inline-block";
		}
		n=0;
		Ydefen.innerHTML = n;
		clearInterval(time1)
		clearInterval(time2)
		clearInterval(time3)
		clearInterval(time4)
		clearInterval(time5)
		clearInterval(time6)
		clearInterval(time7)
		arr=[]
		re=[];
	}
}

var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 2.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
}
function mTween(el,target,time,type,callBack) {
	clearInterval(el.timer);
	var t = 0;
	var b = {}; 
	var c = {}; 	
	var d = time/20; 
	for(var s in target) {
		b[s] = css(el,s);  
		c[s] = target[s] - b[s];
	}
	el.timer = setInterval(function(){
		t++;
		if(t>d) {
			clearInterval(el.timer);
			callBack&&callBack();
		} else {
			for(var s in target) {
				var val = Tween[type](t,b[s],c[s],d);
				css(el,s,val);
			}
		}
	},20);
}
function css(el,attr,val) {
	switch(attr){
		case "rotate":
		case "rotateX":
		case "rotateY":
		case "rotateZ":
		case "scale":
		case "scaleX":
		case "scaleY":
		case "skewX":
		case "skewY":
		case "translateX":
		case "translateY":
		case "translateZ":
			return cssTransform(el,attr,val)
	}
	if(arguments.length < 3) {
		var val  = 0;
		if(el.currentStyle) {
			val = el.currentStyle[attr];
		} else {
			val = getComputedStyle(el)[attr];
		}
		if(attr == "opacity") {
			val*=100;
		}
		return parseFloat(val);
	}
	if(attr == "opacity") {
		el.style.opacity = val/100;
		el.style.filter = "alpha(opacity = "+val+")";
	} else {
		el.style[attr] = val + "px";
	}
}
function cssTransform(el,attr,val){
	if(typeof el.transform == "undefined"){
		el.transform = {};
	}
	if(typeof val == "undefined"){
		if(!el.transform[attr]){
			switch(s){
				case "scale":
				case "scaleX":
				case "scaleY":
					el.transform[attr] = 1;
					break;
				default:
					el.transform[attr] = 0;	
			}
		}
		return el.transform[attr];
	} else {
		var value = "";
		el.transform[attr] = val;
		for(var s in el.transform){
			switch(s){
				case "rotate":
				case "rotateX":
				case "rotateY":
				case "rotateZ":
				case "skewX":
				case "skewY":
					value += " "+s+"("+el.transform[s]+"deg)";
					break;
				case "translateX":
				case "translateY":
				case "translateZ":	
					value += " "+s+"("+el.transform[s]+"px)";
					break;
				case "scale":
				case "scaleX":
				case "scaleY":	
					value += " "+s+"("+el.transform[s]+")";
					break;	
			}
			
		}
		el.style.WebkitTransform = el.style.MozTransform = el.style.transform = value;
	}
}
