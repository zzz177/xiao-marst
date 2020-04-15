//处理首页导航部分   声明模块遵从AMD
define(["jquery"],function($){
	function download(){
		//数据下载
		$.ajax({
			type:"get",
			url:"../data/nav.json",
			success: function(result){
//				alert(result);
                var bannerArr = result.banner;
                
                //通过循环讲数据添加到页面上
                for(var i=0;i<bannerArr.length;i++){
                	$(`
                	   <a href="${bannerArr[i].url}">
                            <img class="swiper-lazy swiper-lazy-loaded" src="../images/banner/${bannerArr[i].img}"/>
                       </a>
                	`).appendTo("#J_homeSwiper .swiper-slide");
                	
                	var node = $(`
                	   	<a href="#" class = 'swiper-pagination-bullet'></a>
                	`);
                	if(i == 0){
                		node.addClass("swiper-pagination-bullet-active");
                	}
                	node.appendTo("#J_homeSwiper .swiper-pagination");
                }
			},
			error: function(msg){
				console.log(msg);
			}
		})
		leftNav();
		topNav();
	}
	
	//实现轮播图得轮播效果
	function banner(){
		var iNow = 0;//当前显示得图片得下标
		var aImgs = null;//记录图片
		var aBtns = null;//记录小圆圈
		
		var timer = setInterval(function(){
			iNow++;
			tab();
		},2500);
		
		//封装切换函数
		function tab(){
			if(!aImgs){
				aImgs = $("#J_homeSwiper .swiper-slide").find("a");
			}
			if(!aBtns){
				aBtns = $("#J_homeSwiper .swiper-pagination").find("a");
			}
			if(iNow == 5){
				iNow = 0;
			}
			//图片切换
			aImgs.hide().css("opacity",0.2).eq(iNow).show().animate({opacity:1},500);
			//小圆点切换
			aBtns.removeClass("swiper-pagination-bullet-active").eq("iNow").addClass("swiper-pagination-bullet-active");
		}
		
		//添加鼠标得移入和移出
		
		$("#J_homeSwiper,.swiper-button-next,.swiper-button-prev").mouseenter(function(){
			clearInterval(timer);
		}).mouseleave(function(){
			timer = setInterval(function(){
			iNow++;
			tab();
		},2500);
		})
		
		//点击小圆圈，可以完成，切换对于的图片 [注]事件委托
		$("#J_homeSwiper .swiper-pagination").on("click","a",function(){
			iNow = $(this).index();
			tab();
			return false;//阻止默认行为
		})
		$(".swiper-button-next,.swiper-button-prev").click(function(){
			if(this.className == "swiper-button-prev"){
				iNow--;
				if(iNow == -1){
					iNow = 4;
				}
			}else{
				iNow++;
			}
			tab();
		})
	}
	
	//侧边导航栏数据的加载
	function leftNav(){
		$.ajax({
			url:"../data/nav.json",
			success: function(result){
				var sideArr = result.sideNav;
				for(var i=0;i<sideArr.length;i++){
					var node = $(`
					 <li class = 'category-item'>
                        <a href="/index.html" class = 'title'>
                            ${sideArr[i].title}
                            <em class = 'iconfont-arrow-right-big'></em>
                        </a>
                        <div class="children clearfix">
                        </div>
                    </li>`);
                        node.appendTo("#J_categoryList");
                        
                        //取出当前这个选项对应的子节点
                        var chlidArr = sideArr[i].child;
                        //一共多少页
                        var col = Math.ceil(chlidArr.length / 6);
                        //计算一个多少列，设置对应的class样式
                        node.find("div.children").addClass("children-col-" + col);
                        //通过循环，创建右侧上面的每一个数据
                        for(var j=0;j<chlidArr.length;j++){
                        	if(j % 6 ==0){
                        		var newUl = $(`
                        			<ul class="children-list children-list-col children-list-col-${parseInt(j/6)}">
                        			</ul>`);
                        			
                        			newUl.appendTo(node.find("div.children"));
                        	}
                        	$(`<li>
                                    <a href="http://www.mi.com/redminote8pro" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2" class="link clearfix" data-stat-id="d678e8386e9cb0fb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                                     <img src="${chlidArr[j].img}" width="40" height="40" alt="" class="thumb">
                                    <span class="text">${chlidArr[j].title}</span>
                                    </a>
                              </li>`).appendTo(newUl);
                        }
				}
			},
			error: function(msg){
				console.log(msg);
			}
		})
	}
	
	//给侧边导航添加移入切换的效果  选项卡的切换效果
	function leftNavTab(){
		//通过事件委托
		$("#J_categoryList").on("mouseenter",".category-item",function(){
			$(this).addClass("category-item-active");
		})
		$("#J_categoryList").on("mouseleave",".category-item",function(){
			$(this).removeClass("category-item-active");
		})
	}
	
	//下载顶部导航数据
	function topNav(){
		$.ajax({
			url:"../data/nav.json",
			success: function(result){
				//将数据取出来
				var topNavArr = result.topNav;
				topNavArr.push({title:"服务"},{title:"社区"});
				for(var i=0;i<topNavArr.length;i++){
					$(`
					    <li data-index="${i}" class="nav-item">
					       <a href="javascript: void(0);" class="link">
					          <span class="text">${topNavArr[i].title}</span>
					       </a>
					    </li>`).appendTo(".site-header .header-nav .nav-list");
					
					var node = $(`
						<ul class="children-list clearfix" style="display:${i==0 ? "block" :"none"}"></ul>
					  	`);
					  	node.appendTo("#J_navMenu .container");
					  	
					  	//取出所有子菜单
					  	if(topNavArr[i].childs){
					  		var childArr = topNavArr[i].childs;
					  	for(var j=0;j<childArr.length;j++){
					  		$(`
					  		  <li>
					  		    <a href="#">
					  		      <div class="figure figure-thumb">
					  		        <img src="${childArr[j].img}" />
					  		      </div>
					  		      <div class="title">${childArr[j].a}</div>
					  		      <p class="price">${childArr[j].i}</p>
					  		    </a>
					  		  </li>`).appendTo(node);
					  	}
					 }
				}
			},
			error: function(msg){
				console.log(msg);
			}
		});
	}
	
	//顶部导航添加移入移出效果
	function topNavTab(){
		$(".header-nav .nav-list").on("mouseenter",".nav-item",function(){
			$(this).addClass("nav-item-active");
			//找出当前移入这个a标签的下标    这个下表和下面部分，显示的ul的下标一致
			var index = $(this).index() - 1;
//			alert(index);
            if(index >= 0 && index <=6){
                $("#J_navMenu").css({display : "block"}).removeClass("slide-up").addClass("slide-down");
                $("#J_navMenu .container").find("ul").eq(index).css("display","block").siblings("ul").css("display","none");
            }
		})
		
		$(".header-nav .nav-list").on("mouseleave",".nav-item",function(){
			$(this).removeClass("nav-item-active");
		})
		
		$(".header-nav").mouseleave(function(){
			$("#J_navMenu").css({display:"block"}).removeClass("slide-down").addClass("slide-up");
		})
	}
	
	//给商品列表页的侧边导航添加移入移出效果
	function allGoodsTab(){
		$(".header-nav .nav-list").on("mouseenter",".nav-category",function(){
			$(this).addClass("nav-category-active");
			$(this).find(".site-category").css("display","block");
		})
		
		$(".header-nav .nav-list").on("mouseleave",".nav-category",function(){
			$(this).removeClass("nav-category-active");
			$(this).find(".site-category").css("display","none");
		})
	}
	
	//搜索框
	function searchTab(){
		$("#search").focus(function(){
			$("#J_keywordList").removeClass("hide").addClass("show");
		}).blur(function(){
			$("#J_keywordList").removeClass("show").addClass("hide");
		})
	}
	
	return {
		download: download,
		banner:banner,
		laftNavTab:leftNavTab,
		topNavTab:topNavTab,
		searchTab:searchTab,
		leftNav:leftNav,
		topNav:topNav,
		allGoodsTab:allGoodsTab
	}
})