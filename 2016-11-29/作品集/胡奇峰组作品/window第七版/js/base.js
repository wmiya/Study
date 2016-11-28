(function(){
	var arr = [
		[
			// {
			// 	sort:'会议',
			// 	caption:'标题11',
			// 	date:'2016,11,22',
			// 	content:'内容',
			// 	creatT:'15:30'
			// }
		],
		[
			{
				sort:'约会',
				caption:'标题21',
				date:'2016,11,22,00:00',
				content:'内容',
				creatT:'15:30'
			},
			{
				sort:'约会',
				caption:'标题22',
				date:'2016,11,22,00:00',
				content:'内容',
				creatT:'15:30'
			}
		],
		[
			{
				sort:'其他',
				caption:'标题31',
				date:'2016,11,22,00:00',
				content:'内容',
				creatT:'15:30'
			},
			{
				sort:'其他',
				caption:'标题32',
				date:'2016,11,22,00:00',
				content:'内容',
				creatT:'15:30'
			},
			{
				sort:'其他',
				caption:'标题33',
				date:'2016,11,22,00:00',
				content:'内容',
				creatT:'15:30'
			}
		]
	];
	var w_box = document.getElementById('w_box');
	var w_title = w_box.getElementsByClassName('w_title')[0];
	var w_close = w_box.getElementsByClassName('w_close')[0];
	var w_btn = w_box.getElementsByClassName('w_btn')[0];
	var w_cancel = w_box.getElementsByClassName('w_cancel')[0];
	var input = w_box.getElementsByTagName('input')[0];
	var textarea = w_box.getElementsByTagName('textarea')[0];
	//var ul2 = document.querySelectorAll('.w_left ul ul');
	var li1 = document.querySelectorAll('.w_left>ul>li');
	var h2 = document.querySelectorAll('.w_left>ul>li>h2');
	var w_right = w_box.getElementsByClassName('w_right')[0];
	var w_left = w_box.getElementsByClassName('w_left')[0];
	//var rChild = w_right.children;
	var timeInput = document.querySelectorAll('.w_time input');
	var w_edit = w_box.getElementsByClassName('w_edit')[0];
	var w_check = w_box.getElementsByClassName('w_check')[0];
	var w_rtitle = w_box.getElementsByClassName('w_rtitle');
	var w_caption = w_box.getElementsByClassName('w_caption');
	var w_time = w_box.getElementsByClassName('w_time');
	var w_content = w_box.getElementsByClassName('w_content');
	var zy_book = document.getElementById('zy_book');
	var zy_desktop = document.getElementById('zy_desktop');
	
// =========================================================
	zy_book.ondblclick = function(){
		mTween(w_box,{scale:1},500,'easeOut');
	}
	//数据生成
	arr.forEach(function(item,i){
		var ul = document.createElement('ul');
		item.forEach(function(item,i){
			var li = document.createElement('li');
			li.innerHTML = `<h2>${item.caption}<span>${item.creatT}</span></h2>`;
			ul.appendChild(li);
		})
		li1[i+1].appendChild(ul);
		addA(ul);

	})
	function addA(ele){
		if(ele.innerHTML != ''){
			var h2 = ele.previousElementSibling;
			var h2s = h2.children;
			if(!h2s[0]){
				var span = document.createElement('span');
				span.innerHTML = '+';
				h2.appendChild(span);
			}
		}
	}
	function removeA(ele){
		var h2 = ele.children;
		var ul = h2[0].nextElementSibling.children;
		if(!ul.length){
			var span = h2[0].children;
			h2[0].removeChild(span[0]);
		}
	}
	for(var i = 1;i < h2.length;i++){
		h2[i].onclick = function(){
			var ul = this.parentNode.parentNode.getElementsByTagName('ul');
			var next = this.nextElementSibling;
			var schild = this.children;
			if(next.children.length){
				for(var i = 0;i < ul.length;i++){
					if(ul[i] != next){
						var sc = ul[i].previousElementSibling.children;
	                    //ul[i].style.height = '0px';
	                    mTween(ul[i],{height:0},300,"easeOut");
	                    if(sc[0]){
	                    	sc[0].innerHTML = '+';
	                    }
	                }	
				}
				var chil = next.children.length;	
				if(next.style.height && next.style.height != '0px'){
					// next.style.height = '0px';
					mTween(next,{height:0},300,"easeOut");
					schild[0].innerHTML = '+';
				}else{
					//next.style.height = 40*chil + 'px';
					mTween(next,{height:40*chil},300,"easeOut");
					schild[0].innerHTML = '-';
				}
			}	
		}
	}
	
	//窗口拖拽
	w_title.onmousedown = function(ev){
		var disX = ev.pageX - w_box.getBoundingClientRect().left;
		var disY = ev.pageY - w_box.getBoundingClientRect().top;
		document.onmousemove = function(ev){
			var l = ev.pageX - disX;
			var t = ev.pageY - disY;
			//w_box.style.position = 'absolute';
			//w_box.style.margin = 0;
			w_box.style.left = l + 'px';
			w_box.style.top = t + 'px';
		}
		document.onmouseup = function(ev){
			document.onmousemove = document.onmouseup = null;
			ev.stopPropagation();
		}
		ev.stopPropagation();
		return false;
	}
	
	//关闭按钮
	w_close.onmouseover = function(){
		mOver(w_close);
	}
	w_close.onmouseout = function(){
		mOut(w_close);
	}
	w_close.onclick = function(){
		mClick(w_box);
		w_box.style.width = '250px';
		w_right.style.display = 'none';
		w_edit.style.display = 'none';
		w_check.style.display = 'none';
		w_box.style.transition = 0;
	}
	
	function mOver(ele){
		//ele.style.transition = '.5s';
		mTween(ele,{rotate:360},500,'easeOut');
		// ele.style.transform = 'rotate(360deg)';
		ele.style.border = '#969090 1px solid';
	}
	function mOut(ele){
		mTween(ele,{rotate:0},500,'easeOut');
		//ele.style.transform = 'rotate(0deg)';
		ele.style.border = '';
	}
	function mClick(ele){
		//ele.style.transition = '.5s';
		//ele.style.transform = 'scale(0)';
		mTween(ele,{scale:0},500,'easeOut');
	}
	//添加新备忘录
	li1[0].onclick = add;
	function add(){
		var date = new Date();
		var year = date.getFullYear();
		var month = add0(date.getMonth()+1);
		var dates = add0(date.getDate());
		w_edit.isEdit = false;
		w_right.style.display = 'none';
		w_edit.style.display = 'none';
		w_check.style.display = 'none';
		w_edit.style.opacity = 0;
		mTween(w_box,{width:700},500,"easeOut",function(){
			w_right.style.display = 'block';
			w_edit.style.display = 'block';
			mTween(w_edit,{opacity:100},300,"easeOut")
			w_check.style.display = 'none';
		});
		
		select.value = '会议';
		cInput.value = '';
		timeInput[0].value = year;
		timeInput[1].value = month;
		timeInput[2].value = dates;
		timeInput[3].value = timeInput[4].value = '';
		contInput.value = '';
	}
	//点击确定按钮生成标题、存储数据和倒计时
	var select = w_right.getElementsByTagName('select')[0];
	var cInput = document.querySelector('.w_caption input');
	var contInput = document.querySelector('.w_content input');
	var val = select.value;
	function getDate(){
		var data = {};
		data.sort = select.value;
		data.caption = cInput.value;
		timeInput[3].value = !timeInput[3].value ? 0 : timeInput[3].value;		
		timeInput[4].value = !timeInput[4].value ? 0 : timeInput[4].value;
		data.date = timeInput[0].value+','+add0(timeInput[1].value)+','+add0(timeInput[2].value)+','
		+add0(timeInput[3].value)+':'+add0(timeInput[4].value);
		data.content = contInput.value;
		return data;
	}
	var num = 0;
	var num1 = 0;
	w_btn.onclick = function(){
		var val1 = input.value;
		var val2 = textarea.innerHTML;
		var li = document.createElement('li');
		var h2 = document.createElement('h2');
		var time = new Date();
		var hour = time.getHours();
		var minutes = time.getMinutes();	
		var data = 	getDate();
		var sort = select.value;
		var time = data.date.split(',');
		val = select.value;
		val1 = !input.value ? "未命名" : input.value;
		h2.innerHTML = `${val1.substr(0,9)}<span>${hour}:${minutes}</span>`;
		li.appendChild(h2);
		if(!data.caption && !data.content){
			var span = document.createElement('span');
			span.innerHTML = '请填写标题或内容';
			span.className = 'w_remain'
			span.style.position = 'absolute';
			span.style.width = '200px';
			span.style.background = 'rgb(152, 87, 102)';
			span.style.left = 400 + 'px';
			span.style.top = 50 + 'px';
			w_box.appendChild(span);
			mTween(span,{height:40},800,"easeOut",function(){
			setTimeout(function(){
				mTween(span,{height:0},800,"easeOut",function(){
					w_box.removeChild(span);
				})
			},500)
		});	
		}else{
		var span = document.createElement('span');
		span.innerHTML = '添加完成';
		span.className = 'w_remain'
		span.style.position = 'absolute';
		span.style.left = 420 + 'px';
		span.style.top = 50 + 'px';
		w_box.appendChild(span)	
		if(w_edit.isEdit){
			var liIndex = ul2[index].getElementsByTagName('li');
			ul2[index].removeChild(liIndex[index1]);
			mTween(ul2[index],{height:ul2[index].children.length*40},800,"easeOut");
			arr[index].splice(index1,1);
			span.innerHTML = '修改完成';
		}
		mTween(span,{height:40},800,"easeOut",function(){
			setTimeout(function(){
				mTween(span,{height:0},800,"easeOut",function(){
					w_box.removeChild(span);
				})
			},500)
		});
		switch(sort){
			case '会议':
				arr[0].push(data);
				num = 0;
				break;
			case '约会':
				arr[1].push(data);
				num = 1;
				break;
			case '其他':
				arr[2].push(data);
				num = 2;
				break;
		}
		switch(val){
			case '会议':
				ul2[0].appendChild(li);
				if(ul2[0].style.height && ul2[0].style.height != '0px'){
					mTween(ul2[0],{height:ul2[0].children.length*40},800,"easeOut");
				}
				addA(ul2[0]);
				break;
			case '约会':
				ul2[1].appendChild(li);
				if(ul2[1].style.height && ul2[1].style.height != '0px'){
					mTween(ul2[1],{height:ul2[1].children.length*40},800,"easeOut");
				}
				addA(ul2[1]);
				break;
			case '其他':
				ul2[2].appendChild(li);
				if(ul2[2].style.height && ul2[2].style.height != '0px'){
					mTween(ul2[2],{height:ul2[2].children.length*40},800,"easeOut");
				}
				addA(ul2[2]);
				break;
		}
		var targetDate = new Date();
		//var h = timeInput[3].value;
		//var second = timeInput[4].value;
		timeInput[3].value = !timeInput[3].value ? 0 : timeInput[3].value;		
		timeInput[4].value = !timeInput[4].value ? 0 : timeInput[4].value;
		console.log(timeInput[3].value,timeInput[4].value)
		targetDate.setFullYear(timeInput[0].value,timeInput[1].value - 1,timeInput[2].value);
		targetDate.setHours(timeInput[3].value,timeInput[4].value,0,0);
		// setTime(targetDate,li);
		if(time[3].split(':')[0] != 0){
			li.num = num;
			li.num1 = arr[num].length -1;
			li.timer = setInterval(
				function(){
					setTime(targetDate,li);
				},1000
			);
		} 
		
		details();
		add();
		}
	};
	//提示框
	function attent(i,j){
		var w_attention = document.createElement('div');
		var w_atitle = document.createElement('div');
		var span = document.createElement('span');
		var div2 = document.createElement('div');
		var w_attentitle = document.createElement('div');
		var w_acaption = document.createElement('div');
		var w_atime = document.createElement('div');
		var w_acontent = document.createElement('div');
		w_attention.className = 'w_attention';
		w_atitle.className = 'w_atitle';
		span.className = 'w_aclose';
		div2.className = 'w_acont';
		w_attentitle.className = 'w_attentitle';
		w_acaption.className = 'w_acaption';
		w_atime.className = 'w_atime';
		w_acontent.className = 'w_acontent';
		w_atitle.innerHTML = '提醒';
		span.innerHTML = 'X';
		w_attention.style.display = 'block';
		w_attentitle.innerHTML = '主题：'+arr[i][j].sort;
		w_acaption.innerHTML = '标题：'+arr[i][j].caption.substr(0,19);
		w_atime.innerHTML = '时间：'+arr[i][j].date;
		if(arr[i][j].content.length > 40){
			w_acontent.innerHTML = '内容：'+arr[i][j].content.substr(0,40)+'...';
		}else{
			w_acontent.innerHTML = '内容：'+arr[i][j].content;
		}
		span.onmouseover = function(){
			mOver(span);
		}
		span.onmouseout = function(){
			mOut(span);
		}
		span.onclick = function(){
			mClick(w_attention);
			zy_desktop.removeChild(w_attention);
		}
		w_atitle.onmousedown = function(ev){
		var disX = ev.clientX - w_attention.offsetLeft;
		var disY = ev.clientY - w_attention.offsetTop;
		document.onmousemove = function(ev){
			var l = ev.clientX - disX;
			var t = ev.clientY - disY;
			w_attention.style.position = 'absolute';
			w_attention.style.margin = 0;
			w_attention.style.left = l + 'px';
			w_attention.style.top = t + 'px';
		}
		document.onmouseup = function(){
			document.onmousemove = document.onmouseup = null;
			ev.stopPropagation();
		}
		ev.stopPropagation();
		return false;
	}
		w_atitle.appendChild(span);
		div2.appendChild(w_attentitle);
		div2.appendChild(w_acaption);
		div2.appendChild(w_atime);
		div2.appendChild(w_acontent);
		w_attention.appendChild(w_atitle);
		w_attention.appendChild(div2);
		zy_desktop.appendChild(w_attention);
	}
	//取消按钮
	w_cancel.onclick = function(){
		add();
	}
	//倒计时
	var aclose = document.getElementsByClassName('w_aclose')[0];
	//var aclose = document.getElementsByClassName(w_aclose)[0];
	function setTime(targetDate,ele){
		var nowDate = new Date();
		var disTime = targetDate.getTime() - nowDate.getTime();
		if(disTime < 0 ){
			attent(ele.num,ele.num1);
			clearInterval(ele.timer);
		} else {
			var day = parseInt(disTime/86400000);
			var hours = parseInt((disTime%86400000)/3600000);
			var minutes = parseInt((disTime%3600000)/60000);
			var seconds = parseInt((disTime%60000)/1000);
		}
	}
	//点击每条备忘录查看详情
	var ul1 = w_left.getElementsByTagName('ul')[0];
	var ul2 = Array.from(ul1.getElementsByTagName('ul'));
	var index = 0;
	var index1 = 0;
	details();
	function details(){
		ul2.forEach(function(item,i){
		var childs = Array.from(item.children);
		childs.forEach(function(self,j){
			self.onclick = function(){
				//w_box.style.width = '700px';
				w_check.style.opacity = 0;
				mTween(w_box,{width:700},300,"easeOut",function(){
					w_right.style.display = 'block';
					w_check.style.display = 'block';
					mTween(w_check,{opacity:100},500,"easeOut")
					w_edit.style.display = 'none';
				});
				// w_right.style.display = 'block';
				// w_check.style.display = 'block';
				// w_edit.style.display = 'none';
				w_rtitle[1].innerHTML = '主题：'+arr[i][j].sort;
				w_caption[1].innerHTML = '标题：'+arr[i][j].caption;
				w_time[1].innerHTML = '时间：'+arr[i][j].date;
				w_content[1].innerHTML = '内容：'+arr[i][j].content;
				index = i;
				index1 = j;
			}
			self.onmouseover = function(){
				this.style.background = '#191c1f';
			}
			self.onmouseout = function(){
				this.style.background = '';
			}
		})
	})

	}
	//修改和删除备忘录
	var w_bian = w_right.getElementsByClassName('w_bian')[0];
	var as = w_bian.getElementsByTagName('a');
	var capInput = w_caption[0].getElementsByTagName('input')[0];
	var contInput = w_content[0].getElementsByTagName('textarea')[0];
	as[0].onclick = function(){
		w_edit.isEdit = true;
		var dateTime = arr[index][index1].date.split(',');
		var hs = dateTime[3].split(':');
		w_check.style.display = 'none';
		w_edit.style.opacity = 0;
		w_edit.style.display = 'block';
		mTween(w_edit,{opacity:100},500,"easeOut")
		select.value = arr[index][index1].sort;
		capInput.value = arr[index][index1].caption;
		contInput.value = arr[index][index1].content;
		timeInput[0].value = dateTime[0];
		timeInput[1].value = dateTime[1];
		timeInput[2].value = dateTime[2];
		timeInput[3].value = hs[0];
		timeInput[4].value = hs[1];
	};
	as[1].onclick = function(){
		arr[index].splice(index1,1);

		var li = ul2[index].getElementsByTagName('li');
		console.log(index,index1)
		console.log(arr)
		ul2[index].removeChild(li[index1]);
		mTween(ul2[index],{height:li.length*40},800,"easeOut");
		add();
		details();
		removeA(li1[index+1]);
		var span = document.createElement('span');
		span.innerHTML = '删除完成';
		span.className = 'w_remain'
		span.style.position = 'absolute';
		span.style.background = 'rgb(152, 87, 102)';
		span.style.left = 420 + 'px';
		span.style.top = 50 + 'px';
		w_box.appendChild(span);
		mTween(span,{height:40},800,"easeOut",function(){
			setTimeout(function(){
				mTween(span,{height:0},800,"easeOut",function(){
					w_box.removeChild(span);
				})
			},500)
		});

	};
	function add0(n) {
		return n < 10 ? '0' + n : '' + n;
	}
})()