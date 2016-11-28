
var index = -1;
var aId = [];
var aData = JSON.parse(JSON.stringify(Data));
var cn =  0;
//面包屑导航
var crumbshtml = '';
var fids = [];

/////////////////////////////////////////////////////////////////////////////////////

setFile(index);

setAsideHeight();

setTreePosition()

fileTree($('#tree-list'),index)


$(window).resize(function(){
	setAsideHeight();
	setTreePosition()
})

$('#movement').click(function(){
	if($('.tree').css('display')=='none'){
		$('.tree').css('display','block');
	}else{
		$('.tree').css('display','none');
	}
})

$('.tree-close').click(function(){
	$('.tree').css('display','none');
})

$('.tree-no').click(function(){
	$('.tree').css('display','none');
})

$('#tree-list p').click(function(){
	$('#tree-list p').each(function(i,ele){
		$(ele).css('background-color','none');
		$(ele).attr('class','');
	})
	$(this).css('background-color','#999');
	$(this).attr('class','tree-active')
})

$('#tree-list').delegate('p','click',function(){
	$('#tree-list p').each(function(i,ele){
		console.log(1);
		$(ele).css('background-color','');
		$(ele).attr('class','');
	})
	$(this).css('background-color','#999');
	$(this).attr('class','tree-active')
})


$('.tree-yes').click(function(){
	var id = null;
	var fid = [];
	fids = [];
	
	$('#tree-list p').each(function(i,ele){
		if($(ele).attr('class') == 'tree-active'){
			id = $(ele).parent().attr('"id');
		}
	})
	
	//找到所有同级的id
	$('.folder div').each(function(i,ele){
		if($(ele).attr('class') == 'folder-file-now' ){
			fid.push($(ele).attr('id'))
		}		
	})
	
	
	//找到所有同级下所有id
	for(var i=0; i<fid.length; i++){
		getChild(fid[i]);
		fids.push(fid[i]);
	}
	
	
	for(var i=0; i<fids.length; i++){
		if(id == fids[i]){
			$('.tree').css('display','none');
			return;
		}
	}
	if(id==null){
		alert("请选择文件夹")
		return;
	}else{
		fo1 : for(var i=0; i<aData.length; i++){
			fo2	: for(var j=0; j<fid.length; j++){
					if(aData[i]['id'] == fid[j]){
						aData[i]['pid'] = id;
						setFile(index);
						$('#tree-list').html('');
						fileTree($('#tree-list'),-1);
						$('.tree').css('display','none');
						break fo2;
				}
			}
		}
	}
})

function getChild(id){
	
	for(var i=0; i<aData.length; i++){
		if(aData[i]['pid'] == id){
			var iPid = aData[i]['id'];
			fids.push(aData[i]['id']);
			getChild(iPid);
		}
	}
}

$('#newFile').click(function(){	
	
	var name = getName(index);
	var id = new Date().getTime();
	var obj = {
		"name" : name,
		"id" : id,
		"pid" : index
	}
	var html = '<div class="folder-file"'+ 'id='+ id +' ><i class="ico"></i><div class="text"><p>'+ name +'</p><input type="text" value="'+ name +'"></div></div>'
	$('.folder').append(html);
	aData.push(obj);
	$('#tree-list').html('');
	fileTree($('#tree-list'),-1);
	
})


$('.folder').delegate('div','click',function(){
	if($(this).attr('class') == 'folder-file'){
		$('.folder div').each(function(i,ele){
			if($(ele).attr('class') != 'text' ){
				$(ele).attr('class','folder-file');
			}		
		})
		$(this).attr('class','folder-file-now');
		$('.sub-nav-operation-list').css('display','block');
		getActive(index);
		return false;
	}
	if($(this).attr('class') == 'folder-file-now'){
		$(this).attr('class','folder-file');
		$('.sub-nav-operation-list').css('display','none');	
		getActive(index);
		return false;
	}
	return false;
})




$('#more').click(function(){
	if($('#sub-nav-operation-list-more').css('display') == 'none'){
		$('#sub-nav-operation-list-more').css('display','block');
	}else{
		$('#sub-nav-operation-list-more').css('display','none');
	}
})


