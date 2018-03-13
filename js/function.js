window.onload = function() {
	/*自定义滚轮*/
	function roll(maxObj, minObj) { //maxObj：滚动的大元素；minObj：自定义的滚动条元素；
		var maxPre = maxObj.offsetParent; //大元素的定位父级；		
		var minPre = minObj.offsetParent; //小元素的定位父级；

		minObj.onmousedown = function(ev) {
			ev = ev || window.event; //event对象兼容 ie、火狐浏览器；
			var y = ev.pageY - minObj.offsetTop;
			document.onmousemove = function(ev2) {
				ev2 = ev2 || window.event; //event对象兼容 ie、火狐浏览器；
				var newY = ev2.pageY - y;
				var s = (minObj.offsetTop) / (minPre.offsetHeight - minObj.offsetHeight);
				var h = maxObj.clientHeight - maxPre.clientHeight;
				if(newY <= 0) {
					newY = 0;
				}
				if(newY >= minPre.offsetHeight - minObj.offsetHeight) {
					newY = minPre.offsetHeight - minObj.offsetHeight;
				}
				minObj.style.top = newY + "px";
				maxObj.style.top = -s * h + "px";
			}
			document.onmouseup = function() {
				document.onmousemove = null;
				document, onmouseup = null;
			}
			return false; //为了消除一些未知的bug；例如：有时候鼠标移动太快，滚动条不受控制，或者鼠标抬起时，还可以滑动滚动条；
		}
		addWheel(maxObj, Up, Down); //至执行滚轮函数；
		function Up() {
			var nTop = minObj.offsetTop;
			var s = (minObj.offsetTop) / (minPre.offsetHeight - minObj.offsetHeight);
			var h = maxObj.clientHeight - maxPre.clientHeight;
			nTop -= 10;
			if(nTop <= 0) {
				nTop = 0;
			}
			minObj.style.top = nTop + "px";
			maxObj.style.top = -s * h + "px";
		}

		function Down() {
			var nTop = minObj.offsetTop;
			var s = (minObj.offsetTop) / (minPre.offsetHeight - minObj.offsetHeight);
			var h = maxObj.clientHeight - maxPre.clientHeight;
			nTop += 10;
			if(nTop >= minPre.offsetHeight - minObj.offsetHeight) {
				nTop = minPre.offsetHeight - minObj.offsetHeight;
			}
			minObj.style.top = nTop + "px";
			maxObj.style.top = -s * h + "px";
		}

		function addWheel(obj, fnUp, fnDown) { //兼容滚轮函数；
			var liu = window.navigator.userAgent.toLowerCase();
			if(liu.indexOf('firefox') == -1) {
				obj.onmousewheel = fn;
			} else { //走ff
				obj.addEventListener('DOMMouseScroll', fn);
			}

			function fn(ev) {
				var ev = ev || window.event;
				var down = true;
				if(ev.wheelDelta) {
					down = ev.wheelDelta > 0 ? true : false;
				} else {
					down = ev.detail < 0 ? true : false;
				}
				if(down) {
					if(typeof fnUp == 'function') {
						fnUp();
					}
				} else {
					if(typeof fnDown == 'function') {
						fnDown();
					}
				}
				ev.preventDefault();
			}
		}
	}

	/* 自定义上下拉伸 高度  */
	function screens(warp, topObj, downObj, crux, maxH, minH) { //warp:最外层父级div；topObj：上面div；downObj:下面div；crux：鼠标按下拖拽点；maxH：能拖拽的最大高度；minH：最小高度；
		var allH = warp.offsetHeight;
		var topH = topObj.offsetHeight;
		crux.onmousedown = function(ev) {
			ev = ev || window.event;
			topH = topObj.offsetHeight;
			var t = ev.pageY;
			document.onmousemove = function(ev2) {
				ev2 = ev2 || window.event;
				var newT = ev2.pageY - t + topH;
				var newD = allH - newT;
				if(maxH) {
					if(newT >= maxH) {
						newT = maxH;
						newD = allH - maxH;
					}
				}
				if(minH) {
					if(newT <= minH) {
						newT = minH;
						newD = allH - minH;
					}
				}
				if(!maxH && !minH) {
					if(newT <= 0) {
						newT = 0;
						newD = allH;
					}
					if(newT >= allH) {
						newT = allH;
						newD = 0;
					}
				}
				topObj.style.height = newT + "px";
				downObj.style.height = newD + "px";
			}
			document.onmouseup = function() {
				document.onmousemove = null;
				document.onmouseup = null;
			}
			return false;
		}
	}
	/*左右方向无缝轮播图*/
	function carousel(moveObj, upBtn, downBtn, imgA, imgB, nav, imgArr, moveTime, inTime, styles) {
		var num = 0;  //要运动的元素，上一张按钮，下一张按钮，图片1，图片2，导航点，图片数组，运动时间，间隔切换时间，导航点的样式；
		var timer = null;
		var iW = imgA.width();
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
			}, inTime)
			moveObj.parent().on("mouseenter", function() {
				clearInterval(timer);
			})
			moveObj.parent().on("mouseleave", function() {
				timer = setInterval(function() {
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
	/*判断是pc端打开还是 移动端打开*/

	function index(pcHttp, phoneHttp) {
		if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
			window.location.href = phoneHttp;
		} else {
			window.location.href = pcHttp;
		}
	}
	/*  分页    */
	function setPage(lastPage, nextPage, box, maxPage, pageNum, Type, Function) { //上一页，下一页，页码父级，多少页一排，一共多少页，页码样式,函数
		var num = 1; //自定义变量，控制上下页，
		var p = 0; //自定义变量，控制循环页数；
		var hash = window.location.hash;
		if(hash) { //一开始就让hash值为1；
			window.location.hash = 'page=1';
		} else {
			window.location.hash = 'page=1';
		}
		pageFn(); //一开始渲染一遍；
		function pageFn() {
			box.html(""); //每次创建li 先清空；
			if(pageNum >= maxPage) {
				var i = Math.ceil(maxPage / 2);
				var z = Math.floor(maxPage / 2);
				if(p < i) {
					p = i;
				} else if(p > (pageNum - z)) {
					p = pageNum - z;
				}
				for(var i = (p - z); i <= (p + z); i++) {
					var li = $('<li>' + i + '</li>'); //创建元素；
					li.click(function() {
						window.location.hash = "page=" + $(this).html();
						num = parseInt($(this).html());
					});
					box.append(li);
				}
			} else {
				for(var i = 0; i < pageNum; i++) {
					var li = $('<li>' + (i + 1) + '</li>'); //创建元素；
					li.click(function() {
						window.location.hash = "page=" + $(this).html();
						num = parseInt($(this).html());
					});
					box.append(li);
				}
			}
		}
		if(lastPage) { //上一页
			$(lastPage).on("click", function() {
				num--;
				if(num <= 0) {
					num = 1;
				}
				window.location.hash = "page=" + num;
			})
		}
		if(nextPage) { //下一页
			$(nextPage).on("click", function() {
				num++;
				if(num >= pageNum) {
					num = pageNum;
				}
				window.location.hash = "page=" + num;
			})
		}
		window.onhashchange = function() { //hash 值改变，触发事件；
			newPage = window.location.hash.split("=")[1];
			newPage = parseInt(newPage);
			p = newPage;
			pageFn();
			if(Function) {
				Function(newPage);
			}
			box.find("li").each(function(i, ele) {
				if(newPage == $(ele).html()) {
					$(ele).addClass(Type).siblings("li").removeClass(Type);
				}
			})
		}
	}
}