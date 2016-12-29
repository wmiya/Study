function ajax(method,url,val,succ,fail){
		var ajax = new XMLHttpRequest();
		
		if(method === 'get'){
			ajax.open(method,url+'?'+val);
			ajax.send();
		}else{
			ajax.open(method,url);
			ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			ajax.send(val);
		}
		
		ajax.onreadystatechange = function(){
			if(ajax.readyState === 4){
				if(ajax.status >=200 && ajax.status <= 206){
					succ(ajax.responseText);
					//s.innerHTML = ajax.responseText;
				}else{
					fail(ajax.status);
					//console.log(ajax.status);
				}
			}
		}
		
//		if(typeof ajax.onload === 'undefinde'){   //obj   undefinde}

		//console.log(typeof ajax.onload)
		
		
	}