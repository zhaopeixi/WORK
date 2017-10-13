function startMove(obj, json, func){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){

		var bStop = true;	//指示是否多个样式都到达目的

		for(var attr in json){
			
			var iCur = null;

			if(attr == "opacity"){
				iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
			}else{
				iCur = parseInt(getStyle(obj, attr));
			}

			var speed = (json[attr] - iCur) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			iCur += speed;
			if(attr == "opacity"){
				obj.style.opacity = iCur / 100;
				obj.style.filter = "alpha(opacity=" + iCur + ");";
			}else{
				obj.style[attr] = iCur + "px";
			}

			if(iCur != json[attr]){		//不到达目的就为假
				bStop = false;
			}
		}

		if(bStop){		//当全部为真，关闭定时器
			clearInterval(obj.timer);
			if(func){
				func();
			}
		}
	}, 30);
}

function getStyle(element, attr){
	return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element)[attr];
}