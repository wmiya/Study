
//新建文件夹
//点击增删改查

	var index=-1;
	var num=0;
	var datas=JSON.parse(JSON.stringify(Data));//虚拟ajax请求。转化成可空操作的json对象
	var fileList=$('.folder')[0];
	var filechild=fileList.children;
	var ard=[];
	var arr2=[];
	var navcontent='';
//---------------------------------------------------------------------	
  	changeHeight();
  	sethtml(index);
  	window.onresize=changeHeight;
  	Moveposition();
  	treeHtml($('#tree-list'),index)
  	
  	
  	
  	
//----------------------------------- -----------------  
    $('.folder').delegate('div','click',function(){
		if($(this).attr('class') == 'folder-file'){
			$(this).attr('class','folder-file-now').siblings().attr('class','folder-file');
			$('.sub-nav-operation-list').show()
		}
		return false;
		if($(this).attr('class') == 'folder-file-now'){
			$(this).attr('class','folder-file').siblings().attr('class','folder-file-now');
			$('.sub-nav-operation-list').hide()
		}

	})

    $('#more').click(function(){
		if($('#sub-nav-operation-list-more').css('display')=='none'){
			$('#sub-nav-operation-list-more').css('display','block');
		}else{
			$('#sub-nav-operation-list-more').css('display','none');
		}
	});


	$('#newFile').click(function(){
		var name=getName(index);
		var id=new Date().getTime();
		var obj={
			'name':name,
			"id":id,
			"pid":index
		}
		var html='<div class="folder-file"'+ 'id='+ id +' ><i class="ico"></i><div class="text"><p>'+ name +'</p><input type="text" value="'+ name +'"></div></div>';
		$('.folder').append(html);
		datas.push(obj);
		$('#tree-list').html('');
		treeHtml($('#tree-list'),-1);
	});
	
	
	$('#rmove').click(function(){
		for(var i = fileList.children.length-1; i >= 0 ; i--){
			if(fileList.children[i].className == "folder-file-now"){
				fileList.removeChild(fileList.children[i]);
			}
		}
	})
	$('.folder').delegate('P','click',function(){
		var val=$(this).html();
		$(this).hide()
		$(this).next().val(val);
		$(this).next().show();
		$(this).next().focus();
		
	});
	//双击
	$('.folder').delegate('div','dblclick',function(){
		$('.folder').html('');
		$('.file-titer-zero').hide();
		$('.file-titer-nozerp').show();
		var id=$(this).attr('id');
		index=getId(id);
		hearnav(id);
		for(var i=0;i<datas.length;i++){
			if(datas[i]['pid']==id){
				$('.folder').append(
					'<div class="folder-file"'+ 'id='+ datas[i]['id'] +'><i class="ico"></i><div class="text"><p>'+ datas[i]['name'] +'</p><input type="text" value="'+ datas[i]['name'] +'"></div></div>'
				)
			}
		}
		return false;
	});
	
	$('.file-titer-nozerp').delegate('a','click',function(){
		if($(this).attr('id')=='back'){
			if(index==-1){
				return;
			}
		}
		
		
		
	})
	$('.folder').delegate('input','blur',function(){
		var val=$(this).val();
		if($(this).val('')||$(this).val()==$(this).prev().html()){
			$(this).hide();
			$(this).prev().html(val);
			$(this).prev().show();
			return;
			
		}
		if(hasName($(this).val())){
			$(this).hide();
			$(this).prev().html(val);
			$(this).prev().show()
		}else{
			$(this).focus();
			alert('已存在相同文件名！')
		}
	})
		
	$('#movement').click(function(){
		$('.tree').show();
	})
	
	$('#tree-list p').click(function(){
		$('#tree-list p').each(function(i,e){
			$(e).css('background-color','');
			$(e).attr('class','');
		})
		$(this).css('background-color','#999');
		$(this).attr('class','tree-active');
	})
	
	
	$('#tree-list').delegate('p','click',function(){
		$('#tree-list p').each(function(i,e){
			$(e).css('background-color','');
			$(e).attr('class','');
		})
		if($(this).next('ul')){
			if($(this).next('ul').css('display')==='none'){
				$(this).next('ul').show()
			}else{
				$(this).next('ul').hide();
			}
		}
		$(this).css('background-color','#999');
		$(this).attr('class','tree-active');
	});
	
	
	$('.tree-close').click(function(){
		$(this).closest('.tree').hide();
	})
	
	
	$('.tree-no').click(function(){
		$(this).closest('.tree').hide();
	})
	$('.tree-yes').click(function(){
		var id=null;
		var fid=[];
		arr2=[];
		$('#tree-list p').each(function(i,e){
			if($(e).attr('class')=='tree-active'){
				id=$(e).parent().attr('id');
			}
		});
		$('.folder div').each(function(i,e){
			if(fid.push()(e).attr('class')=='folder-file-now'){
//				fid.push($(e).attr('id'));
			}
		});
		for(var i=0;i<fid.length;i++){
			 getChild(fid[i]);
			 fids.push(fid[i]);
		}
		for(var i=0;i<fids.length;i++){
			if(id==fids[i]){
				$('.tree').hide();
				return;
			}
		}
		if(id==null){
			alert("请选择文件")
			return;
		}else{
//			sczjkefdnjlesdlcxm 
		}
	})
	
	function getNowName(id){//获取当前的id名字
		for(var i=0; i<datas.length; i++){//循环数组
			if(datas[i]['id'] == id){//如果当前的数组中的某一项的id等于当前的id
				return datas[i]['name'];//就拿到这个id的名字
			}
		}
	}
	
	
	function getChild(id){
		for(var i=0; i<datas.length; i++){//循环数据、
			if(datas[i]['pid'] == id){//判断下当前的这个pid是否等于当前被选中并且是需要移动到元素
				var iPid = datas[i]['id'];//当前的id就是这个。
				fids.push(datas[i]['id']);//然后
				getChild(iPid);
			}
		}
	}
	function getFlistFather(id){
		var pid = getNowPid(id)	
		sethtml(pid);
		index = pid;
		if(pid == -1){
			return;
		}
		rmoveCrumbs(pid);	
	}
	function getNowPid(id){
		for(var i=0;i<datas.length;i++){
			if(datas[i]['id']==id){
				return datas[i]['pid'];
			}
		}
	}
	function  rmoveCrumbs(index){
		navcontent='';
		$('.file-titer-nozerp').html('');
		$('.file-titer-nozerp').html('<a href="javascript:;" id="back">返回上一级</a><i>|</i><a href="javascript:;" id="all">所有文件</a><i>></i>')
		getFather(index)
	}
	
