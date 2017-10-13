function MQuery(vArg){
	this.elements = [];		//声明一个数组，存储选中的元素节点
	switch(typeof vArg){
		case "function":
			// window.onload = vArg;	//如果添加多个会被覆盖，需要事件监听
			addEvent(window, "load", vArg);
			break;
		case "string":
			//判断首字母
			switch(vArg[0]){
				case "#": 	//id
					var node = document.getElementById(vArg.substring(1));
					this.elements.push(node);
					break;
				case ".": 	//class
					var nodes = elementsByClassName(document, vArg.substring(1));
					this.elements = nodes;
					break;
				case "[": 	//属性 [title=hello] [name=world]
					var start = vArg.indexOf("=");
					var key = vArg.substring(1, start);
					var value = vArg.substring(start + 1, vArg.length - 1);
					var nodes = elementsByKey(document, key, value);
					this.elements = nodes;
					break;
				default: 	//tagName
					var nodes = document.getElementsByTagName(vArg);
					this.elements = nodes;
					break;
			}
			break;
		case "object":
			this.elements.push(vArg);
			break;
		default:
			// alert("error");
			break;
	}
}

//给MQuery对象添加点击事件的方法
MQuery.prototype.click = function(func){
	//通过遍历给获取到的元素节点添加事件
	for(var i = 0; i < this.elements.length; i++){
		addEvent(this.elements[i], "click", func);
	}
	return this;
}


//给MQuery添加css方法
MQuery.prototype.css = function(){
	switch(arguments.length){
		case 1:
			if(typeof arguments[0] == "object"){
				//是json对象 要赋值
				for(var i = 0; i < this.elements.length; i++){
					//通过循环将json对象中所有的属性进行赋值
					for(var attr in arguments[0]){
						if(typeof arguments[0][attr] == "number"){
							arguments[0][attr] += "px";
						}
						this.elements[i].style[attr] = arguments[0][attr];
					}
				}
			}else{
				return getStyle(this.elements[0], arguments[0]);
			}
			break;
		case 2: 	//赋值
			for(var i = 0; i < this.elements.length; i++){
				if(typeof arguments[1] == "number"){
					arguments[1] += "px";
				}
				this.elements[i].style[arguments[0]] = arguments[1];
			}
			break;
		default:
			alert("error");
			break;
	}
	return this;
}


//给MQuery添加addClass方法
MQuery.prototype.addClass = function(str){
	var newArr = str.split(" ");
	for(var i = 0; i < this.elements.length; i++){
		var oldArr = [];
		if(this.elements[i].className){
			oldArr = this.elements[i].className.split(" ");
		}
		//<2>新老数组进行合并
		var arr = oldArr.concat(newArr);
		//<3>去重
		arr = [...new Set(arr)];
		//<4>拼接字符串 赋值回去
		this.elements[i].className = arr.join(" ");
	}
	return this;
}


//给MQuery添加removeClass方法
MQuery.prototype.removeClass = function(str){
	var removeArr = str.split(" ");
	for(var k = 0; k < this.elements.length; k++){
		var arr = this.elements[k].className.split(" ");
		for(var i = 0; i < removeArr.length; i++){
			for(var j = arr.length - 1; j >= 0; j--){
				if(removeArr[i] == arr[j]){
					arr.splice(j, 1);
				}
			}
		}
		this.elements[k].className = arr.join(" ");
	}
	return this;
}


//给MQuery添加on方法
MQuery.prototype.on = function(){
	switch(arguments.length){
		case 1: 	//json对象
			for(var i = 0; i < this.elements.length; i++){
				for(var type in arguments[0]){
					addEvent(this.elements[i], type, arguments[0][type])
				}
			}
			break;
		case 2: 	//绑定事件  第一个参数有可能是多个事件
			var types = arguments[0].split(" ");
			for(var i = 0; i < this.elements.length; i++){
				for(var j = 0; j < types.length; j++){
					addEvent(this.elements[i], types[j], arguments[1]);
				}
			}
			break;
		case 3: 	//事件委托
			var _arguments = arguments;
			for(var i = 0; i < this.elements.length; i++){
				addEvent(this.elements[i], arguments[0], function(ev){
					var target = ev.target || window.event.srcElement;
					if(target.nodeName.toLowerCase() == _arguments[1]){
						_arguments[2].call(target);
					}
				})
			}
			break;
		default: 
			alert("error");
			break;
	}
	return this;
}


//给MQuery添加off方法
/*MQuery.prototype.off = function(){
	
}*/


