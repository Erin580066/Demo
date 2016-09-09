//获取保存图片和清除画布标签
var oSave = document.getElementById("saveimg");
var oClearRect = document.getElementById("clearimg");
//获取工具按钮的标签
var Brush = document.getElementById("mean_brush");
var Eraser = document.getElementById("mean_eraser");
var Paint = document.getElementById("mean_paint");
var Straw = document.getElementById("mean_straw");
var Text = document.getElementById("mean_text");
var Magnifier = document.getElementById("mean_magnifier");
//获取形状按钮标签
var Line = document.getElementById("shape_line");
var Arc = document.getElementById("shape_arc");
var Rect = document.getElementById("shape_rect");
var Poly = document.getElementById("shape_poly");
var ArcFill = document.getElementById("shape_arcfill");
var RectFill = document.getElementById("shape_rectfill");
//把12个工具和形状标签放到一个数组里
var actions = [Brush,Eraser,Paint,Straw,Text,Magnifier,Line,Arc,Rect,Poly,ArcFill,RectFill];
//获取线宽按钮的标签
var Line_1 = document.getElementById("line_1");
var Line_3 = document.getElementById("line_3");
var Line_5 = document.getElementById("line_5");
var Line_8 = document.getElementById("line_8");
//把四个线宽 标签放在一个数组里
var oC = document.getElementById("canvas");
var oGC = oC.getContext('2d');
var Width = [Line_1,Line_3,Line_5,Line_8];
//保存图片

oSave.onclick = function(){
	var imgData = oC.toDataURL();
	var b64 = imgData.substring(22);
//	alert(b64);
	var dataImg = document.getElementById("dataImg");
	dataImg.value = b64;
	var myForm = document.getElementById("myform");
	myForm.submit();
}
//清除画布
oClearRect.onclick = function(){
	oGC.clearRect(0,0,oC.width,oC.height);
}
//设置默认值
drawBrush(0);
//状态设置函数
function setStatus(Arr,num,type){
	for (var i = 0; i < Arr.length; i++) {
		if(i==num){
			Arr[i].style.background = 'yellow';
		}else{
			Arr[i].style.background = '#ccc';
		}
	}
}
//工具画笔函数
function drawBrush(num){
	setStatus(actions,num,1)
	oC.onmousedown = function(ev){
		var ev = ev || window.event;
		var startX = ev.pageX - this.offsetLeft;
		var startY = ev.pageY - this.offsetTop;
		oGC.beginPath();
		oGC.moveTo(startX,startY);
		oC.onmousemove = function(ev){
			var ev = ev || window.event;
			var endX = ev.pageX - this.offsetLeft;
			var endY = ev.pageY - this.offsetTop;
			oGC.lineTo(endX,endY);
			oGC.stroke();
		}
		oC.onmouseup = function(){
			oC.onmousemove = oC.onmouseup = null;
		}
		oC.onmouseout = function(){
			oC.onmousemove = oC.onmouseup = null;
		}
		return false;
	}
}
//橡皮擦函数
var flag;
function drawEraser(num){
	setStatus(actions,num,1);
	oC.onmousedown=function(ev){
		var ev = ev || window.event;
		var startX = ev.pageX - this.offsetLeft;
		var startY = ev.pageY - this.offsetTop; 
		flag=1;
		oGC.clearRect(startX-oGC.lineWidth,startY-oGC.lineWidth,oGC.lineWidth,oGC.lineWidth);
		oC.onmousemove=function(ev){
			var ev = ev || window.event;
			var endX = ev.pageX - this.offsetLeft;
			var endY = ev.pageY - this.offsetTop; 
			if(flag){
				oGC.clearRect(endX-oGC.lineWidth,endY-oGC.lineWidth,oGC.lineWidth,oGC.lineWidth);	
			}
		}
		oC.onmouseup=function(ev){
				flag=0;
		}
		oC.onmouseout=function(ev){
				flag=0;
		}
	}
}
//油漆桶函数
function drawPaint(num){
	setStatus(actions,num,1);
	oC.onmousedown=function(ev){
		var ev = ev || window.event;
		var startX = ev.pageX - this.offsetLeft;
		var startY = ev.pageY - this.offsetTop; 
		oGC.fillRect(0,0,oC.width,oC.height);
		oC.onmousemove = oC.onmouseup = oC.onmouseout=null;
	}
}
//吸取工具函数
function drawStraw(num){
	setStatus(actions,num,1);
	oC.onmousedown=function(ev){
		var ev = ev || window.event;
		var startX = ev.pageX - this.offsetLeft;
		var startY = ev.pageY - this.offsetTop; 
		var obj = oGC.getImageData(startX,startY,1,1);
		var color = 'rgb('+obj.data[0]+','+obj.data[1]+','+obj.data[2]+')';
		oGC.strokeStyle = color;
		oGC.fillStyle = color;
		drawBrush(0);
		oC.onmousemove = oC.onmouseup = oC.onmouseout=null;
	}
}
//文本工具函数
function drawText(num){
	setStatus(actions,num,1);
	oC.onmousedown=function(ev){
		var ev = ev || window.event;
		var startX = ev.pageX - this.offsetLeft;
		var startY = ev.pageY - this.offsetTop; 
		var userVal = window.prompt('请输入内容');
		if(userVal!=null){
			oGC.fillText(userVal,startX,startY);
		}
		oC.onmousemove = oC.onmouseup = oC.onmouseout=null;
	}
}
放大镜工具函数
function drawMagnifier(num){
	setStatus(actions,num,1);
	oC.onmousedown=function(ev){
		var ev = ev || window.event;
		var startX = ev.pageX - this.offsetLeft;
		var startY = ev.pageY - this.offsetTop; 
		var scale = window.prompt('请输入放大的百分比，只能是整数');
		oC.style.width = oC.width*scale/100 + 'px';
		oC.style.height = oC.height*scale/100 + 'px';
		
		oC.onmousemove = oC.onmouseup = oC.onmouseout=null;
	}
}
//直线形状函数
function drawLine(num){
	setStatus(actions,num,1)
	oC.onmousedown = function(ev){
		var ev = ev ||window.event;
		var startX = ev.pageX - this.offsetLeft;
		var startY = ev.pageY - this.offsetTop;
		oGC.beginPath();
		oGC.moveTo(startX,startY);
		oC.onmouseup = function(){
			var ev = ev || window.event;
			var endX = ev.pageX - this.offsetLeft;
			var endY = ev.pageY - this.offsetTop;
			oGC.lineTo(endX,endY);
			oGC.closePath();
			oGC.stroke();
		}
		oC.onmouseout = oC.onmousemove = null;
		return false;
	}
}
//圆形形状函数
var arcX = 0;
var acrY = 0;
function drawArc(num){
	setStatus(actions,num,1);
	oC.onmousedown = function(ev){
		var ev = ev || window.event;
//		获取圆形位置
		arcX = ev.pageX - this.offsetLeft;
		arcY = ev.pageY - this.offsetTop;
		oC.onmouseup = function(ev){
			var ev = ev || window.event;
			var endX = ev.pageX - this.offsetLeft;
			var endY = ev.pageY - this.offsetTop;
			var a = endX - arcX;
			var b = endY - arcY;
			var c = Math.sqrt(a*a+b*b);
			oGC.beginPath();
			oGC.arc(arcX,arcY,c,0,360*Math.PI/180,false);
			oGC.closePath();
			oGC.stroke();
		}
		oC.onmouseout = oC.onmousemove = null;
		return false;
	}
}
//矩形形状函数
var rectX = 0;
var rectY = 0;
function drawRect(num){
	setStatus(actions,num,1);
	oC.onmousedown = function(ev){
		var ev = ev || window.event;
		rectX = ev.pageX - this.offsetLeft;
		rectY = ev.pageY - this.offsetTop;
		oC.onmouseup = function(ev){
			var ev = ev || window.event;
			var endX = ev.pageX - this.offsetLeft;
			var endY = ev.pageY - this.offsetTop;
			var rectW = endX - rectX;
			var rectH = endY - rectY
			oGC.strokeRect(rectX,rectY,rectW,rectH);
		}
		oC.onmouseout = oC.onmousemove = null;
		return false;
	}
}
//三角形形状函数

