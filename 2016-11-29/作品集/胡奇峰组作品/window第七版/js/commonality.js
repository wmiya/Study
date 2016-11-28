
//公共函数 - 拖拽
/*
 * 1.obj 目标对象 obj
 * 2.fobj 父级对象 obj
 * 3.whether 是否边界处理 boolean
 * 4.back 回调函数
 */
function drag(obj,fobj,whether,back){
	obj.onmousedown = function(ev){
		zyDesktop.onmousedown = null;
		var arr = [];
		var thisT = getAbPos(obj)['top'];
		var thisL = getAbPos(obj)['left'];
		var ev = ev || event;
		var iw = obj.offsetWidth;
		var ih = obj.offsetHeight;
		var disX = ev.pageX - getAbPos(obj)['left'];
		var disY = ev.pageY - getAbPos(obj)['top'];
		
		fo1 : for(var i=0; i<aIco.length; i++){
			var classList = aIco[i].classList;
			fo2 : for(var j=0; j<classList.length; j++){
				if(classList[j] == 'zy_ico_act'){
					arr.push(i);
					break fo2;
				}
			}
		}
		
		zyDesktop.onmousemove = function(ev){
			var t = ev.pageY - disY;
			var l = ev.pageX - disX;
			var ct = t - thisT;
			var cl = l - thisL;
			
			
			
			if(arr.length > 1){
				for(var i=0; i<arr.length; i++){
					
				}
			}
			
			
			
			if(whether){
				var t1  = getAbPos(fobj)['top'];
				var l1 = getAbPos(fobj)['left'];
				var b1 = getAbPos(fobj)['top'] + fobj.offsetHeight;
				var r1 = getAbPos(fobj)['left'] + fobj.offsetWidth;
				if(t < t1){
					t = t1;
				}
				if(t > b1 - ih){
					t = b1 - ih;
				}
				if(l < l1){
					l = l1
				}
				if(l > r1 - iw){
					l = r1 - iw;
				}				
			}
			obj.style.top = t + 'px';
			obj.style.left = l + 'px'
		}
		zyDesktop.onmouseup = function(){
			zyDesktop.onmousemove = zyDesktop.onmouseup = null;
			zyDesktop.onmousedown = function(ev){
				var ev = ev || event;
				mouseDown(ev);
			}
			if(back) back(obj,thisT,thisL);
		}
		ev.cancelable = true;
		return false;
	}
}

//公共函数 - 获取绝对位置
/*
 * 1.obj 目标对象 obj
 * 2.返回值是一个对象，包含元素的left，top
 */
function getAbPos(obj){
	var pos = {"left":0,"top":0};
	while(obj){
		pos['left'] += obj.offsetLeft;
		pos['top'] += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return pos;
}


