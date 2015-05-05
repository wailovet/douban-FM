	var json;
	var audio;
	var gui;
	
	localStorage.now_channel = -1;
	var supperyStorage = new SupperyStorage();
	var mylike = supperyStorage.get('mylike');
	
	$(document).ready(function(){
            gui = require('nw.gui');
			audio = document.getElementById('audio');
			nextMusic();
	});

	function pauseMusic(){
		audio.pause();
		$('.music-npause').show();
	}
	$('.music-npause').click(function(){
		$('.music-npause').hide();
		audio.play();
	});	
	
	var _mark_c=false;
	$('#mark').click(function(){
		if(_mark_c == false){
			_mark_c = true;
			$(this).animate({color:'#FFA6A6'});
			addFavorites(json.song[0]);
		}else{
			_mark_c = false;
			$(this).animate({color:'#000000'});
			delFavorites(json.song[0]);
		}
	});
	
	
	$('#next').click(function(){
		$('#mark').css({color:'#000000'}); 
		_mark_c=false;
		nextMusic(localStorage.now_channel);
	});
	
	
	function nextMusic(channel){
		if(!channel||channel==''){
			channel = parseInt(Math.random()*100);
		}
		var __this = this;
		this.next = function(json){
			if(json.song.length==0){
				nextMusic();
				return;
			}
			
			if(isFavorites(json.song[0])){
				_mark_c = true;
				$('#mark').animate({color:'#FFA6A6'});
			}else{
				_mark_c = false;
				$('#mark').animate({color:'#000000'});
			}
			$("#music-img").css({background:"url('"+json.song[0].picture+"')"});
			$("#music-artist").text(json.song[0].artist);
			$("#music-albumtitle").html('\< '+json.song[0].albumtitle+' \>'+'<p id="music-public_time" class="music-public_time"></p>');
			$("#music-public_time").text(' '+json.song[0].public_time);
			$("#music-title").text(json.song[0].title);
			
			audio.src = json.song[0].url; 
			audio.play();
			audio.ontimeupdate = function(){
				var i = audio.currentTime/audio.duration;
				var w = $('#progressbar-bg').width()*i ;
				$('#progressbar').css({width:w});
				var remain = parseInt(audio.duration - audio.currentTime);
				var min = parseInt(remain/60);
				var sec = parseInt(remain%60);
				if(min<10)min = '0'+min;
				if(sec<10)sec = '0'+sec;
				var timeStr = '-'+min+':'+sec
				$('#music-time').text(timeStr);
			}
		}
		
		
		if(channel == 0){
			var mylike = supperyStorage.get('mylike');
			json.song[0] = mylike[parseInt(Math.random()*mylike.length)];
			this.next(json);
			return ;
		}
		$.get("http://douban.fm/j/mine/playlist?channel="+channel+"&from=mainsite&type=n",function(data,status){
	    	json = data;
			__this.next(json);
		});
	}
	
	var _x,_y,_c=false;
	document.onmousedown = function(e){
		_x = e.screenX-gui.Window.get().x;
		_y = e.screenY-gui.Window.get().y;
		_c = true;
	}
	document.onmousemove = function(e){
		if(e.clientX>512||e.clientY>246||e.clientY<10){
			autoHide();
		}else{	
			autoShow();
		}
		if(_c==true){
			gui.Window.get().moveTo(e.screenX-_x, e.screenY-_y);
		}
	}
	
	
	document.onmouseup = function(e){
		_c  = false;
		auto_hide = false;
		if(e.screenX-_x<0){
			gui.Window.get().moveTo(0,e.screenY-_y);
			auto_hide = true;
			autoHide();
		}
	}
	
	
	var auto_hide=false;
	var auto_hide_type = 0;
	function autoHide(){
		if(auto_hide==false)return;
		if(auto_hide_type!=0)return;
		if( gui.Window.get().x >-510){
			gui.Window.get().x=gui.Window.get().x-10;
			setTimeout("autoHide()",10);
		}else{
			auto_hide_type = 1;
		}
	}
	function autoShow(){
		if(auto_hide==false)return;
		if(auto_hide_type!=1)return;
		if( gui.Window.get().x <-40){
			gui.Window.get().x=gui.Window.get().x+20;
			setTimeout("autoShow()",50);
		}else{
			auto_hide_type = 0;
		}
	}	
	