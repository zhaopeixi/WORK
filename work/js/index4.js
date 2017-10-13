function getBrandBottom(node){
	$.ajax({
		type:"get",
		url:"data/brand_more.json",
		success: function(res){
			var oLione = document.createElement("li");
			oLione.innerHTML = "更多品牌特卖";
			node.appendChild(oLione);
			
			for(var i = 0; i < res.length; i++){
				var oLi = document.createElement("li");
				var oA = document.createElement("a");
				oA.href = "#";
				var oImg = document.createElement("img");
				oImg.src = res[i].img;
				
				oA.appendChild(oImg);
				oLi.appendChild(oA);
				node.appendChild(oLi);
			}
			
			var oLilast = document.createElement("li")
			var oAlast = document.createElement("a");
			oAlast.innerHTML = "查看全部》";
			oLilast.appendChild(oAlast);
			node.appendChild(oLilast);
		}
	});
}