function getBrandTop(node){
	$.ajax({
		type: "GET",
		url: "data/brand.json",
		success: function(res){
			for(var i = 0; i < res.length; i++){
				var oLi = document.createElement("li");
				var oA = document.createElement("a")
				oA.href = "#";
				var oImg = document.createElement("img");
				oImg.src = res[i].img;
				var oPbg = document.createElement("p");
				oPbg.className = "p_bg";
				var oPtime = document.createElement("p");
				oPtime.className = "p_time"
				oPtime.innerHTML = "3天23时34分42秒";
				var oEm = document.createElement("em");
				oPtime.appendChild(oEm);
				var oSpan = document.createElement("span");
				var oBtn = document.createElement("button");
				oSpan.innerHTML = res[i].discount + "折起";
				oBtn.innerHTML = "进入活动";
				
				oA.appendChild(oImg);
				oA.appendChild(oPbg);
				oA.appendChild(oPtime);
				oA.appendChild(oSpan);
				oA.appendChild(oBtn);
				oLi.appendChild(oA);
				
				node.appendChild(oLi);
			}
		}
	});
}