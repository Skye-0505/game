var startBtn = document.getElementById('startBtn'),
    content = document.getElementById('content'),
    score = document.getElementById('score'),
    loser = document.getElementById('loser'),
    lscore = document.getElementById('lscore'),
    close = document.getElementById('close'),
    title = document.getElementById('title'),
    startP = document.getElementById('startP'),
    wrapper = document.getElementById('wrapper'),
    flag = true,//用来判断是start的还是play的。play的话不用重新生成食物
    startpage = document.getElementById('startpage'),
    snakeMove,
    playBtn = true,
    num = 0,
    speed = 200;

init();
function init(){
	//地图
	this.mapW = parseInt(getComputedStyle(content).width);
	this.mapH = parseInt(getComputedStyle(content).height);
	this.mapDiv = content;

	//食物
	this.foodW = 20;
	this.foodH = 20;
	this.foodX = 0;
	this.foodY = 0;

	//蛇
	this.snakeW = 20;
	this.snakeH = 20;
	this.snakeBody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];

	//属性
	this.direct = 'right';
	this.right = false;
	this.left = false;
	this.up = true;
	this.down = true;

	// startGame();
	bindEvent();
}

function startGame(){
	content.style.display='block';
	title.style.display='none';
	startBtn.style.display='none';
	startP.style.display = 'block';
	loser.style.display = 'none';
	startpage.style.zIndex = -1;
	console.log('startGame: '+flag);
	if(flag){
		console.log('dd');
		food();
		snake();
	}
	// bindEvent();
}

function food(){
	var food = document.createElement('div');
	food.style.width = this.foodW + "px";
	food.style.height = this.foodH + "px";
	food.style.position = "absolute";
	this.foodX = Math.floor(Math.random()*0.8*(this.mapW / 20));
	this.foodY = Math.floor(Math.random()*0.8*(this.mapH / 20));
	food.style.left = this.foodX * 20 +"px";
	food.style.top = this.foodY * 20 +"px";
	mapDiv.appendChild(food).setAttribute('class','food');
}

function snake(){
	for(var i = 0;i<this.snakeBody.length;i++){
		var snakeb = document.createElement('div');
		snakeb.style.width = this.snakeW + "px";
		snakeb.style.height = this.snakeH + "px";
		snakeb.style.position = 'absolute';
		snakeb.style.left = this.snakeBody[i][0]*20 + 'px';
		snakeb.style.top = this.snakeBody[i][1]*20 + 'px';
		snakeb.classList.add(this.snakeBody[i][2]);
		this.mapDiv.appendChild(snakeb).classList.add('snake');
		switch(this.direct){
			case 'right':
				break;
			case 'left':
				snakeb.style.transform = 'rotate(180deg)';
				break;
			case 'up':
				snakeb.style.transform = 'rotate(270deg)';
				break;
			case 'down':
				snakeb.style.transform = 'rotate(90deg)';
				break;
			default:
				break;
		}
	}
}

