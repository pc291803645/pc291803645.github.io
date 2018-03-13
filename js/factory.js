var webFactory = angular.module("webFactory", []);

webFactory.factory("web", function() {
	var A = {};
	A.carousel = function(moveObj, upBtn, downBtn, imgA, imgB, nav, imgArr, moveTime, inTime, styles) {
		var num = 0; 	//要运动的元素，上一张按钮，下一张按钮，图片1，图片2，导航点，图片数组，运动时间，间隔切换时间，导航点的样式；
		var timer = null;
		var iW = imgA.width();
		
		window.onresize = function(){
			iW = document.body.clientWidth;
			moveObj.get(0).style.width = 2*iW +"px";
		}
		
		if(downBtn) {
			downBtn.on("click", function() {
				num++;
				nav.removeClass(styles);
				console.log(imgArr[num - 1])
				imgA.attr("src", imgArr[num - 1]);
				imgB.attr("src", imgArr[num]);
				if(num > imgArr.length - 1) {
					imgA.attr("src", imgArr[imgArr.length - 1]);
					imgB.attr("src", imgArr[0]);
					num = 0;
				}
				moveObj.css({
					left: 0
				});
				moveObj.stop().animate({
					left: -iW
				}, moveTime);
				nav.eq(num).addClass(styles);
			})
		}
		if(upBtn) {
			upBtn.on("click", function() {
				nav.removeClass(styles);
				imgA.attr("src", imgArr[num - 1]);
				imgB.attr("src", imgArr[num]);
				num--;
				if(num < 0) {
					imgA.attr("src", imgArr[imgArr.length - 1]);
					imgB.attr("src", imgArr[0]);
					num = imgArr.length - 1;
				}
				moveObj.css({
					left: -iW
				});
				moveObj.stop().animate({
					left: 0
				}, moveTime);
				nav.eq(num).addClass(styles);
			})
		}
		if(inTime) {
			timer = setInterval(function() {
				num++;
				nav.removeClass(styles);
				imgA.attr("src", imgArr[num - 1]);
				imgB.attr("src", imgArr[num]);
				if(num > imgArr.length - 1) {
					imgA.attr("src", imgArr[imgArr.length - 1]);
					imgB.attr("src", imgArr[0]);
					num = 0;
				}
				moveObj.css({
					left: 0
				});
				moveObj.stop().animate({
					left: -iW
				}, moveTime);
				nav.eq(num).addClass(styles);
			}, inTime)
			moveObj.parent().on("mouseenter", function() {
				clearInterval(timer);
			})
			moveObj.parent().on("mouseleave", function() {
				timer = setInterval(function() {
					num++;
					nav.removeClass(styles);
					imgA.attr("src", imgArr[num - 1]);
					imgB.attr("src", imgArr[num]);
					if(num > imgArr.length - 1) {
						imgA.attr("src", imgArr[imgArr.length - 1]);
						imgB.attr("src", imgArr[0]);
						num = 0;
					}
					moveObj.css({
						left: 0
					});
					moveObj.stop().animate({
						left: -iW
					}, moveTime);
					nav.eq(num).addClass(styles);
				}, inTime)
			})
		}
		if(nav) {
			nav.on("click", function() {
				nav.removeClass(styles);
				if($(this).index() > num) {
					imgA.attr("src", imgArr[num]);
					imgB.attr("src", imgArr[$(this).index()]);
					moveObj.css({
						left: 0
					});
					moveObj.stop().animate({
						left: -iW
					}, moveTime);
				}
				if($(this).index() < num) {
					imgA.attr("src", imgArr[$(this).index()]);
					imgB.attr("src", imgArr[num]);
					moveObj.css({
						left: -iW
					});
					moveObj.stop().animate({
						left: 0
					}, moveTime);
				}
				num = $(this).index();
				nav.eq(num).addClass(styles);
			})
		}
	}
	A.slide = function(obj, imgArr, httpArr, moveTime, tabTime,active) { //ul,图片数组，网址数组，运动时间，切换时间;
		if(httpArr && imgArr.length == httpArr.length) {
			for(var i = 0; i < imgArr.length; i++) {
				var li = $('<li><a href=' + httpArr[i] + '><img src=' + imgArr[i] + ' /></a></li>');
				obj.append(li);
			}

		} else {
			for(var i = 0; i < imgArr.length; i++) {
				var li = $('<li><a href="javascript:;"><img src=' + imgArr[i] + ' /></a></li>');
				obj.append(li);
			}
		}
		var lis = obj.find("li");
		var num = 0;
		var z = 0;
		lis.css("opacity", 0);
		lis.eq(0).css("opacity", 1);
		setInterval(function() {
			num++;
			z++;
			if(num >= lis.length) {
				num = 0;
			}
			lis.eq(num - 1).animate({
				opacity: 0
			}, {
				duration: moveTime,
				step: function() {
					if(active) {
						lis.eq(num - 1).addClass(active)
					}
				}
			})
			lis.eq(num).animate({
				opacity: 1
			}, {
				duration: moveTime,
				step: function() {
					if(active) {
						lis.eq(num).removeClass(active)
					}
				}
			})
			lis.eq(num).css("z-index", z);
		}, tabTime)
	}
	return A;
})