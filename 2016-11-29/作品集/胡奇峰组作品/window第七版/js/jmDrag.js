
var jm = document.querySelector('#jm');

var time = 0;
var onoff = false;
var moveLeftData = [];//存储鼠标移动的位置信息，以供后面计算缓冲运动的方向和距离
var moveTopData = [];

var opa = 1;//透明度

jm.addEventListener('mousedown',fnDown);

jm.style.left = document.documentElement.clientWidth/1.187+'px';//设置时钟默认位置
jm.style.top = document.documentElement.clientHeight/17.891+'px';

function fnDown(ev){
	jm.style.opacity = opa;
	jm.style.zIndex = 9999;
	ev.preventDefault();

	var disX = ev.pageX - jm.offsetLeft;
	var disY = ev.pageY - jm.offsetTop;

	document.addEventListener('mousemove',fnMove);
	document.addEventListener('mouseup',fnUp);

	function fnMove(ev){

/* 允许自然拖拽到四个角，且至少留下显示时针的距离 */
		var left = ev.pageX - disX;
		var top = ev.pageY - disY;

		if(top <= -52 ){
			top = -52;
		}else if(top>=document.documentElement.clientHeight/1.1863) {
			top = document.documentElement.clientHeight/1.1863;
		}
		if(left <= -54 ){
			left = -54;
		}else if(left>=document.documentElement.clientWidth/1.0875){
			left = document.documentElement.clientWidth/1.0875;
		}

		jm.style.left = left + 'px';
		jm.style.top = top + 'px';

/*  找到鼠标停止移动时的位置和当前的位置，如果在20毫秒内两值相等，证明鼠标静止不动，意味着用户想把时钟停在这里，就不做缓冲运动
	否则就是在拖拽过程中抬起的，就返回true。
 */
		moveLeftData.push(ev.pageX);
		moveTopData.push(ev.pageY);

		time = setTimeout(function(){
			if(ev.pageX == moveLeftData[moveLeftData.length-1] && ev.pageY == moveTopData[moveTopData.length-1]){
				onoff = false;
			}else{
				onoff = true;
			}
		},20);
	}

	function fnUp(ev){
		clearInterval(time);
		jm.style.zIndex = 0;
		document.removeEventListener('mousemove',fnMove);
		document.removeEventListener('mouseup',fnUp);

/* 如果在移动结束后返回的值是true，意味着时钟移动了，那么当在鼠标一抬起就开始执行缓冲运动，缓冲的距离结合松手瞬间的方向和速度决定（lDir、tDir） */
		if(onoff){
			var l1 = moveLeftData.pop();
			var l0 = moveLeftData.pop();
			var t1 = moveTopData.pop();
			var t0 = moveTopData.pop();

			var lDir = l1 - l0;
			var tDir = t1 - t0;
			var l = jm.offsetLeft;
			var t = jm.offsetTop;
			moveLeftData.length = 0;
			moveTopData.length = 0;

			mTween(jm,{left:l+lDir*10,top:t+tDir*10},500,'easeOut');
		}
	}

/* 如果时钟被甩出可视区超过时钟的一大半，就把它拽回默认位置 */
	document.onclick = function(){
		if(jm.offsetLeft< -jm.clientWidth+jm.clientWidth/5.14 || jm.offsetTop< -jm.clientHeight+jm.clientHeight/5.14 || 
			jm.offsetLeft>=(document.documentElement.clientWidth - jm.clientWidth/5.14) ||
		 	jm.offsetTop>=(document.documentElement.clientHeight - jm.clientHeight/5.14)){
			
			mTween(jm,{left:document.documentElement.clientWidth/1.187,
				top:document.documentElement.clientHeight/17.891},500,'backOut');
		}
	}

/* 单击自身返回默认位置 */
jm.ondblclick = function() {
	mTween(jm,{left:document.documentElement.clientWidth/1.187,
			top:document.documentElement.clientHeight/17.891},500,'backOut');
}

/* 通过滚轮调节时钟透明度 */
	
	jm.addEventListener('DOMMouseScroll',whellFn);
	jm.addEventListener('mousewheel',whellFn);
	function whellFn(ev){
		var down = true;
		if(ev.wheelDelta){
			down = ev.wheelDelta > 0 ? true : false;
		}else{
			down = ev.detail < 0 ? true : false;
		}
		if(down){
			opa-=0.04;
			if(opa<=.1){
				opa = .1;
			}
		}else{
			opa+=0.04;
			if(opa>=1){
				opa = 1;
			}
		}
		jm.style.opacity = opa;
		ev.preventDefault();
		jm.onmouseleave = function () {
			jm.removeEventListener('DOMMouseScroll',whellFn);
			jm.removeEventListener('mousewheel',whellFn);
		}
	}
}