$('.folder').delegate('div','dblclick',function(){
	$('.folder').html('');
	$('.file-titer-zero').css('display','none');
	$('.file-titer-nozerp').css('display','block')
	var id = $(this).attr('id')
	index = getId(id);
	crumbs(id);
	for(var i=0; i<aData.length; i++){
		if(aData[i]['pid'] == id){
			$('.folder').append(
				'<div class="folder-file"'+ 'id='+ aData[i]['id'] +'><i class="ico"></i><div class="text"><p>'+ aData[i]['name'] +'</p><input type="text" value="'+ aData[i]['name'] +'"></div></div>'
			);
		}
	}	
	return false;
})

$('.file-titer-nozerp').delegate('a','click',function(){
	if($(this).attr('id') != 'back' && $(this).attr('id') != 'all'){
		var thisId = $(this).attr('id');
		index = getId(thisId);
		setFile(thisId);
		rmoveCrumbs(thisId);	
	}
	if($(this).attr('id') == 'back'){
		if(index == -1){
			return;
		}
		getFlistFather(index);
	}
	if($(this).attr('id') == 'all'){
		getAll();
	}
})


$('#rName').click(function(){
	getActive(index);
	if(aId.length > 1){
		alert("只能更改一个名字");
	}else{
		var nowId = aId[0];
		var nowVal = $('#'+nowId + ' .text input').val();
		$('#'+nowId + ' .text p').css('display','none')
		$('#'+nowId + ' .text input').css('display','block');
		$('#'+nowId + ' .text input').select().focus();
		$('#'+nowId + ' .text input').blur(function(){
			var val = $('#'+nowId + ' .text input').val();
			var off = verificationName(index,val);
			if(val == ''){
				$('#'+nowId + ' .text p').css('display','block').html(nowVal);
				$('#'+nowId + ' .text input').css('display','none').val(nowVal);
				return;
			}
			if(val == nowVal){
				$('#'+nowId + ' .text p').css('display','block').html(nowVal);
				$('#'+nowId + ' .text input').css('display','none').val(nowVal);
				return;
			}
			if(off){
				$('#'+nowId + ' .text p').css('display','block').html(val);
				$('#'+nowId + ' .text input').css('display','none').val(val);
				for(var i=0; i<aData.length; i++){
					if(aData[i]['id'] == nowId){
						aData[i]['name'] = val;
					}
				}
			}else{
				$('#'+nowId + ' .text input').focus().select();
			}
		})
		
		
	}
})

/*
事件委托，判断是不是能解决
*/
/*
$('.file-area').mousedown(function(ev){
	var oDiv = $('<div>');
	$('.file-area').append(oDiv);
	var disX = ev.pageX;
	var disY = ev.pageY;
	$(document).mousemove(function(ev){
		var iW = Math.abs(ev.pageX - disX);
		var iH = Math.abs(ev.pageY - disY);
		var iT = Math.min(disY,ev.pageY);
		var iL = Math.min(disX,ev.pageX);
		oDiv.css('position','absolute').css('left',iL).css('top',iT).css('width',iW).css('height',iH).css('border','1px solid #000').css('background','deepskyblue')
		.css('opacity',0.4);
		crash(oDiv);
		return false;
	})
	$(document).mouseup(function(){
		oDiv.remove();
		$(document).off();
		return false;
	})
	return false;
})
*/
//folder-file

/*
$('.file-area').delegate('section','mousedown',function(){
	alert(2);
})
*/
var fileArea = document.getElementById('file-area');

fileArea.onmousedown = function(ev){
	var ev = ev || event;
	var disX = ev.pageX;
	var disY = ev.pageY;
	var target = ev.target || ev.srcElement;
	
	
	if(target.nodeName.toLowerCase() == "section"){
		
		$('.folder input').each(function(i,ele){
			$(ele).blur();
		})

		
		var oDiv = document.createElement('div');
		oDiv.className = 'selectBox';
		fileArea.appendChild(oDiv);
		
		fileArea.onmousemove = function(ev){
			/*
				$('.folder-file').each(function(i,ele){
		$(ele).attr('class','folder-file');
	})
	*/
			
			var w = Math.abs(ev.pageX - disX);
			var h = Math.abs(ev.pageY - disY);
			var t = Math.min(ev.pageY,disY);
			var l = Math.min(ev.pageX,disX);	
			oDiv.style.width = w + 'px';
			oDiv.style.height = h + 'px';
			oDiv.style.left = l + 'px';
			oDiv.style.top = t + 'px';
			selectBoxDetection(w,h,t,l);
			return false;
		}
		fileArea.onmouseup = function(){
			fileArea.onmousemove = fileArea.onmouseup = null;
			fileArea.removeChild(oDiv);
		}
		return false;
	}
}





