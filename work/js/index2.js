function getBannerLeft(node){
	$.ajax({
		type: "GET",
		url: "data/banner_left.json",
		success: function(res){
			for(var i = 0; i < res.length; i++){
				var oLi = document.createElement("li");
				oLi.id = res[i].id;
				
				var oA = document.createElement("a");
				oA.href = "menu.html";
				var oSpan = document.createElement("span");
				var oI = document.createElement("i");
				oI.innerHTML = res[i].title;
				oA.appendChild(oSpan);
				oA.appendChild(oI);
				
				if(i % 2 == 0){
					var oEm = document.createElement("em");
					oA.appendChild(oEm);
				}
				
				oLi.appendChild(oA);
				node.appendChild(oLi);
			}
		}
	});
}