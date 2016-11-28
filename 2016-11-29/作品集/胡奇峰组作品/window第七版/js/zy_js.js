var zyDesktop = document.getElementById('zy_desktop');
var oGame = document.getElementById('zy_game');
var oPhoto = document.getElementById('zy_photo');
var oMusic = document.getElementById('zy_music');
var oBook = document.getElementById('zy_book');
var oClouds = document.getElementById('zy_clouds');
var ojm = document.getElementById('jm');
var aIco = document.getElementsByClassName('zy_ico');
var viewWidth = window.innerWidth;
var viewHeight = window.innerHeight;
var iW = Math.floor(viewWidth/72);
var iH = Math.floor(viewHeight/92);
var menuList = document.getElementById('menu');
var menuLi = null;
var arrPos = [];
var flag = true;

for(var i=0; i<iW; i++){
	for(var j=0; j<iH; j++){
		var pos = {"left":0,"top":0};
		pos['left'] = i*72;
		pos['top'] = j*92;
		arrPos.push(pos);
	}
}

for(var i=0; i<aIco.length; i++){
	aIco[i].style.left = arrPos[i]['left'] + 'px';
	aIco[i].style.top = arrPos[i]['top'] + 'px';
}

drag(oGame,zyDesktop,true,magnetism);
drag(oPhoto,zyDesktop,true,magnetism);
drag(oMusic,zyDesktop,true,magnetism);
drag(oBook,zyDesktop,true,magnetism);
drag(oClouds,zyDesktop,true,magnetism);
drag(ojm);


document.oncontextmenu = function(){
	return false;
}

zyDesktop.oncontextmenu = function(ev){
	var ev = ev || event;
	if(menuList){
		menuList.style.display = 'block';
		menuList.style.left = ev.pageX + 'px';
		menuList.style.top = ev.pageY + 'px';
		menuList.style.top = ev.pageY + 'px';
	}else{
		var oUi = document.createElement('ul');
		var oLi1 = document.createElement('li');
		var oLi2 = document.createElement('li');
		var oLi3 = document.createElement('li');
		var oLi4 = document.createElement('li');
		oLi1.innerHTML = "新建文件夹";
		oLi2.innerHTML = "重命名";
		oLi3.innerHTML = "剪切";
		oLi4.innerHTML = "粘贴"
		oUi.appendChild(oLi1);
		oUi.appendChild(oLi2);
		oUi.appendChild(oLi3);
		oUi.appendChild(oLi4);
		oUi['id'] = "menu";
		oUi.style.left = ev.pageX + 'px';
		oUi.style.top = ev.pageY + 'px';
		zyDesktop.appendChild(oUi);
		menuList = document.getElementById('menu');
		menuLi = menuList.getElementsByTagName('li');
		liEvent();	
	}

	var menu = document.getElementById('menu');
	if(menu){
		menu.onmouseleave = function(ev){
			console.log(1)
			menu.style.display = 'none';
			ev.cancelable = true;
			return false
		}
	}

	
	return false;
};

var llcons = zyDesktop.getElementsByTagName('canvas')[0];
llcons.onclick = function(ev){
	var ev = ev || event;
	desktopClick(ev)
};

////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
// menuList.onmouseout = function(ev){
// 	//if(menuList){
// 		menuList.style.display = 'none';
// 	//}
// 	ev.cancelable = true;
// 	return false
// }





zyDesktop.onmousedown = function(ev){
	var ev = ev || event;
	
	zyDesktop.onmousemove = function(){
		flag = false;
	}
	mouseDown(ev);
}

