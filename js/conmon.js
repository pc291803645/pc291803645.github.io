$(function(){
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
	
})