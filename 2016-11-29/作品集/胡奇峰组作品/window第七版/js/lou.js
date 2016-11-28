var louWrap = document.getElementById('louWrap');
var louPage = document.querySelectorAll('.louPage');
var louList = document.querySelector('.louList');
var louBtn = document.querySelectorAll('#louWrap input');
var louIcon = document.querySelectorAll('#louWrap a');
var n = louPage.length-1;
var isScale = false;
louBtn[0].onclick = function (e) {
	e.cancelBubble = true;
	louMoveLeft();
}
louBtn[1].onclick = function (e) {
	e.cancelBubble = true;
	louMoveRight();
}
function louMoveLeft() {
	for (var i = 0; i < louPage.length; i++) {
		louPage[i].style.zIndex = 0;
	}
	if (n < 0) {
		return;
	}
	louPage[n].style.transform = 'rotateY(-180deg)';
	if (n-1 <= 0) {
		louPage[n].style.zIndex = 10;
	}else {
		louPage[n-1].style.zIndex = louPage[n].style.zIndex = 10;
	}
	n--;
}
function louMoveRight() {
	for (var i = 0; i < louPage.length; i++) {
		louPage[i].style.zIndex = 0;
	}
	if (n >= louPage.length-1) {
		return;
	}
	louPage[n+1].style.transform = 'rotateY(0deg)';
	if (n+2 >= louPage.length-1) {
		louPage[n+1].style.zIndex = 10;
	}else {
		louPage[n+2].style.zIndex = louPage[n+1].style.zIndex = 10;
	}
	n++;
}
louIcon[0].onclick = function (e) {
	e.cancelBubble = true;
	if (isScale) {
		louBig();
	}else {
		louSmall();
	}
}
louIcon[1].onclick = function (e) {
	e.cancelBubble = true;
	louWrap.style.display = 'none';
}
louIcon[0].onmouseover = louIcon[1].onmouseover = function () {
	this.style.opacity = 1;
}
louIcon[0].onmouseout = louIcon[1].onmouseout = function () {
	this.style.opacity = .3;
}
function louBig() {
	mTween(louWrap,{left:300,top:50},1000,'linear',function () {
			louWrap.style.transform = 'scale(1)';
			louIcon[0].style.background = 'url(img/icon3.png) no-repeat 0 0'
			isScale = false;
		});
}
function louSmall() {
	louWrap.style.transform = 'scale(.5)';
		mTween(louWrap,{left:800,top:250},1000,'linear',function () {
			louIcon[0].style.background = 'url(img/icon2.png) no-repeat 0 0'
			isScale = true;
		});
}
var louShow = document.querySelector('.louShow');
var louMark = document.querySelectorAll('.louMark');
var louShowList = document.querySelector('.louShowList');
louMark[0].onclick = function (e) {
	e.cancelBubble = true;
	if (louShowList.offsetLeft == -600) {
		return;
	}
	mTween(louShowList,{left:louShowList.offsetLeft-300},500,'linear');
}
louMark[1].onclick = function (e) {
	e.cancelBubble = true;
	if (louShowList.offsetLeft == 0) {
		return;
	}
	mTween(louShowList,{left:louShowList.offsetLeft+300},500,'linear');
}
var louShowPhotos = louShowList.getElementsByTagName('li');
var louShowImg = louShow.firstElementChild;
for (var i = 0; i < louShowPhotos.length; i++) {
	louShowPhotos[i].index = i;
	louShowPhotos[i].onclick = function (e) {
		e.cancelBubble = true;
		louShowImg.src = 'img/z' + (this.index+1) +'.png';
	}
}
var louPhoto = document.querySelector('.louPhoto');
var louPhotoLis = document.querySelectorAll('.louPhoto1 li');
for (var i = 0; i < louPhotoLis.length; i++) {
	louPhotoLis[i].index = i
	louPhotoLis[i].style.left = 160 * (i%2) + 5 + 'px';
	louPhotoLis[i].style.top = 150 * (i%3) + 20 + 'px';
}
var louPhotoBtn = document.getElementById('zy_photo');
louPhotoBtn.ondblclick = function (e) {
	e.cancelBubble = true;
	louWrap.style.display = 'block';
	mTween(louWrap,{opacity:100},1000,'linear');
}