function liEvent(){
	menuLi[0].onclick = function(){
		aIco = document.getElementsByClassName('zy_ico');
		var oDiv = document.createElement('div');
		var oI = document.createElement('i');
		var oP = document.createElement('p');
		var id = new Date().getTime();
		var onoff = true;
		var name = "新建文件夹"
		oP.innerHTML = name;
		oDiv.appendChild(oI);
		oDiv.appendChild(oP);
		oDiv['id'] = id;
		oDiv.className = 'zy_ico';	
		
		fo:for(var i=0; i<arrPos.length; i++){
			onoff = true;
			var arrLeft = arrPos[i]['left'];
			var arrTop = arrPos[i]['top'];
			for(var j=0; j<aIco.length; j++){
				var aIcoLeft = getAbPos(aIco[j])['left'];
				var aIcoTop = getAbPos(aIco[j])['top'];
				if(aIcoTop == arrTop && arrLeft == aIcoLeft){
					onoff = false;
				}
			}
			if(onoff){
				oDiv.style.left = arrLeft +'px';
				oDiv.style.top = arrTop +'px';
				break fo;
			}
		}	
		drag(oDiv,zyDesktop,true,magnetism);
		zyDesktop.appendChild(oDiv)
		aIco = document.getElementsByClassName('zy_ico');
	}
}

function magnetism(obj,thisT,thisL){
	

	var l = getAbPos(obj)['left'];
	var t = getAbPos(obj)['top'];
	var arrS = [];
	for(var i=0; i<arrPos.length; i++){
		var ls = Math.abs(arrPos[i]['left'] - l);
		var ts = Math.abs(arrPos[i]['top'] - t);
		var c = ls*ls + ts*ts;
		var s = {};
		s['top'] = arrPos[i]['top'];
		s['left'] = arrPos[i]['left'];
		s['c'] = c;
		arrS.push(s);
	}
	arrS.sort(function(a,b){
		return a['c'] - b['c'];
	})
	var m = arrS[0]['top'];
	var n = arrS[0]['left'];
	collide(obj,m,n,thisT,thisL)
}

function collide(obj,t,l,thisT,thisL){
	for(var i=0; i<aIco.length; i++){
		var pos = getAbPos(aIco[i]);
		if(pos['left'] == l && pos['top'] == t){
			aIco[i].style.left = thisL + 'px';
			aIco[i].style.top = thisT + 'px';
			obj.style.left = l + 'px';
			obj.style.top = t + 'px';
		}else{
			obj.style.left = l + 'px';
			obj.style.top = t + 'px';
		}
	}
	aIco = document.getElementsByClassName('zy_ico');
	/*
	zyDesktop.onclick = function(ev){
		alert(1);
		var ev = ev || event;
	
		desktopClick(ev)
	};
	*/
}

function mouseDown(ev){
	var disX = ev.pageX;
	var disY = ev.pageY;
	var oDiv = document.createElement('div');
	zyDesktop.appendChild(oDiv);
	oDiv.className = 'dheckBox';
	zyDesktop.onmousemove = function(ev){
		var t = Math.min(disY,ev.pageY);
		var l = Math.min(disX,ev.pageX);
		var w = Math.abs(disX - ev.pageX);
		var h = Math.abs(disY - ev.pageY);
		oDiv.style.width = w + 'px';
		oDiv.style.height = h + 'px';
		oDiv.style.left = l + 'px';
		oDiv.style.top = t + 'px';
		collsionDetection(oDiv,t,l,w,h);
		return false;
	}
	
	document.onmouseup = function(){
		zyDesktop.onmousemove = zyDesktop.onmouseup = null;
		if(oDiv){
			zyDesktop.removeChild(oDiv);
		}
		
	}
	
	return false;
}

function collsionDetection(obj,t,l,w,h){
	var t1 = t;
	var l1 = l;
	var b1 = t + h;
	var r1 = l + w;


	for(var i=0; i<aIco.length; i++){
		var list = aIco[i].classList;
		list.remove('zy_ico_act');
	}
	
	
	for(var i=0; i<aIco.length; i++){
		var t2 = getAbPos(aIco[i])['top'];
		var l2 = getAbPos(aIco[i])['left'];
		var b2 = t2 + aIco[i].offsetHeight;
		var r2 = l2 + aIco[i].offsetWidth;
	
		if(t1>b2 || l1>r2 || b1<t2 || r1<l2){
		
		}else{		
			var cList = aIco[i].classList;
			cList.add('zy_ico_act');
			
		}
	}
	return false;
}

