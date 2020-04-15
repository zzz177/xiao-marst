console.log("加载成功");


//引入当前页面需要用的模块
require.config({
	paths: {
		"jquery":"jquery-1.11.3",
		
		//用到首页导航部分的js模块
		"nav":"nav",
		"goodsList":"goodsList"
	}
})

require(["nav","goodsList"],function(nav,goodsList){
	nav.topNav();
	nav.leftNav();
	nav.laftNavTab();
	nav.topNavTab();
	nav.searchTab();
	nav.allGoodsTab();
	
	//商品加载数据
	goodsList.download();
	goodsList.banner();
})
