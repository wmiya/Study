
	var mcanvas = document.querySelector("#mcanvas");
	var mctx = mcanvas.getContext('2d');
	var mimg1 = document.querySelector('.mimg1'),
	mimg2 = document.querySelector('.mimg2'),
	mimg3 = document.querySelector('.mimg3'),
	mimg4 = document.querySelector('.mimg4'),
	mimg5 = document.querySelector('.mimg5'),
	mimg6 = document.querySelector('.mimg6'),
	mimg7 = document.querySelector('.mimg7');
	var mw = mcanvas.width,
	mh = mcanvas.height;

	var mt = ['0','1','2','3','4','5','6','7','8','9','10','11','12'];

	var date = new Date();
	var h = date.getHours(),
	m = date.getMinutes(),
	s = date.getSeconds();

	setInterval(function(){
		clock();
	},50);

	function clock(){
		var date = new Date();
		var h = date.getHours(),
		m = date.getMinutes(),
		s = date.getSeconds(),
		ms = date.getMilliseconds();

		mctx.shadowOffsetX = -2;//设置时钟的阴影模糊效果
		mctx.shadowOffsetY = -3;
		mctx.shadowBlur = 2;
		mctx.shadowColor = 'gray';

/* 绘制圆盘，和设置不同时段的背景图片 */
		mctx.beginPath();
			mctx.fillStyle = 'rgba(0,0,0,.15)';
		if(h>5&&h<10){//6~9
			mctx.drawImage(mimg1,0,0,mw,mh,0,0,mw,mh);//截取img的图片
		}
		if(h>9&&h<12){//10~11
			mctx.drawImage(mimg2,2,0,mw,mh,0,0,mw,mh);
		}
		if(h>11&&h<15){//12~14
			mctx.drawImage(mimg3,0,0,mw,mh,0,0,mw,mh);
		}
		if(h>14&&h<17){//15~16
			mctx.drawImage(mimg4,0,0,mw,mh,0,0,mw,mh);
		}
		if(h>16&&h<19){//17~18
			mctx.drawImage(mimg5,0,0,mw,mh,0,0,mw,mh);
		}
		if(h>18&&h<22){//19~21
			mctx.drawImage(mimg6,0,0,mw,mh,0,0,mw,mh);
		}
		if(h>21&&h<24||h<6){//22~5
			mctx.drawImage(mimg7,0,0,mw,mh,0,0,mw,mh);
		}
		mctx.lineWidth = 1;
		mctx.strokeStyle = 'black';
		mctx.arc(mw/2,mh/2,mw/2,0,360*Math.PI/180);
		mctx.fill();

/* 绘制秒针 */
		mctx.beginPath();
		if(h>=12){
			mctx.strokeStyle = 'rgba(255,255,255,.6)';
		}else {
			mctx.strokeStyle = 'rgba(0,0,0,.6)';
		}
		mctx.lineWidth = 2;
		mctx.moveTo(mw/2,mh/2);
		mctx.arc(mw/2,mh/2,mw/2.2,(-90+s*6+ms/167)*Math.PI/180,(-90+s*6+ms/167)*Math.PI/180,true);
		mctx.lineCap = 'round';
		mctx.stroke();

/* 绘制分针 */
		mctx.beginPath();
		if(h>=12){
			mctx.strokeStyle = 'rgba(255,255,255,1)';
		}else {
			mctx.strokeStyle = 'rgba(0,0,0,1)';
		}
		mctx.lineWidth = 2;
		mctx.moveTo(mw/2,mh/2);
		mctx.arc(mw/2,mh/2,mw/4,(-90+m*6+s/10)*Math.PI/180,(-90+m*6+s/10)*Math.PI/180,true);
		mctx.lineCap = 'round';
		mctx.stroke();

/* 绘制中心圆盘 */
		mctx.beginPath();
		if(h>=12){//下午
			mctx.fillStyle = 'rgba(0,0,0,.4)';
		}else{//上午
			mctx.fillStyle = 'rgba(255,255,255,.4)';
		}
		mctx.arc(mw/2,mh/2,mw/3,0,360*Math.PI/180);
		mctx.fill();

/* 绘制中心圆盘上的点 */
		if(h>=12){
			mctx.fillStyle = 'rgba(255,255,255,.5)';
		}else {
			mctx.fillStyle = 'rgba(0,0,0,.3)';
		}
		//上
		mctx.beginPath();
		mctx.arc(mw/2,mh/2-mw/3.3,mw/90,0,360*Math.PI/180);
		mctx.fill();
		//右
		mctx.beginPath();
		mctx.arc(mw/2+mw/3.3,mh/2,mw/90,0,360*Math.PI/180);
		mctx.fill();
		//下
		mctx.beginPath();
		mctx.arc(mw/2,mh/2+mw/3.3,mw/90,0,360*Math.PI/180);
		mctx.fill();
		//左
		mctx.beginPath();
		mctx.arc(mw/2-mw/3.3,mh/2,mw/90,0,360*Math.PI/180);
		mctx.lineCap = 'round';
		mctx.fill();

/* 绘制时数 */
		mctx.beginPath();
		if(h>=12){//夜晚
			mctx.strokeStyle = 'rgba(255,255,255,.7)';
		}else{//白天
			mctx.strokeStyle = 'rgba(0,0,0,.7)';
		}
		mctx.lineWidth = 2;
		mctx.font = 'bold '+mw/3.6+'px arial';

		if(h<13){
			if(mt[h%13]>=10){//让白天12点显示为12
				mctx.strokeText(mt[h%13],mw/2.8,mh/1.7);//由于单数跟双数的位置不一样
			}else{
				mctx.strokeText(mt[h%13],mw/2.35,mh/1.68);
			}
		}else{
			if(mt[h%13+1]>=10){//让夜晚的12点显示为0
				mctx.strokeText(mt[h%13+1],mw/2.8,mh/1.7);
			}else{
				mctx.strokeText(mt[h%13+1],mw/2.35,mh/1.68);
			}
		}
	}