function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}


//公共函数 - 拖拽
/*
 * 1.obj 目标对象 obj
 * 2.fobj 父级对象 obj
 * 3.whether 是否边界处理 boolean
 * 4.back 回调函数
 */
function drag(obj,fobj,whether,back){
	obj.onmousedown = function(ev){
		var onoff = true;
		
		
		var thisList = obj.classList;
		
		
		for(var i=0; i<thisList.length; i++){
			if(thisList[i] == 'zy_ico_act'){
				onoff = false;
			}
		}
		
		if(onoff){
		
			thisList.add('zy_ico_act');
		}
			
			
	
		
		zyDesktop.onmousedown = null;
		var thisT = getAbPos(obj)['top'];
		var thisL = getAbPos(obj)['left'];
		var ev = ev || event;
		var iw = obj.offsetWidth;
		var ih = obj.offsetHeight;
		var disX = ev.pageX - getAbPos(obj)['left'];
		var disY = ev.pageY - getAbPos(obj)['top'];
		
		
		var arr = [];	
		var nowArr = [];
		
		
		fo1 : for(var i=0; i<aIco.length; i++){
			var classList = aIco[i].classList;
			fo2 : for(var j=0; j<classList.length; j++){
				if(classList[j] == 'zy_ico_act'){
					arr.push(i);
					break fo2;
				}
			}
		}
	
		if(arr.length != 0){
			for(var i=0; i<arr.length; i++){
				var fileobj = {};
				fileobj['left'] = getAbPos(aIco[arr[i]])['left'];
				fileobj['top'] = getAbPos(aIco[arr[i]])['top'];
				nowArr.push(fileobj);
			}
		}
		
		zyDesktop.onmousemove = function(ev){
			flag = false;
			var t = ev.pageY - disY;
			var l = ev.pageX - disX;

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
			var ct = t - thisT;
			var cl = l - thisL;
			obj.style.top = t + 'px';
			obj.style.left = l + 'px'
			
			if(arr.length != 0){
				for(var i=0; i<arr.length; i++){
					if(aIco[arr[i]] != obj){
						aIco[arr[i]].style.left = cl + nowArr[i]['left']  +'px';
						aIco[arr[i]].style.top = ct + nowArr[i]['top']  +'px';
						if(back) back(aIco[arr[i]],nowArr[i]['top'],nowArr[i]['left']);
					}
				}
			}
			return false;

		}
		document.onmouseup = function(){
			
			//zyDesktop.onclick = null;
			
			zyDesktop.onmousemove = zyDesktop.onmouseup = null;
			zyDesktop.onmousedown = function(ev){
				var ev = ev || event;
				mouseDown(ev);
			}
			
			for(var i=0; i<arr.length; i++){
				if(aIco[arr[i]] != obj){	
					if(back) back(aIco[arr[i]],nowArr[i]['top'],nowArr[i]['left']);
				}
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

function desktopClick(ev){
	if(menuList){
		menuList.style.display = 'none';
	}
	var target = ev.target || ev.srcElement;
	if(target.nodeName.toLowerCase() != 'i' &&  target.nodeName.toLowerCase() != 'p'){

			for(var i=0; i<aIco.length; i++){
				var list = aIco[i].classList;
				list.remove('zy_ico_act');
			}
		
	}
	if(target.nodeName.toLowerCase() == 'i' ||  target.nodeName.toLowerCase() == 'p'){
	
		for(var i=0; i<aIco.length; i++){
				var list = aIco[i].classList;
				list.remove('zy_ico_act');
		}
		var father = target.parentElement;
			var fList = father.classList;
			fList.add('zy_ico_act');
			
		ev.cancelBubble = true;	
		return false;
		
		/*
		if(flag){
			alert(flag);
			for(var i=0; i<aIco.length; i++){
				var list = aIco[i].classList;
				list.remove('zy_ico_act');
			}
			var father = target.parentElement;
			var fList = father.classList;
			fList.add('zy_ico_act');
		
		}
		*/
	}
}
