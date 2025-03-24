//js里系统提供了一个函数是定时器,她可以按照一定对的时间间隔
//里重复执行一个函数,就是方法
timer = setInterval(function(){//匿名函数,接受返回值为停止方法做准备
	times.innerHTML ++;
},1000)//每一千毫秒执行一次函数
//控制赛道背景向上移动
var x = 0;//弱类型语言（无需数据类型。var即可）
lane = setInterval(function(){
	//改变赛道的top值增1
	x ++;
	bg.style.top = -x + 'px';
	if (x >= window.innerHeight){
		x = 0;
	}
},10)
//生成赛道上的车辆，随机在三条赛道其中一条上
oppositerCar = setInterval(function(){
	var oppoCar = document.createElement("img")//文档对象，创建标签对象
	oppoCar.src = 'img/car2.png'
	oppoCar.className = 'car2'
	var arr=[150,230,310]
	var random=Math.floor(Math.random()*arr.length)
	oppoCar.style.left=arr[random]+'px'
	oppoCar.style.top=-20+'px'
	box.appendChild(oppoCar)
	
},300)
//控制对面车的速度
var speed = 1
var index = 0
oppositeCarSpeedCtrl = setInterval(function(){
	index++
	if(index>=5){
		speed =10
	}
},50)
//对面车添加速度
oppositeCarSpeedCtrl = setInterval(function(){
	//改变所有赛道上的车的top值
	var cars = document.querySelectorAll('#box .car2')
	for(var i=0;i<cars.length;i++){
		cars[i].style.top =cars[i].offsetTop +speed +'px'
		//如果小车已经跑出屏幕范围，在box将该图片删除
		if(cars[i].offsetTop >= window.innerHeight){
			box.removeChild(cars[i])
			
		}
	}
},10)
//js提供了一个事件，就是键盘上的键被按下的事件(触发事件)
window.onkeydown = function(event){
	//event是当前的事件源
//	alert(event.keyCode)
var key = event.keyCode
switch (key){
	case 37:
	//左箭头，小赛车换到左侧赛道
	var left = car.offsetLeft - 80
	if (left < 150){
		left = 150;
	}
	car.style.left = left + 'px'
	
	break;
	case 39:
	var right = car.offsetLeft + 80
	if (right > 310){
		right = 310;
	}
	car.style.left = right + 'px'
	
	//右箭头
	break;
	default:
	break;
}
}

  
// 碰撞检测函数  
function checkCollision(car1, car2) {  
    // 假设每辆赛车都是一个矩形，并且它们的宽度和高度都是固定的  
    var carWidth = 20; // 假设赛车宽度为50px  太高反映就太大了
    var carHeight = 40; // 假设赛车高度为100px  
      
    // 获取每辆赛车的位置和大小  
    var car1Rect = {  
        left: car1.offsetLeft,  
        top: car1.offsetTop,  
        right: car1.offsetLeft + carWidth,  
        bottom: car1.offsetTop + carHeight  
    };  
      
    var car2Rect = {  
        left: car2.offsetLeft,  
        top: car2.offsetTop,  
        right: car2.offsetLeft + carWidth,  
        bottom: car2.offsetTop + carHeight  
    };  
      
    // 检查两个矩形是否相交  
    return !(  
        car1Rect.right < car2Rect.left ||   
        car1Rect.left > car2Rect.right ||   
        car1Rect.bottom < car2Rect.top ||   
        car1Rect.top > car2Rect.bottom  
    );  
}  
  
// 添加碰撞检测逻辑到对手车移动的函数中  
oppositeCarSpeedCtrl = setInterval(function(){  
    // ... (移动对手车的代码保持不变)  
      
    // 检测碰撞  
    var playerCar = document.querySelector('#car');  
    var opponentCars = document.querySelectorAll('#box .car2');  
    for (var i = 0; i < opponentCars.length; i++) {  
        if (checkCollision(playerCar, opponentCars[i])) {  
            // 清除所有定时器  
            clearInterval(timer);  
            clearInterval(lane);  
            clearInterval(oppositerCar);  
            clearInterval(oppositeCarSpeedCtrl);  
              
            // 弹出提示与图片  
            alert("游戏失败！");  
            var failImg = document.createElement("img");  
            failImg.src = 'img/ku2.png';   
            failImg.style.position = 'fixed';  
            failImg.style.top = '50%';  
            failImg.style.left = '50%';  
            failImg.style.transform = 'translate(-50%, -50%)';  
            document.body.appendChild(failImg);  
              
            // 停止游戏逻辑  
            break;  
        }  
    }  
}, 10);  
  