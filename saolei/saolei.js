var btn = document.getElementById("btn"),
    flag = document.getElementById("flag"),
    chess = document.getElementById("chess"),
    alert = document.getElementById("alert"),
    alertbox = document.getElementById("alertbox"),
    close = document.getElementById('close'),
    score = document.getElementById('score'),
    title = document.getElementById('title'),
    mineNum,
    mineOver = 10,
    block,
    mineIndex,
    mineset = [];

bindevent();
function bindevent(){
	btn.onclick=function(){
		flag.style.display = 'block';
		chess.style.display = 'block';
		btn.style.display = 'none';
		title.style.display = 'none';
		init();
	}
	chess.oncontextmenu = function(){
		//取消右击鼠标默认事件
		return false;
	}
	chess.onmousedown = function(e){
		var event = e.target;
		if(e.which == 1){
			leftClick(event);
		}else if(e.which == 3){
			rightClick(event);
		}
	}
	close.onclick = function(){
		chess.style.display = "none";
		flag.style.display = "none";
		alert.style.display = "none";
		btn.style.display = "block";
		title.style.display = 'block';
		chess.innerHTML = "";
	}
}

function init(){
	mineNum = 10;
	mineOver = 10;
	score.innerHTML = mineOver;
	for(var i = 0;i<10;i++){
		for(var j = 0;j<10;j++){
			var con = document.createElement('div');
			con.classList.add('block');
			con.setAttribute('id',i+"-"+j);
			con.style.boderSize="1px";
			chess.appendChild(con);
			mineset.push({mine:0});
		}
	}

	block = document.getElementsByClassName("block");
	while(mineNum){
		mineIndex = parseInt(Math.random()*100);
		if(mineset[mineIndex].mine==0){
			mineset[mineIndex].mine = 1;
			block[mineIndex].classList.add('ismine');
			mineNum --;
		}
	}
}

function leftClick(e){
	var ismine = document.getElementsByClassName('ismine');
	if(e && e.classList.contains('ismine')){
		// console.log('lei');
		for(var i = 0;i < ismine.length;i++){
			ismine[i].classList.add('show');
			setTimeout(function(){
				alert.style.display="block";
				alertbox.style.backgroundImage="url(img/jieshu.png)";
			},800);
		}
	}else{
		var n = 0;
		var proarr = e.getAttribute('id').split('-');
		var prox = +proarr[0];
		var proy = +proarr[1];
		e&&e.classList.add('num');
		for(var i = prox-1;i<=prox+1;i++){
			for(var j = proy-1;j<proy+1;j++){
				var text = document.getElementById(i+'-'+j);
				if(text&&text.classList.contains("ismine")){
					n++;
				}
			}
		}
		e&&(e.innerHTML=n);

		if(n==0){
			for(var i = prox-1;i<=prox+1;i++){
				for(var j = proy-1;j<proy+1;j++){
					var near = document.getElementById(i+"-"+j);
					if(near){
						if(!near.classList.contains('check')){
							near.classList.add('check');
							leftClick(near);
						}
					}
				}
			}
		}
	}
}
function rightClick(e){
	if(e.classList.contains('num')){
		return;
	}
	e.classList.toggle('hongqi');
	if(e.classList.contains('ismine') && e.classList.contains('hongqi')){
		mineOver --;
	}
	if(e.classList.contains('ismine') && !e.classList.contains('hongqi')){
		mineOver ++;
	}
	score.innerHTML = mineOver;
	if(mineOver == 0){
		alert.style.display="block";
		alertbox.style.backgroundImage="url(img/guoguan.png)";
	}

}