//给MQuery添加attr方法
MQuery.prototype.attr = function(){
	switch(arguments.length){
		case 1:
			if(typeof arguments[0] == "object"){
				//是json对象进行赋值
				for(var i = 0; i < this.elements.length; i++){
					for(var attr in arguments[0]){
						this.elements[i].setAttribute(attr, arguments[0][attr]);
					}
				}
			}else{
				//取值
				return this.elements[0].getAttribute(arguments[0]);
			}
			break;
		case 2: 	//赋值
			for(var i = 0; i < this.elements.length; i++){
				this.elements[i].setAttribute(arguments[0], arguments[1]);
			}
			break;
		default:
			alert("error");
			break;
	}
	return this;
}


//给MQuery添加hover方法
MQuery.prototype.hover = function(func1, func2){
	for(var i = 0; i < this.elements.length; i++){
		addEvent(this.elements[i], "mouseover", func1);
		addEvent(this.elements[i], "mouseout", func2);
	}
	return this;
}


//给MQuery添加show方法
MQuery.prototype.show = function(){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = "block";
	}
	return this;
}


//给MQuery添加hide方法
MQuery.prototype.hide = function(){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = "none";
	}
	return this;
}


//给MQuery添加toggle方法
MQuery.prototype.toggle = function(){
	var _arguments = arguments;
	for(var i = 0; i < this.elements.length; i++){
		addClick(this.elements[i]);
	}

	function addClick(node){
		var count = 0;
		node.onclick = function(){
			_arguments[count++ % _arguments.length].call(node);
		}
	}
	return this;
}


//给MQuery添加eq方法
MQuery.prototype.eq = function(index){
	//return this.elements[index];	//直接返回的是JS对象，需要转为JQ对象
	return $(this.elements[index]);
}


//给MQuery添加find方法
MQuery.prototype.find = function(str){
	var result = [];	//用于存储所有符合条件的元素
	if(str[0] == "."){
		for(var i = 0; i < this.elements.length; i++){
			var nodes = elementsByClassName(this.elements[i], str.substring(1));
			result = result.concat(nodes);
		}
	}else{
		for(var i = 0; i < this.elements.length; i++){
			var nodes = this.elements[i].getElementsByTagName(str);
			nodes = Array.from(nodes)
			result = result.concat(nodes);
		}
	}
	var obj = new MQuery({});
	obj.elements = result;	//obj就是装有所有符合条件的元素节点的MQuery对象
	return obj;
}


//给MQuery添加index方法
MQuery.prototype.index = function(){
	return getIndex(this.elements[0]);
}


//给MQuery添加size方法
MQuery.prototype.size = function(){
	return this.elements.length;
}


/*
	$.extend();    拓展工具方法
	$.fn.extend(); 拓展JQ对象的方法
*/
MQuery.prototype.extend = function(){
	if(arguments.length == 2){
		MQuery.prototype[arguments[0]] = arguments[1];
	}else if(arguments.length == 1){
		for(var name in arguments[0]){
			MQuery.prototype[name] = arguments[0][name];
		}
	}
}


function $(vArg){
	return new MQuery(vArg);
}


function getIndex(obj){
	var aBrother = obj.parentNode.children;
	for(var i = 0; i < aBrother.length; i++){
		if(aBrother[i] == obj){
			return i;
		}
	}
}


//添加事件，跨浏览器的兼容写法
function addEvent(obj, type, func){
	if(obj.addEventListener){
		obj.addEventListener(type, func, false);
	}else{
		obj.attachEvent("on" + type, func);
	}
}

//移出事件，跨浏览器的兼容写法
function removeEvent(obj, type, func){
	if(obj.removeEventListener){
		obj.removeEventListener(type, func);
	}else{
		obj.detachEvent("on" + type, func);
	}
}

//通过className获取元素节点
function elementsByClassName(parentNode, className){
	//用于存储所有符合条件的元素节点
	var result = [];

	//获取当前元素节点下的所有节点
	var nodes = parentNode.getElementsByTagName("*");
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i].className == className){
			//把符合条件的节点存储进去
			result.push(nodes[i]);
		}
	}
	return result;
}


//通过key获取元素节点
function elementsByKey(parentNode, key, value){
	//用于存储所有符合条件的元素节点
	var result = [];

	//获取当前元素节点下的所有节点
	var nodes = parentNode.getElementsTagName("*");
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i].getAttribute(key) == value){
			result.push(nodes[i]);
		}
	}

	return result;
}


//获取当前有效样式
function getStyle(element, attr){
	return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element)[attr];
}