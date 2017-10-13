function getBannerRight(node){
	$.ajax({
		type: "GET",
		url: "data/banner_right.json",
		success: function(res){
			for(var i = 0; i < res.length; i++){
				var oDiv = document.createElement("div");
				oDiv.className = res[i].className;
							
				var oA = document.createElement("a");
				oA.href = "#";
							
				var oImg = document.createElement("img");
				oImg.src = res[i].img;
							
				oA.appendChild(oImg);
				oDiv.appendChild(oA);
				node.appendChild(oDiv);
			}
		}
	});
}