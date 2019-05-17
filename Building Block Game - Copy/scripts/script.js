//CACHE IMAGES

for(i=0;i<7;i++){
	let x = new Image();
	let y = 'images/' + i + '.png';
	x.src = y;
}

//KEY LISTENER

let keyScore = 0;

window.onkeydown = function(e) {

	let key = e.keyCode ? e.keyCode : e.which;

	if(((key==37)||(key==38)||(key==39)||(key==40))&&(allowKeys==false)){
		e.preventDefault();
	}

	if(keyDisabler==false){

		if(currentShape!=null){
			if (key == 37){
				currentShape.moveLeft();
			}
			else if(key == 39){
				currentShape.moveRight();
			}
			else if(key == 40){
				currentShape.descend();
				if(inPlay==true){keyScore = keyScore + currentLevel};
				let scoreString = (keyScore + score).toString();
				while(scoreString.length<7){
					scoreString = '0' + scoreString}
					document.getElementById("score").innerHTML = '<p>' + scoreString + '</p>';
				}
				else if(key == 38){
					currentShape.rotate();
				}
			}
		}
	}

//ARRAYS

let currentShape = null;
let current = new Array(200).fill(null);

//POINTS TRACKING

let score = 0;

//INCREASE SPEED

let shapeNumber = 0;
let currentLevel = 1;
let level = 1000;

function speedCheck(){
	shapeNumber++;
	let x = currentLevel;
	currentLevel = parseInt(shapeNumber/25)+1;
	if(x!=currentLevel){
		let y = 'LEVEL ' + currentLevel + ':';
		document.getElementById("level").innerHTML = '<p>' + y + '</p>';
		level = level*0.75;
	}
	
}

//MAKE SHAPE CLASS

let isGameOver = false;
let shapeGen = parseInt(Math.random()*7);