//自适应背景
	function changeHeight(){
		var h=document.documentElement.clientHeight-57;
		$('.sidebar').css('height','h');
		$('.file-area').css('height','h');
		
	}
	
//生成结构
	function sethtml(index){
		var arr=[];
		$('.folder').html('');
		for(var i=0;i<datas.length;i++){
			if(datas[i]['pid']==index){
				$('.folder').append(
					'<div class="folder-file" id="'+datas[i]['id']+'"><i class="ico"></i><div class="text"><p>'+datas[i]['name']+'</p><input type="text" value="'+datas[i]['name']+'"></div></div>'
				);
			}
		}
	}
	
//移动弹框
	function Moveposition(){
		var l=($(window).width()-$('.tree').outerWidth())/2;
		var t=($(window).height()-$('.tree').outerHeight())/2;
		$('.tree').css('top',t).css('left',l);
	}
	
//生成移动框里菜单
	function treeHtml(parent,index){
		for(var i=0;i<datas.length;i++){
			var nIndex=index;
			if(datas[i]['pid']==nIndex){
				num=0;
				num=getCeng(nIndex);
				var Nli=$('<li id="'+datas[i]['id']+'"></li>')
				var left=num*15;
				var Np=$('<p>').css('margin-left',left)
				Nli.append(Np.append('<i></i><em></em><span>'+ datas[i]['name'] +'</span>'))
				parent.append(Nli);
				var id=datas[i]['id'];
				var off=ischild(id);
				if(off){
					var ul=$('<ul>');
					var thisIndex=id;
					treeHtml(ul,thisIndex);
					Nli.append(ul);
				}
			}
		}
	}


//查看这个元素在第几层
	function getCeng(c){
		for(var i=0;i<datas.length;i++){
			if(datas[i]['id']==c){//如果当前与数组的id一样；就在此基础继续加就可以
				num++;
				c=datas[i]['pid'];
				if(c==-1){
					return num;
				}
				getCeng(c);
				break;
			}
		}
		return num;
	}
	
//查看下他下面有没有子集
	function ischild(id){
		var off=false;
		for(var i=0;i<datas.length;i++){
			if(datas[i]['pid']==id){
				off=true;
			}
		}
		return off;
	}


	function hasName(newName){
		//循环所有文件夹，如果其中一个名字和我们传入的名字一直，就代表重复，那就返回 false，如果循环执行之后，就代表没有重复返回true
		for(var i = 0; i < fileList.children.length; i++){
			var name=fileList.children[i].children[1].children[0].innerHTML;
			if(name == newName){
				return false;
			}
		}
		return true;
	}
	//进入那个文件夹显示那个文件夹的name
	function hearnav(id){
		$('.file-titer-nozerp').append('<a href="javascript:;" id="'+ id +'">'+ getNowName(id) +'</a><i>></i>')
	}
	
	function getId(id){
		for(var i=0; i<datas.length; i++){
			if(datas[i]['id'] == id){
				return datas[i]['id'];
			}
		}
	}
	
	
//判断有没有重名？
    function getName(){
		var arr = [];
		for(var i = 0; i < fileList.children.length; i++){
			var name=fileList.children[i].children[1].children[0].innerHTML;
			if((name.substring(0,5) == "新建文件夹"
			&& !isNaN(name.substring(5)))
			|| name == "新建文件夹"
			){
				var nub = parseInt(name.substring(5)) - 1; 
				nub = isNaN(nub)?0:nub;
				arr[nub] = name; 
			}
		}
		
		if(!arr[0]){ 
			return "新建文件夹";
		}
		
		for(var i = 1; i <arr.length; i++){
			if(!arr[i]){
				return "新建文件夹" + (i+1); 
			}
		}
		return "新建文件夹" + (arr.length+1);
	}
	function getActive(index){
		ard = [];
		for(var i=0; i<datas.length; i++){
			if(datas[i]['pid'] == index && $('#'+ datas[i]['id']).attr('class') == 'folder-file-now'){
				ard.push(datas[i]['id']);
			}
		}
	
	}