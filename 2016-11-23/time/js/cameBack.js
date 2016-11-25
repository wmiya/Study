window.onload=function(){
		btnA();
		function btnA(){
			var left=document.getElementById("leftBanner");
			var right=document.getElementById("rightBanner");
			var top=(window.innerHeight-left.offsetHeight)/2;
			left.style.top=right.style.top=top+"px";
			left.style.left=20+"px";
			right.style.left = document.documentElement.clientWidth - right.offsetWidth - 20 + "px";
			window.onhashchange=function(){
				left.style.transform=right.style.transform="rotateZ(-360deg)";
				
				
			}
		
		}
	}