function MakeShape(){

	clearInterval(autoDescend);

	if(isGameOver==false){

		currentShape = this;

		speedCheck();

	//STARTING COORDINATES

	let currentSquares = new Array(4);

	this.shape = shapeGen;

	if(shapeGen == 0){currentSquares = [[0,4],[0,5],[1,4],[1,5]];this.color = '#ff800a'} //Square
	if(shapeGen == 1){currentSquares = [[0,5],[0,6],[0,4],[0,3]];this.color = '#3b88c6'} //Line
	if(shapeGen == 2){currentSquares = [[1,5],[0,5],[0,4],[1,6]];this.color = '#e25d0a'} //Zig
	if(shapeGen == 3){currentSquares = [[1,5],[1,4],[0,5],[0,6]];this.color = '#cc395d'} //Zag
	if(shapeGen == 4){currentSquares = [[1,5],[0,6],[1,4],[1,6]];this.color = '#ffcb00'} //L1
	if(shapeGen == 5){currentSquares = [[1,5],[0,4],[1,4],[1,6]];this.color = '#8f5ca8'} //L2
	if(shapeGen == 6){currentSquares = [[1,5],[0,5],[1,4],[1,6]];this.color = '#25b2b2'} //T

	shapeGen = parseInt(Math.random()*7);

	let pic = '<img src="images/' + shapeGen + '.png">';
	document.getElementById('picture').innerHTML = pic;

	this.centreSquare = currentSquares[0];

	//COLOUR IN THE SQUARES

	for(i=0;i<4;i++){

		let f = currentSquares[i][0]*10+currentSquares[i][1];

		if(current[f]!=null){
			isGameOver = true;
		}else{

			let x = currentSquares[i];
			let y = 'r' + x[0] + 's' + x[1];
			document.getElementById(y).style.background = this.color;
			document.getElementById(y).style.border = '1px solid rgba(200,200,200,0.6)'
		}
	}

	if(isGameOver==true){
		endGame();
	}

	this.rotate = function(){

		if(this.shape!=0){

			let shouldIRotate = true;

			for(i=1;i<4;i++){

				let a = currentSquares[0][0];
				let b = currentSquares[0][1];

				let x = currentSquares[i][0];
				let y = currentSquares[i][1];

				let thisOne = (((b+a-y)*10)+x-a+b);

				if(thisOne<1){shouldIRotate=false}
					if(thisOne>200){shouldIRotate=false}
						if(current[thisOne]!=null){shouldIRotate=false}
							if(((x-a+b)<0)||((x-a+b)>9)){shouldIRotate=false}
						}

			//MAKE WHITE
			if(shouldIRotate==true){
				for(i=0;i<4;i++){

					let x = currentSquares[i];

					let y = 'r' + x[0] + 's' + x[1];

					document.getElementById(y).style.background = 'rgb(220,220,220)';
					document.getElementById(y).style.border = 'none';

				}

			//ROTATE THE COORDINATES

			for(i=1;i<4;i++){

				let x = currentSquares[i][0];
				let a = currentSquares[0][0];

				let y = currentSquares[i][1];
				let b = currentSquares[0][1];

				currentSquares[i][0] = b+a-y;
				currentSquares[i][1] = x-a+b;

			}

			//RECOLOUR

			for(i=0;i<4;i++){

				let x = currentSquares[i];

				let y = 'r' + x[0] + 's' + x[1];

				document.getElementById(y).style.background = this.color;
				document.getElementById(y).style.border = '1px solid rgba(200,200,200,0.6)';
			}
		}
	}
}

this.descend = function(){

		//TEST TO SEE IF IT CAN DESCEND

		let canIDescend = true;

		for(i=0;i<4;i++){

			let x = (currentSquares[i][0]+1)*10+currentSquares[i][1];

			if((currentSquares[i][0]>18)||(current[x]!=null)){

				//ADD TO ARRRAY!
				for(i=0;i<4;i++){
					let x = currentSquares[i][0]*10+currentSquares[i][1];
					current[x]=this.color}

				//ERASE OLD SHAPE, CREATE NEW ONE

				canIDescend=false;
				currentShape = null;
				lineTest();
			}
		}

		//DESCEND

		if(canIDescend==true){

			for(i=0;i<4;i++){

				let x = currentSquares[i];

				let y = 'r' + x[0] + 's' + x[1];

				document.getElementById(y).style.background = 'rgb(220,220,220)';
				document.getElementById(y).style.border = 'none';

			}

			//CHANGE THE COORDINATES AND RECOLOUR

			for(i=0;i<4;i++){
				currentSquares[i][0]++;
			}

			for(i=0;i<4;i++){

				let x = currentSquares[i];

				let y = 'r' + x[0] + 's' + x[1];

				document.getElementById(y).style.background = this.color;
				document.getElementById(y).style.border = '1px solid rgba(200,200,200,0.6)';
			}
		}
	}

	//MOVE LEFT

	this.moveLeft = function(){
		let test = currentSquares[0][1]*currentSquares[1][1]*currentSquares[2][1]*currentSquares[3][1];

		for(i=0;i<4;i++){

			let x = (currentSquares[i][0])*10+currentSquares[i][1]-1;

			if(current[x]!=null){test=0}
		}

	if(test!=0){

		for(i=0;i<4;i++){

			let x = currentSquares[i];

			let y = 'r' + x[0] + 's' + x[1];

			document.getElementById(y).style.background = 'rgb(220,220,220)';
			document.getElementById(y).style.border = 'none';

		}

			//CHANGE THE COORDINATES AND RECOLOUR

			for(i=0;i<4;i++){
				currentSquares[i][1]--;
			}

			for(i=0;i<4;i++){

				let x = currentSquares[i];

				let y = 'r' + x[0] + 's' + x[1];

				document.getElementById(y).style.background = this.color;
				document.getElementById(y).style.border = '1px solid rgba(200,200,200,0.6)';

			}		
		}
	}

	//MOVE RIGHT

	this.moveRight = function(){

		let test = (9-currentSquares[0][1])*(9-currentSquares[1][1])*(9-currentSquares[2][1])*(9-currentSquares[3][1]);

		for(i=0;i<4;i++){

			let x = (currentSquares[i][0])*10+currentSquares[i][1]+1;

			if(current[x]!=null){test=0}
		}

	if(test!=0){

			//MAKE THEM WHITE

			for(i=0;i<4;i++){

				let x = currentSquares[i];

				let y = 'r' + x[0] + 's' + x[1];

				document.getElementById(y).style.background = 'rgb(220,220,220)';
				document.getElementById(y).style.border = 'none';

			}

			//CHANGE THE COORDINATES AND RE COLOUR
			

			for(i=0;i<4;i++){
				currentSquares[i][1]++;
			}

			for(i=0;i<4;i++){

				let x = currentSquares[i];

				let y = 'r' + x[0] + 's' + x[1];

				document.getElementById(y).style.background = this.color;
				document.getElementById(y).style.border = '1px solid rgba(200,200,200,0.6)';

			}		
		}
	}
}

autoDescend = setInterval(function(){
	if(currentShape!=null){
		currentShape.descend();
	}
},level);
}

