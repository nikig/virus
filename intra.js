tool.fixedDistance = 15;

var path;
var strokeEnds = 16;
var lastPoint;
var point;

var dissertation = document.layers[0].items['dissertation'].content

var paragraphs = dissertation.split(/\r/).filter(function(s) {
	return s.length > 0;
});
var wordsPerParagraph = paragraphs.map(function(p) {
	return p.split(/\s+/);
});

var currentParagraph = 0;
var currentWord = 0;

function advanceParagraph() {
	if (currentParagraph == wordsPerParagraph.length) {
		currentParagraph = 0;
	}
	var	text = wordsPerParagraph[currentParagraph].splice(currentWord).join(' ');
	currentWord = 0;
	currentParagraph++
	return text;
}

function advanceWord() {
	if (currentWord == wordsPerParagraph[currentParagraph].length) {
		currentWord = 0;		
		advanceParagraph();
	}
	return wordsPerParagraph[currentParagraph][currentWord++];
}


function bubbles(){
	for (var i=0; i<20; i++) {
		var x = Math.random() * document.size.width;
		var y = Math.random() * document.size.height;

		//change 50 if you want to increase the radius
		var radius = Math.random() * 50 + 10;
		var path = new Path.Circle(new Point(x, y), radius);
		path.fillColor = document.swatches.pick().color;
	}}


function brushes(){
	
	for (var o=0; o<20; o++) {

		path.add(new Point());
		path.strokeColor = '#000000';
		path.strokeWidth = 10;	
		path.smooth();
	}
}



function frames(){
	for (var o=0; o<5; o++) {
		var x = Math.random() * document.size.width;
		var y = Math.random() * document.size.height;

		var radius = Math.random() * 100 + 700;

		var path = new Path.Rectangle(new Point(x, y), new Size (radius, radius));
		path.strokeColor = document.swatches.pick().color;
		path.fillColor = document.swatches.pick().color;
		path.strokeWidth = Math.random() * 3;
	}
	}



function Branch(point, group) {
	this.point = point;
	this.vector = new Point(Math.random() * values.size, 0).rotate(Math.random() * 360);
	this.path = new Path();
	this.path.add(point);
	group.appendTop(this.path);
}

Branch.prototype.grow = function() {
	this.vector = this.vector.transform(new Matrix().rotate((Math.random() - 0.4) * 30));
	this.point += this.vector;
	this.path.add(this.point);
};

var values = {
	size: 200,
	max: 20

};

var branches;

function community(){
	for (var i in branches)
	branches[i].grow();
}



function blobcolor(){

	for (var i=0; i<20; i++) {
		var x = Math.random() * document.size.width;
		var y = Math.random() * document.size.height;
		var radius = Math.random() * 50 + 10;
		var path = new Path.Circle(new Point(x, y), radius);
		path.fillColor = document.swatches.pick().color;
	}
}

function enlightenment(){
	for (var i=0; i<20; i++) {		
		var radius = i * 50;
		var path = new Path.Circle(new Point, radius);
	}
}


function lastIndex(array) {
	return array.length - 1;
}

function lastElement(array) {
	return array[lastIndex(array)];
}

function randomIndex(array) {
	var randomValueBetweenZeroAndOne = Math.random();
	var randomZeroBasedIndexInArray = randomValueBetweenZeroAndOne * lastIndex(array);
	return Math.round(randomZeroBasedIndexInArray);
}

function randomElement(array) {
	return array[randomIndex(array)];
}




function createAreaText(point, size, text) {
	var textItem = new AreaText(new Rectangle(point, size));
	textItem.content = text;
	return textItem;
}

function createPointText(point, text) {
	var textItem = new PointText(point);
	textItem.content = text;
	return textItem;
}

function setTextRangeColor(range, color) {
	if (range) {
		range.characterStyle.fillColor = color;   
	}
}

function setTextRangeFontSize(range, fontSize) {
	if (range) {
		range.characterStyle.fontSize = fontSize;
	}
}



