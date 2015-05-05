function channelsList(callback){
	var ss = new SupperyStorage();
	var oj = ss.get('channels');
	if(!oj||oj==''){
		$.get("http://www.douban.com/j/app/radio/channels",function(data,status){
			callback(data.channels);
			ss.set('channels',data);
		});
		return;
	}
	
	callback(oj.channels);
	$.get("http://www.douban.com/j/app/radio/channels",function(data,status){
		ss.set('channels',data);
	});
	return;
}


function initChannelsList(){
	channelsList(function(e){
		var html='';
		for(var i=0;i<e.length;i++){
			//alert(e[i].name+e[i].channel_id);
			if(e[i].channel_id == localStorage.now_channel){
				html +='<li class="channel-selected"><a class="chl-name"><span class="cname">'+e[i].name+'</span></a> <span class="st-playing"></span> </li>';
			}else{
				html+= '<li id="channel" class="channel"><a class="chl-name" onclick="changChannel(\''+e[i].channel_id+'\')"><span class="cname">'+e[i].name+'</span></a></li>' 
			}
		}
		document.getElementById('system-chls').innerHTML=html;
	});
}

function changChannel(id){
	localStorage.now_channel = id;
	nextMusic(id);
	initChannelsList();
}


VaScroll(document.getElementById('channels-main'),100,2);
var __onmousedown = document.onmousedown;
document.onmousedown = function(e){  
	__onmousedown(e);
    var e = e || window.event  
    if(e.button == "2"){  
        $('#channels-main').slideToggle();
    }  
}  

initChannelsList();


