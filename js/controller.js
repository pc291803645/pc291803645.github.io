var webController = angular.module('webController', []);

webController.controller("head",["$scope",function($scope){   //head' nav menu
	/*导航栏menu*/
	var menu = $(".menu_nav");
	menu.each(function(i,ele){
		$(ele).on("mouseenter",function(){
			if($(this).get(0).nextElementSibling){
				var ele = $(this).get(0).nextElementSibling;
				var that = $(this);
				var timer = null;
				that.addClass("menu_active");
				$(ele).stop().slideDown();
				that.on("mouseleave",function(){
					timer = setTimeout(function(){
						that.removeClass("menu_active");
						$(ele).stop().slideUp();
					},100)
				})
				$(ele).on("mouseleave",function(){
					timer = setTimeout(function(){
						that.removeClass("menu_active");
						$(ele).stop().slideUp();
					},100)
				})
				that.on("mouseenter",function(){
					clearTimeout(timer);
				})
				$(ele).on("mouseenter",function(){
					clearTimeout(timer);
				})
			}
		})
	})
}])

webController.controller("home",["$scope",'web',function($scope,web){ 	/*首页*/
	$scope.headerIndex =1;
	/** 轮播图 部分**/
	var moveBox = document.getElementsByClassName("moveBox")[0];
	var navBox = document.getElementsByClassName("lun_link")[0];
	var iW = document.body.clientWidth;
	moveBox.style.width = iW*2 + "px";
	var imgArr = ["img/mc.jpg","img/mc2.jpg","img/mc.jpg"];
	for(var i =0;i<imgArr.length;i++){
		var a = document.createElement("a");
		if(i==0){
			a.className = "nav_active";
		}
		navBox.appendChild(a);
	}
	var imgs = moveBox.getElementsByTagName("img");
	var navs = navBox.getElementsByTagName("a");
	web.carousel($(moveBox),null,null,$(imgs[0]),$(imgs[1]),$(navs),imgArr,1200,2500,"nav_active");  /*轮播图函数*/
	
	
	/** intor_list 部分 **/
	var moveObj = $(".intor_list a");
	moveObj.each(function(i,ele){
		$(ele).on("mouseenter",function(){
			moveObj.removeClass("animated shake");
			$(this).addClass("animated shake");
		})
	})
	
}])

webController.controller("easy",["$scope",function($scope){ 	/*简单易用*/
	$scope.headerIndex =2;
	var bannerLine = $(".banner_line");
	var bannerLineMove = $(".banner_line i");
	var bannerShadeA = $(".banner_shade1");
	var bannerShadeB = $(".banner_shade2");
	setTimeout(function(){
		bannerLineMove.animate({
			height:1100,
		},function(){
			bannerLine.hide();
			bannerShadeA.animate({ left:-2000 },800);
			bannerShadeB.animate({ right:-2000 },800);
		})
	},500)
	
}])

webController.controller("propa",["$scope",function($scope){ 	/*推广传播*/
	$scope.headerIndex =2;
	
}])
webController.controller("intor",["$scope",function($scope){ 	/*功能介绍*/
	$scope.headerIndex =2;
	
}])
webController.controller("data",["$scope",function($scope){ 	/*数据报告*/
	$scope.headerIndex =2;
	
}])
webController.controller("service",["$scope","web",function($scope,web){ 	/*服务介绍*/
	$scope.headerIndex =3;
	var moveBox = document.getElementsByClassName("moveBox")[0];
	var navBox = document.getElementsByClassName("lun_link")[0];
	var iW = document.body.clientWidth;
	moveBox.style.width = iW*2 + "px";
	var imgArr = ["img/mc.jpg","img/mc2.jpg","img/mc.jpg"];
	
	for(var i =0;i<imgArr.length;i++){
		var a = document.createElement("a");
		if(i==0){
			a.className = "nav_active";
		}
		navBox.appendChild(a);
	}
	var imgs = moveBox.getElementsByTagName("img");
	var navs = navBox.getElementsByTagName("a");
	web.carousel($(moveBox),null,null,$(imgs[0]),$(imgs[1]),$(navs),imgArr,1200,2500,"nav_active");  /*轮播图函数*/
	/********************************************/
	var moveBox = $(".dyn_cir");
	var h = $(".dyn").offset().top;
	var onoff = true;
	window.onscroll = function(){
		if($(this).scrollTop()>=h-400){ //判断距离
			if(onoff){
				moveBox.each(function(i,ele){
					(function(index){
						if(index==0){
							moveBox.eq(0).stop().animate({top:0,left:317,opacity:1},400)
						}
						if(index==1){
							moveBox.eq(1).stop().animate({top:168,left:633,opacity:1},400)
						}
						if(index==2){
							moveBox.eq(2).stop().animate({top:340,left:317,opacity:1},400)
						}
						if(index==3){
							moveBox.eq(3).stop().animate({top:133,left:0,opacity:1},400)
						}
					})(i)
				})
				onoff =false;
			}
			
		}else{
			onoff =true;
			moveBox.css({opacity:0,top:160,left:317});
		}
	}
	
	
	
	
	
	
	
}])
webController.controller("about",["$scope","web",function($scope,web){ 	/*关于我们*/
	$scope.headerIndex =4;
	var uls = $(".slide_box");
	var imgArr = ["img/banner.png","img/banner2.png"];
	web.slide(uls,imgArr,null,2000,3000,"move");
	
}])