/////////////////////////////////////////////////////////////////////////////////////

function selectBoxDetection(w,h,t,l){
	var t = t;
	var l = l;
	var b = t + h;
	var r = l + w;

	
	$('.folder-file').each(function(i,ele){
		var t2 = $(ele).offset().top;
		var l2 = $(ele).offset().left;
		var b2 = t2 + $(ele).height();
		var r2 = l2 + $(ele).width();
		if(t>b2 || l>r2 || b<t2 || r<l2){
		
		}else{
			$(ele).attr('class','folder-file-now');
			$('.sub-nav-operation-list').css('display','block');
			getActive(index);
		}
	})
}

/*
function crash(obj){
	var t1 = obj.offset().top;
	var l1 = obj.offset().left;
	var b1 = t1 + obj.height();
	var r1 = l1 + obj.width();
	$('.folder-file').each(function(i,ele){
		var t2 = $(ele).offset().top;
		var l2 = $(ele).offset().left;
		var b2 = t2 + $(ele).height();
		var r2 = l2 + $(ele).width();
		if(t1>b2 || l1>r2 || b1<t2 || r1<l2){
		
		}else{
			$(ele).attr('class','folder-file-now');
			$('.sub-nav-operation-list').css('display','block');
			getActive(index);
		}
	})	
}
*/
function setAsideHeight(){
	var h = $(window).height() - 57;	
	$('.sidebar').css('height',h);
	$('.file-area').css('height',h);
}

function setTreePosition(){
	var l = ($(window).width() - $('.tree').outerWidth())/2;
	var t = ($(window).height() - $('.tree').outerHeight())/2;
	$('.tree').css('top',t).css('left',l)
}

function setFile(index){
	var arr = [];
	$('.folder').html('');
	for(var i=0; i<aData.length; i++){
		if(aData[i]['pid'] == index){
			$('.folder').append(
				'<div class="folder-file"'+ 'id='+ aData[i]['id'] +'><i class="ico"></i><div class="text"><p>'+ aData[i]['name'] +'</p><input type="text" value="'+ aData[i]['name'] +'"></div></div>'
			);
		}
	}
}

//生成树状表

function fileTree(father,index){
	var tIndex = index;
	var c = null;
	for(var i=0; i<aData.length; i++){
		if(aData[i]['pid'] == tIndex){
			cn = 0;
			cn = getNumberOfPlies(tIndex);
			var aLi = $('<li "id="'+ aData[i]['id'] +'"></li>')
			var left = cn * 15;
			var oP = $('<p>').css('margin-left',left)
			aLi.append(oP.append('<i></i><em></em><span>'+ aData[i]['name'] +'</span>'))
			father.append(aLi)
			var id = aData[i]['id']
			var off = isChild(id);
			if(off){
				var ul = $('<ul>');
				var thisIndex = id;
				fileTree(ul,thisIndex);
				aLi.append(ul);
			}
		}
	}
}


//获得在第几层
function getNumberOfPlies(c){
	for(var i=0; i<aData.length; i++){
		if(aData[i]['id'] == c){
			cn++;
			c = aData[i]['pid'];
			if(c == -1){
				return cn;
			}
			getNumberOfPlies(c);
			break;
		}
	}
	return cn;
}

function isChild(id){
	var off = false;
	for(var i=0; i<aData.length; i++){
		if(aData[i]['pid'] == id){
			off = true;	
		}
	}
	return off;
}

function crumbs(id){
	 $('.file-titer-nozerp').append('<a href="javascript:;" id="'+ id +'">'+ getNowName(id) +'</a><i>></i>')
}

