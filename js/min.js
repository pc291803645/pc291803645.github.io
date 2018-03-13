   if(!!window.ActiveXObject || "ActiveXObject" in window) { //判断是否ie先；
   	var str = navigator.userAgent;
   	if(str.indexOf("MSIE") >= 0) { //ie6~10
   		var lcn = navigator.userAgent.indexOf('MSIE');
   		var num = str[lcn + 5] + str[lcn + 6];
   		if(num < 9) {
   			window.location.href = "lower.html";
   		}
   	}
   }

 /*Introduce javascript file*/
 document.write('<script src="js/jquery-1.12.4.js" type="text/javascript"></script>');
 document.write('<script src="js/angular.min.js" type="text/javascript"></script>');
 document.write('<script src="js/controller.js" type="text/javascript"></script>');
 document.write('<script src="js/factory.js" type="text/javascript"></script>');
 document.write('<script src="js/app.js" type="text/javascript"></script>');
 document.write('<link rel="icon"  href="img/icon.ico"/>');