//START GAME

let autoDescend;
let restart = false;
let inPlay = false;
let keyDisabler = false;

function start(){

	inPlay = true;
	document.getElementById('saveContainer').style.zIndex = '-1';
	clearInterval(autoDescend);
	shapeGen = parseInt(Math.random()*7);

	document.getElementById('save').style.display = 'none';

	keyDisabler = true;

	if(restart==true){

	//RESET VALUES

	score = 0;
	keyScore = 0;
	linesTally = 0;
	whichLinesCompleted = new Array(20).fill(false);
	howMany = 0;
	multi = 1;
	level = 1000;
	isGameOver = false;
	shapeNumber = 0;
	currentLevel = 1;

	document.getElementById("level").innerHTML = '<p>LEVEL 1:</p>';
	document.getElementById("score").innerHTML = '<p>0000000</p>';
	document.getElementById("lines").innerHTML = '<p>0 LINES</p>';

	let x = document.getElementsByClassName('box');
	for(i=0;i<x.length;i++){
		x[i].style.background = 'rgb(220,220,220)';
		x[i].style.border = 'none';
	}
}

currentShape = null;
current = new Array(200).fill(null);

restart = true;

	//MAKE NEW SHAPE

	new MakeShape();

	setTimeout(function(){keyDisabler = false},500)

}

//LINE TEST FUNCTION.

let linesTally = 0;

function lineTest(){

	clearInterval(autoDescend);

//FIND OUT WHICH ROWS ARE COMPLETED

let whichLinesCompleted = new Array(20).fill(false);
let howMany = 0;
keyDisabler = true;

for(i=0;i<20;i++){
	let x = true;
	for(j=0;j<10;j++){
		if(current[10*i+j]==null){
			x = false
		}
	}

	//COLOUR THE COMPLETED LINES 

	if (x==true){
		whichLinesCompleted[i] = true;
		for(j=0;j<10;j++){
			let y = 'r' + i + 's' + j;

			document.getElementById(y).style.background = '#ff005d';

		}

		howMany++;
	}
}

//UPDATE SCORE

let multi = 1;

if(howMany==1){multi=100}else if(howMany==2){multi=250}else if(howMany==3){multi=500}else if(howMany==4){multi=1000};

if(howMany!=0){
	score = score + (multi*currentLevel)
	let scoreString = (score + keyScore).toString();
	while(scoreString.length<7){
		scoreString = '0' + scoreString}
		document.getElementById("score").innerHTML = '<p>' + scoreString + '</p>';


		linesTally = linesTally + howMany;
		let p = ' LINES</p>';
		if(linesTally==1){p=' LINE</p>'}
			document.getElementById("lines").innerHTML = '<p>' + linesTally + p;

//UPDATE THE CURRENT ARRAY

for(i=0;i<20;i++){
	let v = 19 - i;
	if(whichLinesCompleted[v]==true){
		current.splice(v*10,10);
	}
}

for(i=0;i<20;i++){
	if(whichLinesCompleted[i]==true){
		current.unshift(null,null,null,null,null,null,null,null,null,null);
	}
}

currentShape = null;

//RECOLOUR

setTimeout(function(){

	for(i=0;i<20;i++){
		for(j=0;j<10;j++){
			let z = 'r' + i + 's' + j;
			let f = current[10*i+j];
			let g = '1px solid rgba(200,200,200,0.6)';
			if(current[10*i+j]==null){
				f = 'rgb(220,220,220)'; g = 'none'}
				document.getElementById(z).style.background = f;
				document.getElementById(z).style.border = g;
			}
		}


//MAKE NEW SHAPE

new MakeShape();
keyDisabler = false;
},500);}else{
	new MakeShape();
	keyDisabler = false;
}

}

