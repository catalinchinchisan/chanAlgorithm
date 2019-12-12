var step = 100;

var canvas = $("#myCanvas")[0];

var ctx = canvas.getContext("2d");


function drawLine(ax,ay,bx,by) {
    ctx.moveTo(step*ax, step*ay);
    ctx.lineTo(step*bx, step*by);
    ctx.stroke();
}


function drawDot(x,y) {
    ctx.fillRect(step*x,step*y,10,10);
    ctx.font = "30px Arial";
    ctx.fillText("x"+y, step*x,step*y);
}
drawDot(50,50)



var matrix = [[0,0,0,0,1],[1,0,0,1,1],[1,1,0,1,1], [1,0,0,0,1], [0,0,0,0,0]];


for (var i = 0; i < matrix.length;i++){
    for(var j = 0; j < matrix[i].length;j++){
        console.log(matrix[i][j])
        if(matrix[i][j] == 1){ 
            drawDot(i,j)
            
        drawLine(i,j,j,)
    }
    }
}

var radios = document.getElementsByName('inputType');


radios.change(function() {
  console.log(radios.value)
});

console.log(radios[i].value);