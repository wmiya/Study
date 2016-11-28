/*
 * 当前层级
 */
var index = -1;

var aData = JSON.parse(JSON.stringify(Data))

//面包屑导航
var crumbshtml = '';

/////////////////////////////////////////////////////////////////////////////////////


setFile(index);

setAsideHeight();

$(window).resize(function(){
	setAsideHeight();
})

//添加文件夹
$('#newFile').click(function(){
	/*
	 * 重命名的问题
	 */
	var name = "新建文件夹"
//var name = getName(aData,index)
	var id = new Date().getTime();
	var obj = {
		"name" : name,
		"id" : id,
		"pid" : index
	}
	var html = '<div class="folder-file"'+ 'id='+ id +' ><i class="ico"></i><div class="text"><p>'+ name +'</p><input type="text" value="'+ name +'"></div></div>'
	$('.folder').append(html);
	/*
	 * 对于假数据库操作（数组），树装菜单
	 */
	aData.push(obj);
})

//点击文件夹
$('.folder').delegate('div','click',function(){
	if($(this).attr('class') == 'folder-file'){
		$('.folder div').each(function(i,ele){
			if($(ele).attr('class') != 'text' ){
				$(ele).attr('class','folder-file');
			}		
		})
		$(this).attr('class','folder-file-now');
		$('.sub-nav-operation-list').css('display','block');	
		return false;
	}
	if($(this).attr('class') == 'folder-file-now'){
		$(this).attr('class','folder-file');
		$('.sub-nav-operation-list').css('display','none');	
		return false;
	}
})

//双击文件夹(进入文件夹)
$('.folder').delegate('div','dblclick',function(){
	$('.folder').html('');
	index = $(this).attr('id');
	//传入的当前的层级
	crumbs(index);
	if(index != -1){
		$('.file-titer-zero').css('display','none');
		$('.file-titer-nozerp').css('display','block')
	}
	for(var i=0; i<aData.length; i++){
		if(aData[i]['pid'] == index){
			$('.folder').append(
				'<div class="folder-file"'+ 'id='+ aData[i]['id'] +'><i class="ico"></i><div class="text"><p>'+ aData[i]['name'] +'</p><input type="text" value="'+ aData[i]['name'] +'"></div></div>'
			);
		}
	}	
})

//面包屑导航点击
$('.file-titer-nozerp').delegate('a','click',function(){
	/*
	 * 清除多余的面包屑导航
	 */
	var thisId = $(this).attr('id');

	/*
	 * 更新index
	 */
	index = thisId;
	setFile(thisId);
	rmoveCrumbs(thisId);
})

/////////////////////////////////////////////////////////////////////////////////////

//计算侧边栏高度
function setAsideHeight(){
	var h = $(window).height() - 57;	
	$('.sidebar').css('height',h);
	$('.file-area').css('height',h);
}

//根据当前的层级生成结构
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

//面包屑导航
function crumbs(index){
	//传入的参数的是当前的层级
	console.log(index);
	
	$('.file-titer-nozerp').append('<a href="javascript:;" id="'+ index +'">'+ aData[index]['name'] +'</a><i>></i>')
}

//命名函数
/*
 * 1.问题？如何用正则表达式匹配小括号
 */
function getName(data,index){	
	/*
	var arr = [];
	var re = /^新建文件夹/
	var name = null;
	var str = null;
	var num = null;
	var length = null;
	for(var i=0; i<data.length; i++){
		if(data[i]['pid'] == index){
			if(re.test(data[i]['name'])){
				str = data[i]['name'].replace(re,'');
				str = str.substr(0,1);
				length = str.length;
				str = str.substr(length-1,1);
				num = parseInt(str);
				arr.push(num);
			}
		}
	}
	if(arr.length == 0){
		return "新建文件夹";
	}
	for(var i=0; i<arr.length; i++){
		
	}
	return name;
	*/
}

//重置面包屑导航栏
function rmoveCrumbs(index){
	crumbshtml = '';
	$('.file-titer-nozerp').html('');
	$('.file-titer-nozerp').html('<a href="javascript:;" id="back">返回上一级</a><i>|</i><a href="javascript:;" id="all">所有文件</a><i>></i>')
	getFather(index)
}

//找到对应id的所有父级,子集的pid，对应的是父级的id，同一层级下的所有pid相同
function getFather(thisId){
	var off = true;
	var thisPid = null;
	var html = '';
	var index = null;
	//找到当前id所对应的pid
	for(var i=0; i<aData.length; i++){
		if(aData[i]['id'] == thisId){
			//id所对应的pid
			thisPid = aData[i]['pid'];
			//对应id，在数组所在的位置
			index = i;
		}
	}
	/*
	 * 一直向前添加
	 */
	html = crumbshtml
	crumbshtml = '';
	crumbshtml += '<a href="javascript:;" id="'+ aData[index]['id'] +'">'+ aData[index]['name'] +'</a><i>></i>' 
	crumbshtml += html;
	//找到pid所对应的父级的id
	for(var i=0; i<aData.length; i++){
		if(aData[i]['id'] == thisPid){
			off = false;
			//递归
			getFather(aData[i]['id']);	
		}
	}
	/*
	 * 如果是true说明没有找到父级了
	 */
	if(off){
		$('.file-titer-nozerp').append(crumbshtml);
		return;
	}
}
