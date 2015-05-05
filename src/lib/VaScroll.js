

var __count = 0;
function VaScroll(Element,height,v){
	Element.onmousewheel = function(event) {
	if(__count!=0)return;
    event = event || window.event;
	var _this = this;
	
	window._______wheelDeltaDown = scroll;
	function scroll(val,bs){	
		_this.scrollTop += bs;
		__count++;
		if(__count<val){
			setTimeout("window._______wheelDeltaDown("+val+","+bs+")",5);
		}else{
			__count=0;
		}
		return;
	}
	if(event.wheelDelta<-100){
		scroll(height,v);
	}
	if(event.wheelDelta>100){
		scroll(height,-1*v);
		
	}
};
	
}