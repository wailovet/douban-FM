var SupperyStorage = function(){
}
SupperyStorage.prototype = {
	set:function(key,data){
		var str = JSON.stringify(data); 
		localStorage[key] = str;
	},
	get:function(key){
		var obj;
		try{
			obj =  JSON.parse(localStorage[key]); 
		}catch(e){
			obj = new Array();
		}
		return obj;
	}
}