function getName(index){
	var arrName = [];
	var arrNumber = [];
	var num = [];
	var re1 = new RegExp('^新建文件夹$','gi');
	var re2 = new RegExp('^新建文件夹\\(1\\)$','gi');
	var re3 = new RegExp('^新建文件夹\\(|\\)$','gi');
	var onoff1 = true;
	var onoff2 = true;
	var onoff3 = true;
	var name = '';
	for(var i=0; i<aData.length; i++){
		if(aData[i]['pid'] == index){
			if(re1.test(aData[i]['name'])){
				onoff1 = false;
			}
		}
	}
	if(onoff1){
		return "新建文件夹"
	}
	for(var i=0; i<aData.length; i++){
		if(aData[i]['pid'] == index){
			if(re2.test(aData[i]['name'])){
				onoff2 = false;
			}
		}
	}
	if(onoff2){
		return "新建文件夹(1)"
	}
	for(var i=0; i<aData.length; i++){
		if(aData[i]['pid'] == index){
			if(re3.test(aData[i]['name'])){
				var str = aData[i]['name'].replace(re3,'');
				str = parseInt(str);
				if(!isNaN(str)){
					arrNumber.push(str)
				}	
			}
		}
	}	
	arrNumber.sort(function(a,b){
		return a - b;
	})
	var f = arrNumber[0];
	var l = arrNumber[arrNumber.length - 1];	
	if(((l - f)+1) == arrNumber.length ){
		l++
		var m = l;
		name = '新建文件夹('+ m +')'
		return name;
	}else{		
		var s = f;
		var y = 0;
		fo1 : for(var i=y; i<arrNumber.length; i++){
			fo2 : for(var j=s; j<=l; j++){
				if(j == arrNumber[i]){
					s++;
					y++;
					break fo2;
				}else{
					name = '新建文件夹('+ j +')';
					return name;
				}
			}
		}	
	}
}

function rmoveCrumbs(index){
	crumbshtml = '';
	$('.file-titer-nozerp').html('');
	$('.file-titer-nozerp').html('<a href="javascript:;" id="back">返回上一级</a><i>|</i><a href="javascript:;" id="all">所有文件</a><i>></i>')
	getFather(index)
}

function repeatCrumbs(){
	$('.file-titer-zero').css('display','block');
	$('.file-titer-nozerp').css('display','none')
	$('.file-titer-nozerp').html('');
	$('.file-titer-nozerp').html('<a href="javascript:;" id="back">返回上一级</a><i>|</i><a href="javascript:;" id="all">所有文件</a><i>></i>')
}

function getFather(thisId){
	var off = true;
	var thisPid = null;
	var html = '';
	var index = null;
	for(var i=0; i<aData.length; i++){
		if(aData[i]['id'] == thisId){
			thisPid = aData[i]['pid'];
			index = i;
		}
	}
	html = crumbshtml
	crumbshtml = '';
	crumbshtml += '<a href="javascript:;" id="'+ aData[index]['id'] +'">'+ aData[index]['name'] +'</a><i>></i>' 
	crumbshtml += html;
	for(var i=0; i<aData.length; i++){
		if(aData[i]['id'] == thisPid){
			off = false;
			getFather(aData[i]['id']);	
		}
	}
	if(off){
		$('.file-titer-nozerp').append(crumbshtml);
		return;
	}
}

function getFlistFather(id){
	var pid = getNowPid(id)	
	setFile(pid);
	index = pid;
	if(pid == -1){
		repeatCrumbs()
		return;
	}
	rmoveCrumbs(pid);	
}

function getAll(){
	repeatCrumbs();
	setFile(-1);
	index = -1;
}

function getId(id){
	for(var i=0; i<aData.length; i++){
		if(aData[i]['id'] == id){
			return aData[i]['id'];
		}
	}
}

function getNowName(id){
	for(var i=0; i<aData.length; i++){
		if(aData[i]['id'] == id){
			return aData[i]['name'];
		}
	}
}

function getNowPid(id){
	for(var i=0; i<aData.length; i++){
		if(aData[i]['id'] == id){
			return aData[i]['pid'];
		}
	}
}

function verificationName(index,val){
	var off = true;
	for(var i=0; i<aData.length; i++){
		if(aData[i]['pid'] == index && aData[i]['name'] == val){	
			off = false;
		}
	}
	return off;
}

function getActive(index){
	aId = [];
	for(var i=0; i<aData.length; i++){
		if(aData[i]['pid'] == index && $('#'+ aData[i]['id']).attr('class') == 'folder-file-now'){
			aId.push(aData[i]['id']);
		}
	}
}