function showRestOfCurrentParagraphAtMousePointer(event) {
	var paragraph = advanceParagraph();
	var textItem = createAreaText(event.point, new Size(700, 1000), paragraph);
	setTextRangeColor(textItem, new CMYKColor(1, 0, 0, 0));
	var words = textItem.range.words;
	setTextRangeColor(randomElement(words), '#ff0000');
	setTextRangeFontSize(lastElement(words), 25);
	setTextRangeFontSize(textItem, 30);
	

}

function showCurrentWordAtMousePointer(event) {
	createPointText(event.point, advanceWord());
}


var dragSpacing = 10;


function isTimeForAnotherMouseDragAction(event) {
	return event.count % dragSpacing == 0
}



function addStrokes(point, delta) {
	var step = delta.rotate(20);
	var strokePoints = strokeEnds * 2 + 1;
	point -= step / 2;
	step /= strokePoints - 1;
	for(var i = 0; i < strokePoints; i++) {
		var strokePoint = point + step * i;
		var offset = delta * (Math.random() * 0.3 + 0.1);
		if (i.isEven()) {
			offset *= -1;
		}
		strokePoint += offset;
		path.insert(0, strokePoint);
	}
}


function onMouseDown(event) {
	if (currentParagraph >= 4 && currentParagraph <=9){
		path = new Path();
		path.fillColor = null;
		path.strokeColor = '#ff0000';
		lastPoint = null;
	}

  	if (currentParagraph >=29 && currentParagraph <=38) {
		branches = [];
		var count = Math.round(Math.random() * (values.max - 1) + 10);
		var group = new Group();

		for (var i = 0; i < count; i++){
			branches.push(new Branch(event.lastPoint, group));
			}
	}

	if (currentParagraph >=39 && currentParagraph <=48){

		path = new Path();
		path.fillColor = document.swatches.pick().color;
		path.strokeColor = null;
		lastPoint = null;
	}
}


function onMouseDrag(event) {
	if (!isTimeForAnotherMouseDragAction(event)) {
		return;
	}

	if (currentParagraph >= 0 && currentParagraph <=3){
		bubbles();

	}

	if (currentParagraph >= 4 && currentParagraph <=9){

		path.add(new Point(event.point));
		path.strokeColor = '#000000';
		path.strokeWidth = 10;
	}

	if (currentParagraph >= 10 && currentParagraph <=19){
		frames();
	}

	if (currentParagraph >=20 && currentParagraph <=28){
		if(event.item) {
        		event.item.scale(1.1);
		}	
	}
   

	if (currentParagraph >=29 && currentParagraph <=38){
		community();

	}

	if (currentParagraph >=39 && currentParagraph <=48){
		if (event.count == 30) {
			addStrokes(event.middlePoint, event.delta * -10);}else{

			var step = event.delta / 2;
			step.angle += 20;
	
			var top = event.middlePoint + step;
			var bottom = event.middlePoint + step;

			path.add(top);
			path.insert(150, bottom);
		}
	
	}


	if (currentParagraph >=49 && currentParagraph <=57){
		var radius = event.count * 30 + 10;
		var path = new Path.Circle(new Point(event.middlePoint), radius);
		path.fillColor = '#FFF265';

	}
}	


function isMouseUpAfterDrag(event) {
	return event.delta.x !== 0 || event.delta.y !== 0;
}


function onMouseUp(event) {
	if (!isMouseUpAfterDrag(event)) {
		return;	
	}

	showRestOfCurrentParagraphAtMousePointer(event);


	if (currentParagraph >=39 && currentParagraph <=48){
		path.smooth();
	
		lastPoint = event.middlePoint;
		
		if (lastPoint) {
			var delta = event.point - lastPoint;
			delta.length = tool.maxDistance;
			addStrokes(event.point, delta);
			path.closed = true;
			path.smooth();
		}
		blobcolor();
	}
}