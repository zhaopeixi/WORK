function getGoods(nodes){
	$.ajax({
		type:"get",
		url:"data/goods.json",
		success: function(res){
			for(var j = 0; j < res.length; j++){
				var oA = document.createElement("a");
				oA.className = "goods_box";
				oA.href = "#";
				var oB = document.createElement("b");
				var oImg = document.createElement("img");
				oImg.src = res[j].img;
				var oPdesc = document.createElement("p");
				oPdesc.className = "desc";
				var oA1 = document.createElement("a");
				oA1.href = "#";
				oA1.innerHTML = res[j].desc;
				var oSpannew = document.createElement("span");
				oSpannew.className = "goods_new";
				oSpannew.innerHTML = "上新";
				oPdesc.appendChild(oA1);
				oPdesc.appendChild(oSpannew);
				
				var oH3 = document.createElement("h3");
				var oPprice = document.createElement("p");
				oPprice.className = "price";
				var oSpanpri1 = document.createElement("span");
				oSpanpri1.className = "price_icon";
				oSpanpri1.innerHTML = "￥";
				var oSpanpri2 = document.createElement("span");
				oSpanpri2.className = "pricebefore";
				oSpanpri2.innerHTML = "￥" + res[j].priceBefore;
				var oSpan = document.createElement("span");
				oSpan.innerHTML = res[j].priceNow;
				oPprice.appendChild(oSpanpri1);
				oPprice.appendChild(oSpan);
				oPprice.appendChild(oSpanpri2);
				
				var oA2 = document.createElement("a");
				var oEm = document.createElement("em");
				oA2.innerHTML = "品牌";
				oA2.appendChild(oEm);
				var oBtn = document.createElement("button");
				oBtn.innerHTML = "逛品牌";
				
				oH3.appendChild(oPprice);
				oH3.appendChild(oA2);
				oH3.appendChild(oBtn);
				
				oA.appendChild(oB);
				oA.appendChild(oImg);
				oA.appendChild(oPdesc);
				oA.appendChild(oH3);
				
				nodes[j % 4].appendChild(oA);
			}
		}
	});
}