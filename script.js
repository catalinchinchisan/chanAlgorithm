var step = 1;

//var canvas = $("#myCanvas")[0];
var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d");


function drawLine(ax,ay,bx,by) {
    ctx.moveTo(step*ax, step*ay);
    ctx.lineTo(step*bx, step*by);
    ctx.stroke();
}


function drawDot(x,y, pointName) {
    ctx.fillRect(step*x,step*y,10,10);
    ctx.font = "30px Arial";
    ctx.fillText(pointName, step*x,step*y);
}



var matrix = [[0,0,0,0,1],[1,0,0,1,1],[1,1,0,1,1], [1,0,0,0,1], [0,0,0,0,0]];


var getLines = function(){
    var array = [];

    for (var i = 0; i < matrix.length;i++){
        array.push([])
        for(var j = 0; j < matrix[i].length;j++){
            if(matrix[i][j] == 1) array[i].push(j);
        }
    }
    return array;
}

var arrayOfLineNodes = getLines();
console.log(arrayOfLineNodes)

for (var i = 0; i < matrix.length;i++){
    for(var j = 0; j < matrix[i].length;j++){
        if(matrix[i][j] == 1){ 
            //drawDot(i,j)
            
        //drawLine(i,j,j,)
    }
    }
}
var checkHamiltonianPath = function(){
    for (var i = 0; i < matrix.length;i++){
        for(var j = 0; j < matrix[i].length;j++){
            if(i == j && matrix[i][j] == 1) return true;
        }
    }
    return false;
}

console.log("checkHamiltonianPath", checkHamiltonianPath())
var radios = document.getElementsByName('inputType');

circle_r = 100;
circle_x = 250;
circle_y = 250;



var generateGraficPoints = function(){
    var points = [];
    for(var i = 0; i < matrix.length; i++){
        var alpha = 2 * Math.PI * Math.random()
    
    
        r = circle_r * Math.sqrt(Math.random())
        
        x = parseInt(r * Math.cos(alpha) + circle_x)
        y = parseInt(r * Math.sin(alpha) + circle_y)
        console.log(x,y)
        points.push({
            name: "x"+(i+1),
            x:x,
            y:y
        })
    //drawDot(x,y, "x"+(i+1))
    }
    return points;
}
var points = generateGraficPoints();
console.log(points)
for(var i = 0; i < points.length; i++){
    drawDot(points[i].x,points[i].y,points[i].name)
}
var getPointCoordonate = function(point){
    for (var i = 0; i< points.length; i++){
        if("x" + point == points[i].name) return{x:points[i].x, y: points[i].y}
    }
}


var drawLines = function(){
    var startPoint = 0;
    var stopPoint = 0;
    for(var i = 0; i < arrayOfLineNodes.length; i++){

        startPoint = getPointCoordonate(i+1);
        for(var j = 0; j < arrayOfLineNodes[i].length; j++){ 
            stopPoint = getPointCoordonate(arrayOfLineNodes[i][j]+1)
            drawLine(startPoint.x,startPoint.y,stopPoint.x,stopPoint.y)
        }
    }
}

drawLines();
console.log("point coord",getPointCoordonate(3))