function move(){
	for(var i = this.snakeBody.length-1; i>0; i--){
		this.snakeBody[i][0] = this.snakeBody[i-1][0];
		this.snakeBody[i][1] = this.snakeBody[i-1][1];
	}
	switch(this.direct){
		case 'right':
			this.snakeBody[0][0] +=1;
			break;
		case 'left':
			this.snakeBody[0][0] -=1;
			break;
		case 'up':
			this.snakeBody[0][1] -=1;
			break;
		case 'down':
			this.snakeBody[0][1] +=1;
			break;
		default:
			break;
	}
	remove('snake');
	snake();
	
	if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY){
		var snakeEndX=this.snakeBody[this.snakeBody.length-1][0];
		var snakeEndY=this.snakeBody[this.snakeBody.length-1][1];
		this.snakeBody.push([snakeEndX,snakeEndY,'body']);
		this.num +=1;
		score.innerHTML=this.num;
		remove('food');
		food();
	}else if(this.snakeBody[0][0] < 0 || this.snakeBody[0][0] > (this.mapW/20) || this.snakeBody[0][1] < 0 || this.snakeBody[0][1] > (this.mapH/20)){
		console.log('bb');
		reload();
	}
	for(var i = 1;i<this.snakeBody.length;i++){
		if(this.snakeBody[0][0]==this.snakeBody[i][0]&&this.snakeBody[0][1]==this.snakeBody[i][1]){
			console.log('ss');
			reload();
		}
	}	
}
function reload(){
		flag = true;
		playBtn = true;
		console.log('reload: '+flag);
		remove('snake');
		remove('food');
		clearInterval(snakeMove);
		loser.style.display='block';
		lscore.innerHTML = this.num;
		loser.style.display='block';
		content.style.display='none';

		this.snakeBody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];
		this.direct = 'right';
		this.right = false;
		this.left = false;
		this.up = true;
		this.down = true;
		score.innerHTML = 0;
		this.num = 0;
		
}
function remove(className){
	var del = document.getElementsByClassName(className);
	while(del.length>0){
		del[0].parentNode.removeChild(del[0]);
	}
}

function setDerict(key){
	switch(key){
			case 38:
				if(this.up){
					this.direct = 'up';
					this.up = false;
					this.down = false;
					this.right = true;
					this.left = true;
				}
				break;
			case 39:
				if(this.right){
					this.direct = 'right';
					this.up = true;
					this.down = true;
					this.right = false;
					this.left = false;
				}
				break;
			case 40:
				if(this.down){
					this.direct = 'down';
					this.up = false;
					this.down = false;
					this.right = true;
					this.left = true;
				}
				break;
			case 37:
				if(this.left){
					this.direct = 'left';
					this.up = true;
					this.down = true;
					this.right = false;
					this.left = false;
				}
				break;
			default:
				break;
		}
}
function bindEvent(){
	startBtn.onclick = function(){
		playOrpause();
		flag = false;
		console.log("startBtn: "+flag);
	}
	startP.onclick = function(){
		// this.flag = true;
		playOrpause();
		console.log("startP: "+flag);
	}
	close.onclick = function(){ 
		startpage.style.zIndex = 99;
		title.style.display = 'block';
		startBtn.style.display = 'block';
		content.style.display='none';
		loser.style.display = 'none';
	}
}
function playOrpause(){
	if(playBtn){
		startGame();
		startP.setAttribute('src','./img/pause.png');
		document.onkeydown = function(e){
			var key = e.keyCode;
	    	setDerict(key);
			// switch(key){
			// 	case 38:
			// 	console.log('aaaa');
			// 		if(this.up){
			// 			this.direct = 'up';
			// 			this.up = false;
			// 			this.down = false;
			// 			this.right = true;
			// 			this.left = true;
			// 		}
			// 		break;
			// 	case 39:
			// 		if(this.right){
			// 			this.direct = 'right';
			// 			this.up = true;
			// 			this.down = true;
			// 			this.right = false;
			// 			this.left = false;
			// 		}
			// 		break;
			// 	case 40:
			// 		if(this.down){
			// 			this.direct = 'down';
			// 			this.up = false;
			// 			this.down = false;
			// 			this.right = true;
			// 			this.left = true;
			// 		}
			// 		break;
			// 	case 37:
			// 		if(this.left){
			// 			this.direct = 'left';
			// 			this.up = true;
			// 			this.down = true;
			// 			this.right = false;
			// 			this.left = false;
			// 		}
			// 		break;
			// 	default:
			// 		break;
			// }
		}
		snakeMove = setInterval(function(){
			move();
		},this.speed);
		playBtn = false;
	}else if(!playBtn){
		startP.setAttribute('src','./img/play.png');
		clearInterval(snakeMove);
		document.onkeydown = function(e){
			e.retrunValue = false;
			return false;
		}
		playBtn = true;
	}
}



