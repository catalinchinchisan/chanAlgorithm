var step = 1;

//var canvas = $("#myCanvas")[0];
var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d");
var graficPoints = [];

function drawLine(ax,ay,bx,by) {
    var headlen = 10; 
    var dx = bx - ax;
    var dy = by - ay;
    var angle = Math.atan2(dy, dx);
    ctx.moveTo(step*ax, step*ay);
    ctx.lineTo(step*bx, step*by);
    ctx.lineTo(bx, by);
    ctx.lineTo(bx - headlen * Math.cos(angle - Math.PI / 6), by - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(bx, by);
    ctx.lineTo(bx - headlen * Math.cos(angle + Math.PI / 6), by - headlen * Math.sin(angle + Math.PI / 6));
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

var addManualPoints = true;
$('#myCanvas').click(function(e){
    if(addManualPoints){
        var x = e.clientX - $('#myCanvas').position().left, 
        y = e.clientY - $('#myCanvas').position().top;  
        console.log(x,y)
        if(graficPoints.length < matrix.length){
            graficPoints.push({
                name: "x"+(graficPoints.length+1),
                x:x,
                y:y
            });

            drawDot(x,y,"x"+(graficPoints.length))
            
        }
        if(graficPoints.length == matrix.length){
            console.log(graficPoints)
            drawLines()
        }
    }
    
})  


var generateGraficPoints = function(){
    circle_r = 100;
    circle_x = 250;
    circle_y = 250;
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
//var points = generateGraficPoints();

// for(var i = 0; i < points.length; i++){
//     drawDot(points[i].x,points[i].y,points[i].name)
// }
var getPointCoordonate = function(point){
    for (var i = 0; i< graficPoints.length; i++){
        if("x" + point == graficPoints[i].name) return{x:graficPoints[i].x, y: graficPoints[i].y}
    }
}


var drawLines = function(){
    var startPoint = 0;
    var stopPoint = 0;
    for(var i = 0; i < arrayOfLineNodes.length; i++){

        startPoint = getPointCoordonate(i+1);
        for(var j = 0; j < arrayOfLineNodes[i].length; j++){ 
            stopPoint = getPointCoordonate(arrayOfLineNodes[i][j]+1)
            if(startPoint && stopPoint) drawLine(startPoint.x,startPoint.y,stopPoint.x,stopPoint.y)
        }
    }
}