function drawPoly(num){
	setStatus(actions,num,1);
	oC.onmousedown=function(ev){
		var ev = ev || window.event;
		startX = ev.pageX - this.offsetLeft;
		startY = ev.pageY - this.offsetTop; 
		oGC.beginPath();
	}
	canvas.onmouseup=function(evt){
		var ev = ev || window.event;
		endX = ev.pageX - this.offsetLeft;
		endY = ev.pageY - this.offsetTop; 
		oGC.moveTo(endX,endY);
		oGC.lineTo(startX-(endX-startX),endY);
		oGC.lineTo(startX,startY-Math.sqrt(Math.sqrt(endX-startX,2)+Math.sqrt(endY-startY,2)));
		oGC.closePath();
		oGC.stroke();
	}
	oC.onmouseout = oC.onmousemove=null;
	return false;
}
function drawArcFill(num){
	setStatus(actions,num,1);
	oC.onmousedown = function(ev){
		var ev = ev || window.event;
//		获取圆形位置
		arcX = ev.pageX - this.offsetLeft;
		arcY = ev.pageY - this.offsetTop;
		oC.onmouseup = function(ev){
			var ev = ev || window.event;
			var endX = ev.pageX - this.offsetLeft;
			var endY = ev.pageY - this.offsetTop;
			var a = endX - arcX;
			var b = endY - arcY;
			var c = Math.sqrt(a*a+b*b);
			oGC.beginPath();
			oGC.arc(arcX,arcY,c,0,360*Math.PI/180,false);
			oGC.closePath();
			oGC.fill();
		}
		oC.onmouseout = oC.onmousemove = null;
		return false;
	}
}

function drawRectFill(num){
	setStatus(actions,num,1);
	oC.onmousedown = function(ev){
		var ev = ev || window.event;
		rectX = ev.pageX - this.offsetLeft;
		rectY = ev.pageY - this.offsetTop;
		oC.onmouseup = function(ev){
			var ev = ev || window.event;
			var endX = ev.pageX - this.offsetLeft;
			var endY = ev.pageY - this.offsetTop;
			var rectW = endX - rectX;
			var rectH = endY - rectY
			oGC.fillRect(rectX,rectY,rectW,rectH);
		}
		oC.onmouseout = oC.onmousemove = null;
		return false;
	}
}
//线宽设置函数
function setLineWidth(num){
	setStatus(Width,num,1)
	switch(num){
		case 0:
			oGC.lineWidth = 1;
			break;
		case 1:
			oGC.lineWidth = 3;
			break;
		case 2:
			oGC.lineWidth = 5;
			break;
		case 3:
			oGC.lineWidth = 8;
			break;
		default:
			oGC.lineWidth = 1;
	}
}
//颜色设置函数
var oColor = document.getElementById("color");
var aLi = oColor.getElementsByTagName('li');
for (var i = 0; i < aLi.length; i++) {
	aLi[i].onclick = function(){
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].style.border = '1px solid #000';
		}
		this.style.border = '1px solid #fff';
		oGC.strokeStyle = this.id;
		oGC.fillStyle = this.id;
	}
}