//END GAME

let allowKeys = false;

function endGame(){

	clearInterval(autoDescend);
	currentShape = null;
	inPlay = false;
	document.getElementById('save').style.display = 'inline-block';
	document.getElementById('saveContainer').style.zIndex = '1';
	keyDisabler = true;
	allowKeys = true;
	

}

function dontSave(){

	document.getElementById('save').style.display = 'none';
	allowKeys = false;
	
}

//FIND PIXEL DATA FOR CENTRE SQUARE

let centreSquarePixelData = null;

function pixelChecker(){

	if(currentShape!=null){
		let x = 'r' + currentShape.centreSquare[0] + 's' + currentShape.centreSquare[1];
		let y = document.getElementById(x).getBoundingClientRect();
		centreSquarePixelData = [(y.x + 15),(y.y + 15)];
	}
}

//FIND PIXEL DATA FOR MOUSECLICK

let clickData = null;

window.onload = function(){
	updateHighScores();
	let mainGameDiv = document.getElementById('mainGame');
	mainGameDiv.addEventListener('click', function (e) {
		let x = e.clientX;
		let y = e.clientY;
		clickData = [x,y];
		if(inPlay==true){mouseWasClicked()};
	});
}

//MOUSE CLICK FUNCTION TO MOVE/ROTATE SHAPE

function mouseWasClicked(){

	let x = centreSquarePixelData[0];
	let y = centreSquarePixelData[1];
	let a = clickData[0];
	let b = clickData[1];
	let p = Math.sqrt((x-a)*(x-a)+(y-b)*(y-b));

	if(p>15){
		if(((b-y)>(x-a))&&((b-y)>(a-x))){
			currentShape.descend();
			keyScore = keyScore + currentLevel;
			let scoreString = (keyScore + score).toString();
			while(scoreString.length<7){
				scoreString = '0' + scoreString}
				document.getElementById("score").innerHTML = '<p>' + scoreString + '</p>';
			}

			if(((b-y)<=(a-x))&&((b-y)>(x-a))){
				currentShape.moveRight();
			}

			if(((b-y)<=(x-a))&&((b-y)<=(a-x))){
				currentShape.rotate();
			}

			if(((b-y)>(a-x))&&((b-y)<=(x-a))){
				currentShape.moveLeft();
			}
		}	
	}

// GET DATA AND UPDATE HIGH SCORES;

let scoreData;

function updateHighScores(){

	let request = new XMLHttpRequest();
	request.open("POST", "scripts/dataRetrieve.php", true);
	request.send();

	request.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			scoreData = JSON.parse(this.responseText);
			for(i=0;i<10;i++){

				let string = i.toString();
				document.getElementById("n"+i).innerHTML = scoreData[string].name.toUpperCase();
				document.getElementById("s"+i).innerHTML = scoreData[string].score;
			}			
		}
	}
}

//SAVE DATA

function formComplete(){

	let dataSend = new Array;
	dataSend[0] = document.getElementById("inputText").value;
	dataSend[1] = score + keyScore;
	let json = JSON.stringify(dataSend);
	let request= new XMLHttpRequest();
	request.open("POST", "scripts/dataSend.php", true);
	request.setRequestHeader("Content-type", "application/json");
	request.send(json);
	
	document.getElementById('save').style.display = 'none';
	allowKeys = false;
	
	request.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			scoreData = JSON.parse(this.responseText);
			for(i=0;i<10;i++){

				let string = i.toString();
				document.getElementById("n"+i).innerHTML = scoreData[string].name.toUpperCase();
				document.getElementById("s"+i).innerHTML = scoreData[string].score;
			}			
		}
	}
}
