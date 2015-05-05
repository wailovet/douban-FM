function addFavorites(obj){
	var supperyStorage = new SupperyStorage();
	var mylike = supperyStorage.get('mylike');
	for(var i=0;i<mylike.length;i++){
		if(mylike[i].ssid == obj.ssid){
			return false;
		}
	}
	mylike.push(obj);
	supperyStorage.set('mylike',mylike);
	return true;
}

function delFavorites(obj){
	var supperyStorage = new SupperyStorage();
	var mylike = supperyStorage.get('mylike');
	var mylike2 = new Array();
	for(var i=0;i<mylike.length;i++){
		if(mylike[i].ssid != obj.ssid){
			mylike2.push(mylike[i]);
		}
	}
	supperyStorage.set('mylike',mylike2);
}

function isFavorites(obj){
	var supperyStorage = new SupperyStorage();
	var mylike = supperyStorage.get('mylike');
	for(var i=0;i<mylike.length;i++){
		if(mylike[i].ssid == obj.ssid){
			return true;
		}
	}
	return false;
}
