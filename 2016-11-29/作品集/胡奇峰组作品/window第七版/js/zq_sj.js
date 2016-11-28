(function(){
			var zq_wrap = document.getElementById("zq_wrap");
			var span1 = document.querySelectorAll("#zq_hours span");
			var span2 = document.querySelectorAll("#zq_year span");
			var sh_sp = document.querySelectorAll(".zq_sj span");
			var timer = null;
			var zq_sh = document.getElementById("zq_sh");
			var zq_sj = document.getElementsByClassName("zq_sj")[0];
			var zq_y = document.getElementsByClassName("zq_y")[0];
			var zq_center = document.getElementById("zq_center");
			var zq_sjnav = document.getElementById("zq_sjnav")
			var zq_tds = zq_center.getElementsByTagName("td");
			var zq_nowday = document.getElementById("zq_nowday");
			var zq_fes = document.getElementById("zq_fes");
			var zy_desktop = document.getElementById("zy_desktop");
			zq_wrap.onclick = function(e){
				e.stopPropagation();
			}
			//实现头部时间显示
			fnn();
			function fnn(){
				var year = 0;
				var month = 0;
				var date2 = 0;
				
				timer = setInterval(function(){
					var date = new Date();
					year = date.getFullYear();
					month = fn1(date.getMonth()+1);
					date2 = fn1(date.getDate());
					var hours = fn1(date.getHours());
					var minutes = fn1(date.getMinutes());
					var seconds = fn1(date.getSeconds());
					var hv = [hours,minutes,seconds];
					var yr = [year,month,date2];
					
					function fn1(sj){
						if(sj>=10){
							return sj;
						}else{
							return "0"+sj;
						}
					}
					
					sh_sp[0].innerHTML = hours+":"+minutes;
					sh_sp[1].innerHTML = year+"/"+month+"/"+date2;
					for(var i=0; i<span1.length; i++){
						span1[i].innerHTML = hv[i];
						span2[i].innerHTML = yr[i];
					}
					
				},500)
				
				
				setTimeout(function(){
					var zq_monthh = month;
					var zq_yearr = year;
					var zq_date22 = date2;
					//获取中间部分头部显示的年月份
					zq_sjnav.innerHTML = zq_yearr+"年"+zq_monthh+"月";
					//中部内容
					var zq_days = ["日","一","二","三","四","五","六"];
					tbl();
					function tbl(){
						
						
						
						//判断二月份有几天
						var zq_months = [31,28+twomonth(zq_yearr),31,30,31,30,31,31,30,31,30,31];
						function twomonth(year){
							if(year%100 == 0){
								if(year%400==0){
									return 1;
								}else{
									return 0;
								}
							}else{
								if(year%4 == 0){
									return 1;
								}else{
									return 0;
								}
							}
						}
						//生成默认结构
						var zq_tbody = document.createElement("tbody");
						zq_tbody.id = "zq_tbody";
						zq_tbody.style.display = "block";
						zq_tbody.className = "zq_tbmr";
						var zq_tbodyhead = document.createElement("tbody");
						zq_tbodyhead.id = "zq_tbodyhead";
						zq_tbodyhead.className = "zq_tbmr";
						var zq_thead = document.createElement("thead");
						zq_tbodyhead.appendChild(zq_thead);
						zq_center.appendChild(zq_tbodyhead);
						zq_center.appendChild(zq_tbody);
						for(var i=0; i<zq_days.length-1; i++){
							var zq_tr = document.createElement("tr");
							zq_tbody.appendChild(zq_tr);
							for(var j=0; j<zq_days.length; j++){
								if(i==0){
									var zq_tdhead = document.createElement("td");
									var zq_tdhsp = document.createElement("span");
									zq_tdhead.appendChild(zq_tdhsp);
									zq_thead.appendChild(zq_tdhead);
								}
								
								var zq_td = document.createElement("td");
								var zq_tdsp = document.createElement("span");
								zq_td.appendChild(zq_tdsp);
								zq_tr.appendChild(zq_td);
							}
						}
						
						var zq_tbmrs = document.getElementsByClassName("zq_tbmr");
						var zq_tbmrslt = [];
						for(var i=0; i<zq_tbmrs.length; i++){
							zq_tbmrslt.push([zq_tbmrs[i].offsetLeft,zq_tbmrs[i].offsetTop])
						}
						for(var i=0; i<zq_tbmrs.length; i++){
							zq_tbmrs[i].style.position = "absolute";
							zq_tbmrs[i].style.left = zq_tbmrslt[i][0]+"px";
							zq_tbmrs[i].style.top = zq_tbmrslt[i][1]+"px";
						}
						
						var zq_tdsps = document.querySelectorAll(".zq_tbmr span");
						//加上表头的星期
						for(var j=0; j<7; j++){
							zq_tdsps[j].innerHTML = zq_days[j];
							zq_tdsps[j].className = "zq_ff";
						}
						//默认当前月份的数据
						zq_monthmr(zq_monthh,zq_yearr);
						function zq_monthmr(monthh,yearr){
							//获取当前月一日是星期几
							var zq_oneday = new Date(yearr,monthh-1,1).getDay();
							//声明一个变量B
							var b = 0;
							//清空默认样式
							for(var i=7; i<zq_tdsps.length; i++){
								zq_tdsps[i].style.background = "";
								zq_tdsps[i].style.borderColor = "";
								zq_tds[i].className = "";
								zq_tdsps[i].className = "";
							}
							
							//循环添加当月对应的日期表，让当月的时间表高亮，给当前的日期加上样式。
							for(var j=7+zq_oneday; j<zq_months[monthh-1]+7+zq_oneday; j++){
								b++;
								zq_tdsps[j].innerHTML = b;
								zq_tdsps[j].className = "zq_ff";
								if(zq_tdsps[j].innerHTML == date2&&monthh == month&&yearr == year){
									zq_tdsps[j].style.background = "#0078d7";
									zq_tdsps[j].style.borderColor = "#000";
									zq_tds[j].className = "zq_blue";
								}
							}
							
							//获取当前月的上个月天数\
							var zq_sjlast = 0;
							if(monthh == 1){
								zq_sjlast = zq_months[zq_months.length-1]
							}else{
								zq_sjlast = zq_months[monthh-2];
							}
							//循环第二行没有添加内容的span
							for(var i=13; i>6; i--){
								//判断span内容是否为空，若为空，给他添加对应上个月末尾几天的日期
								if(zq_tdsps[i].className != "zq_ff"){
									zq_tdsps[i].innerHTML = zq_sjlast;
									zq_sjlast--;
								}
							}
							
							//获取当前月下个月的天数
							var zq_sjnext = 0;
							if(monthh == 12){
								zq_sjnext = zq_months[0]
							}
							var zq_nxt = 1;
							//给最后两行没有添加日期的span加上内容
							for(var i=35; i<zq_tdsps.length; i++){
								if(zq_tdsps[i].className != "zq_ff"){
									zq_tdsps[i].innerHTML = zq_nxt;
									zq_nxt++;
								}
							}
						}
						//生成月份、年份表格
						zq_monthyearr();
						zq_monthyearr();
						function zq_monthyearr(){
							var zq_tbodymonth = document.createElement("tbody");
							zq_tbodymonth.style.display = "none";
							zq_center.appendChild(zq_tbodymonth);
							for(var i=0; i<4; i++){
								var zq_tbmtr = document.createElement("tr");
								zq_tbodymonth.appendChild(zq_tbmtr);
								for(var j=0; j<4; j++){
									var zq_tbmtd = document.createElement("td");
									var zq_tbmsp = document.createElement("span");
									zq_tbmtd.appendChild(zq_tbmsp);
									zq_tbmtr.appendChild(zq_tbmtd);
								}
							}
						}
						zq_monthyear(zq_monthh,12,"zq_tbodymonth",zq_yearr);
						zq_monthyear(zq_yearr,10,"zq_tbodyyear");
						
						function zq_monthyear(yy,nn,ids,yrr){
							var zq_tbodymonth = null;
							if(!yrr){
								zq_tbodymonth = document.querySelector("#zq_center>tbody:nth-of-type(4)");
								zq_tbodymonth.id = ids;
							}else{
								zq_tbodymonth = document.querySelector("#zq_center>tbody:nth-of-type(3)");
								zq_tbodymonth.id = ids;
							}
							if(!yrr){
								var zq_tbmsps = document.querySelectorAll("#zq_tbodyyear span");
								var zq_tbmtds = document.querySelectorAll("#zq_tbodyyear td");
							}else{
								var zq_tbmsps = document.querySelectorAll("#zq_tbodymonth span");
								var zq_tbmtds = document.querySelectorAll("#zq_tbodymonth td");
							}
							
							
							var zq_tbmmr = 0;
							var zq_tbmmry = 0;
							if(!yrr){
								zq_tbmmr = yy-yy%10;
							}
							for(var i=0; i<nn; i++){
								if(!yrr){
									zq_tbmsps[i].className = "zq_ffff";
								}else{
									zq_tbmsps[i].className = "zq_fff";
								}
								
								zq_tbmtds[i].className = "";
								zq_tbmsps[i].style.borderColor = "";
								zq_tbmsps[i].style.background = "";
							}
							for(var i=0; i<zq_tbmsps.length; i++){
								if(!yrr){
									zq_tbmsps[i].innerHTML = zq_tbmmr;
									zq_tbmmr++;
									if(zq_tbmsps[i].innerHTML == year){
										zq_tbmtds[i].className = "zq_blue";
										zq_tbmsps[i].style.borderColor = "#000";
										zq_tbmsps[i].style.background = "#0078d7";
									}
								}else{
									if(zq_tbmmry>=12){
										zq_tbmmry = 0;
									}
									zq_tbmmry++;
									zq_tbmsps[i].innerHTML = zq_tbmmry;
									if(zq_tbmsps[i].innerHTML == month&&yrr == year){
										
										zq_tbmtds[i].className = "zq_blue";
										zq_tbmsps[i].style.borderColor = "#000";
										zq_tbmsps[i].style.background = "#0078d7";
									}
								}
								
							}
						}
						
						
						//点击回到月份、年份
						var zq_sjnav = document.getElementById("zq_sjnav");
						var zq_tbodymonth = document.getElementById("zq_tbodymonth");
						var zq_tbodyyear = document.getElementById("zq_tbodyyear");
						var zq_tbopacity = 0;
						zq_sjnav.onclick = function(e){
							var zq_tbmonthsps = Array.from(document.querySelectorAll("#zq_tbodymonth span"));
							if(zq_tbopacity == 0){
								mTween(zq_tbody,{opacity:0},300,"easeOut",function(){
									zq_tbody.style.display = "none";
								});
								mTween(zq_tbodyhead,{opacity:0},300,"easeOut",function(){
									zq_tbodyhead.style.display = "none";
								})
								mTween(zq_tbodymonth,{opacity:100},300,"easeOut",function(){
									zq_tbodymonth.style.display = "block";
								});
								mTween(zq_tbodyyear,{opacity:0},300,"easeOut",function(){
									zq_tbodyyear.style.display = "none";
								});
								//点击任何月份月份会根据月份的不同，修改表格里面的数据
								zq_tbmonthsps.forEach(function(item,i){
									item.onclick = function(e){
										if(item.className == "zq_fff"){
											zq_monthh = item.innerHTML;
										}else{
											zq_monthh = item.innerHTML;
											zq_yearr = Number(zq_yearr) + 1;
											zq_months[1] = 28+twomonth(zq_yearr);
											zq_monthyear(zq_monthh,12,"zq_tbodymonth",zq_yearr);
										}
										zq_monthmr(zq_monthh,zq_yearr);
										zq_sjnav.innerHTML = zq_yearr+"年"+zq_monthh+"月";
										mTween(zq_tbody,{opacity:100},300,"easeOut",function(){
											zq_tbody.style.display = "block";
										});
										mTween(zq_tbodyhead,{opacity:100},300,"easeOut",function(){
											zq_tbodyhead.style.display = "block";
										})
										mTween(zq_tbodymonth,{opacity:0},300,"easeOut",function(){
											zq_tbodymonth.style.display = "none";
										});
										mTween(zq_tbodyyear,{opacity:0},300,"easeOut",function(){
											zq_tbodyyear.style.display = "none";
										});
										zq_tbopacity = 0;
										zq_fess(zq_monthh,zq_date22,zq_yearr);
										zq_tbspck();
										e.stopPropagation();
									}
								})
							}
							if(zq_tbopacity == 1){
								zq_monthyear(zq_yearr,10,"zq_tbodyyear");
								mTween(zq_tbody,{opacity:0},300,"easeOut",function(){
									zq_tbody.style.display = "none";
								});
								mTween(zq_tbodyhead,{opacity:0},300,"easeOut",function(){
									zq_tbodyhead.style.display = "none";
								})
								mTween(zq_tbodymonth,{opacity:0},300,"easeOut",function(){
									zq_tbodymonth.style.display = "none";
								});
								mTween(zq_tbodyyear,{opacity:100},300,"easeOut",function(){
									zq_tbodyyear.style.display = "block";
								});
								var zq_tbyearsps = Array.from(document.querySelectorAll("#zq_tbodyyear span"));
								zq_tbyearsps.forEach(function(item,i){
									item.onclick = function(e){
										zq_yearr = item.innerHTML;
										if(item.className == "zq_ffff"){
											zq_months[1] = 28+twomonth(zq_yearr);
										}
										else{
											zq_months[1] = 28+twomonth(zq_yearr);
										}
										zq_monthyear(zq_monthh,12,"zq_tbodymonth",zq_yearr);
										zq_monthmr(zq_monthh,zq_yearr);
										zq_sjnav.innerHTML = zq_yearr+"年"+zq_monthh+"月";
										mTween(zq_tbody,{opacity:0},300,"easeOut",function(){
											zq_tbody.style.display = "none";
										});
										mTween(zq_tbodyhead,{opacity:0},300,"easeOut",function(){
											zq_tbodyhead.style.display = "none";
										})
										mTween(zq_tbodymonth,{opacity:100},300,"easeOut",function(){
											zq_tbodymonth.style.display = "block";
										});
										mTween(zq_tbodyyear,{opacity:0},300,"easeOut",function(){
											zq_tbodyyear.style.display = "none";
										});
										if(zq_tbodymonth.style.display = "block"){
											zq_tbopacity = 1;
										}else if(zq_tbody.style.display = "block"){
											zq_tbopacity = 0;
										}
										zq_fess(zq_monthh,zq_date22,zq_yearr);
										zq_tbspck();
										e.stopPropagation();
									}
								})
							}
							zq_tbopacity++;
							e.stopPropagation();
						}
						
						//点击头部时间，回到当前时间
						var zq_yearnav = document.getElementById("zq_year");
						zq_yearnav.onclick = function(e){
							zq_monthh = month;
							zq_yearr = year;
							zq_months[1] = 28+twomonth(zq_yearr);
							zq_date22 = date2;
							zq_monthmr(zq_monthh,zq_yearr);
							zq_monthyear(month,12,"zq_tbodymonth","zq_tbodyyear");
							zq_sjnav.innerHTML = zq_yearr+"年"+zq_monthh+"月";
							mTween(zq_tbody,{opacity:100},300,"easeOut",function(){
								zq_tbody.style.display = "block";
							});
							mTween(zq_tbodyhead,{opacity:100},300,"easeOut",function(){
								zq_tbodyhead.style.display = "block";
							})
							mTween(zq_tbodymonth,{opacity:0},300,"easeOut",function(){
								zq_tbodymonth.style.display = "none";
							});
							mTween(zq_tbodyyear,{opacity:0},300,"easeOut",function(){
								zq_tbodyyear.style.display = "none";
							});
							zq_fess(zq_monthh,zq_date22,zq_yearr);
							zq_tbspck();
							e.stopPropagation();
						}
						
						//点击上一页，下一页
						var zq_sjnavbottom = document.getElementById("zq_sjnavbottom");
						var zq_sjnavtop = document.getElementById("zq_sjnavtop");
						
						var zq_tbodyy = document.getElementById("zq_tbody");
						var zq_tbodymm = document.getElementById("zq_tbodymonth");
						var zq_tbodyee = document.getElementById("zq_tbodyyear");
						var zq_week = document.getElementById("zq_week");
						fntdss(zq_tbodyy);
						var zq_years = zq_yearr;
						zq_sjnavbottom.onclick = function(e){
							if(zq_tbodyy.style.display == "block"){
								zq_monthh++;
								if(zq_monthh > 12){
									zq_monthh = 1;
									zq_yearr = Number(zq_yearr)+1;
								}
								zq_months[1] = 28+twomonth(zq_yearr);
								zq_monthmr(zq_monthh,zq_yearr);
								zq_sjnav.innerHTML = zq_yearr+"年"+zq_monthh+"月";
								
							}
							if(zq_tbodymm.style.display == "block"){
								zq_yearr ++;
								zq_months[1] = 28+twomonth(zq_yearr);
								zq_monthmr(zq_monthh,zq_yearr);
								zq_sjnav.innerHTML = zq_yearr+"年"+zq_monthh+"月";
								zq_monthyear(zq_monthh,12,"zq_tbodymonth",zq_yearr);
								
							}
							if(zq_tbodyee.style.display == "block"){
								zq_yearr= Number(zq_yearr) + 10;
								zq_months[1] = 28+twomonth(zq_yearr);
								zq_monthmr(zq_monthh,zq_yearr);
								zq_sjnav.innerHTML = zq_yearr+"年"+zq_monthh+"月";
								zq_monthyear(zq_yearr,10,"zq_tbodyyear");
								
							}
							zq_fess(zq_monthh,zq_date22,zq_yearr);
							zq_tbspck();
							e.stopPropagation();
						}
						zq_sjnavtop.onclick = function(e){
							if(zq_tbodyy.style.display == "block"){
								zq_monthh--;
								if(zq_monthh < 1){
									zq_monthh = 12;
									zq_yearr = Number(zq_yearr)-1;
								}
								zq_months[1] = 28+twomonth(zq_yearr);
								zq_monthmr(zq_monthh,zq_yearr);
								zq_sjnav.innerHTML = zq_yearr+"年"+zq_monthh+"月";
								
							}
							if(zq_tbodymm.style.display == "block"){
								zq_yearr --;
								zq_months[1] = 28+twomonth(zq_yearr);
								zq_monthmr(zq_monthh,zq_yearr);
								zq_sjnav.innerHTML = zq_yearr+"年"+zq_monthh+"月";
								zq_monthyear(zq_monthh,12,"zq_tbodymonth",zq_yearr);
								
							}
							if(zq_tbodyee.style.display == "block"){
								zq_yearr= Number(zq_yearr) - 10;
								zq_months[1] = 28+twomonth(zq_yearr);
								zq_monthmr(zq_monthh,zq_yearr);
								zq_sjnav.innerHTML = zq_yearr+"年"+zq_monthh+"月";
								zq_monthyear(zq_yearr,10,"zq_tbodyyear");
								
							}
							zq_fess(zq_monthh,zq_date22,zq_yearr);
							zq_tbspck();
							e.stopPropagation();
						}
					}
					zq_tbspck();
					function zq_tbspck(){
						var zq_tbsps = zq_tbody.getElementsByTagName("span");
						for(var i=0; i<zq_tbsps.length; i++){
							zq_tbsps[i].onclick = function(){
								if(this.className == "zq_ff"){
									zq_date22 = this.innerHTML;
									zq_fess(zq_monthh,zq_date22,zq_yearr);
								}
							}
						}
					}
					zq_fess(zq_monthh,zq_date22,zq_yearr);
					function zq_fess(zq_mon,zq_dat,zq_yea){
						if(zq_mon == month&&zq_yea == year&&zq_dat == date2){
							zq_nowday.innerHTML = "今天";
						}else{
							zq_nowday.innerHTML = zq_yea+"."+zq_mon+"."+zq_dat;
						}
						if(zq_mon == 2&&zq_dat == 14){
							zq_fes.innerHTML = "情人节";
						}else if(zq_mon == 5&&zq_dat == 1){
							zq_fes.innerHTML = "搬砖节";
						}else if(zq_mon == 10&&zq_dat == 1){
							zq_fes.innerHTML = "国庆节";
						}else if(zq_mon == 1&&zq_dat == 1){
							zq_fes.innerHTML = "圆蛋";
						}else{
							zq_fes.innerHTML = "";
						}
					}
					
					function fntdss(zq_tbb){
						var zq_tdss = zq_tbb.getElementsByTagName("td");
						for(var j=0; j<zq_tdss.length; j++){
							zq_tdss[j].index = j;
							zq_tdss[j].onclick = function(e){
								for(var b=0; b<zq_tdss.length; b++){
									if(zq_tdss[b].className != "zq_blue"){
										zq_tdss[b].className = "";
									}
								}
								if(this.className == "zq_blue"){
									this.className = "zq_blue";
								}else{
									this.className = "zq_ccc";
								}
								zq_week.innerHTML = "星期"+zq_days[this.index%7];
								e.stopPropagation();
								return false;
							}
						}
					}
				},600)
			}
			
			//拖拽小图标
			var zq_bo = document.body.getBoundingClientRect();
			zq_sh.addEventListener("mouseenter",fnmr)
			zq_sh.addEventListener("mouseleave",fnmt)
				//移入时，判断后面部分是否隐藏，如果隐藏，就让他显示出来
			function fnmr(e){
				setTimeout(function(){
					if(zq_sh.offsetLeft == zq_bo.width-zq_sh.offsetWidth + zq_sj.offsetWidth+5){
						mTween(zq_sh,{left:zq_bo.width-zq_sh.offsetWidth},200,"easeOut");
					}
				},300)
			}
				//移出时，判断是否在最右侧 ，如果在，就把后面部分隐藏
			function fnmt(e){
				setTimeout(function(){
					if(zq_sh.offsetLeft == zq_bo.width-zq_sh.offsetWidth){
						mTween(zq_sh,{left:zq_bo.width-zq_sh.offsetWidth + zq_sj.offsetWidth+5},200,"easeOut");
					}
				},300)
			}
			
				//阻止小图标里面的内容冒泡
			zq_sj.onmouseout = function(e){
				e.stopPropagation();
				return false;
			}
			zq_y.onmouseout = function(e){
				e.stopPropagation();
				return false;
			}
			for(var i=0; i<zq_sh.length; i++){
				zq_sh[i].onmouseout = function(e){
					e.stopPropagation();
					return false;
				}
			}
			
			//双击小图标时，让时间表高度展开
			zq_sh.addEventListener("click",fnsjoc);
			var zq_odsj = 0;
			function fnsjoc(e){
				var zq_newsj = new Date().getTime();
				if(zq_newsj-zq_odsj<200){
					mTween(zq_wrap,{top:0},2000,"bounceOut");
				}
				zq_odsj = zq_newsj;
				e.stopPropagation();
			}
			//拖拽小图标，移动其位置
			zq_sh.onmousedown = function(e){
				var l = e.pageX-zq_sh.offsetLeft;
				var t = e.pageY-zq_sh.offsetTop;
				document.onmousemove = function(e){
					var zq_shl = e.pageX-l;
					var zq_sht = e.pageY-t
					if(zq_shl<0){
						zq_shl = 0;
					}
					if(zq_shl>zq_bo.width-zq_sh.offsetWidth){
						zq_shl = zq_bo.width-zq_sh.offsetWidth;
					}
					if(zq_sht<0){
						zq_sht = 0;
					}
					if(zq_sht>zq_bo.height-zq_sh.offsetHeight){
						zq_sht = zq_bo.height-zq_sh.offsetHeight;
					}
					zq_sh.style.left = zq_shl+"px";
					zq_sh.style.top = zq_sht+"px";	
					e.stopPropagation();
					return false;
				}
				e.stopPropagation()
				return false;
			}
			
			//抬起时，关闭移动事件
			zq_sh.onmouseup = function(e){
				e.stopPropagation()
				document.onmousemove = null;
				e.stopPropagation();
				return false;
			}
			//点击document时让时间表高度变为零	
			zy_desktop.onclick = function(e){
				mTween(zq_wrap,{top:-zq_bo.height},500,"easeOut");
//				e.stopPropagation();
//				return false;
			}
		})();
