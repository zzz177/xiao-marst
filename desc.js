console.log("加载成功");

//配置当前项目引入模块
require.config({
	paths: {
		"jquery":"jquery-1.11.3",
		"jquery-cookie":"jquery.cookie",
		"nav":"nav",
		"goodsDesc":"goodsDesc"
	},
	shim: {
		//依赖关系
		"jquery-cookie":["jquery"]
	}
})

require(["nav","goodsDesc"],function(nav,goodsDesc){
	nav.topNav();
	nav.leftNav();
	nav.topNavTab();
	nav.laftNavTab();
	nav.allGoodsTab();
	nav.searchTab();
	
	//详情页
	goodsDesc.download();
	goodsDesc.banner();
})
