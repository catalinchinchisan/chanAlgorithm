var step = 1;

//var canvas = $("#myCanvas")[0];
var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d");
var graficPoints = [];
var inputType = "1";
var arrayOfNodes = [];
$('#inputEx').html("Input example <br>0,0,0,0,1 <br>1,0,0,1,1 <br>1,1,0,1,1 <br>1,0,0,0,1 <br>0,0,0,0,0");
var showMessage = function(type, message){
    $('#dialogSpan').text(message);
};
var getInput = function(){
    showMessage("alert", "")
    var textareaVal = $("#textArea").val();
    var matrix = [];
    if(textareaVal == undefined || textareaVal == ""){
        showMessage("alert", "Input gol!");
    }else{
        if(inputType == "1"){
            matrix = textareaVal.split("\n");
            for(var i = matrix.length - 1; i >= 0; i--){
                matrix[i] = matrix[i].replace(/ /g, "");
                if(matrix[i] == ""){
                    matrix.splice(i,1);
                }else{

                    matrix[i] = matrix[i].split(",").map(function (x) { 
                        return parseInt(x); 
                    });
                }
            }
        }else if(inputType == "2"){
            textareaVal = textareaVal.replace(/\n/g, "");
            textareaVal = textareaVal.split(" ");
            var maxNode = 1;
            for(var i = textareaVal.length -1; i >= 0; i--){
                if(textareaVal[i]=="") textareaVal.splice(i,1);
                else{
                    textareaVal[i] = textareaVal[i].replace(/\(/g, "");
                    textareaVal[i] = textareaVal[i].replace(/\)/g, "");
                    textareaVal[i] = textareaVal[i].split(",");
                    textareaVal[i] = textareaVal[i].map(function (x) { 
                        return parseInt(x); 
                    });
                    if(textareaVal[i][0] > maxNode) maxNode = textareaVal[i][0];
                    if(textareaVal[i][1] > maxNode) maxNode = textareaVal[i][1];
                }
            }
            for(var i = 0; i < maxNode; i++) {
                matrix[i] = new Array(maxNode).fill(0);
            }

            for(var i = 0; i < textareaVal.length; i++) {
                matrix[textareaVal[i][0] - 1][textareaVal[i][1] -1] = 1;
            }
        } else if(inputType == "3"){
            var maxNode = 1;
            textareaVal = textareaVal.split("\n");
            //textareaVal = textareaVal.split(" ");
            for(var i = textareaVal.length -1; i >= 0; i--){
                textareaVal[i] = textareaVal[i].replace(/ /g, "");
                if(textareaVal[i]=="") textareaVal.splice(i,1);
                else{
                    textareaVal[i] = textareaVal[i].split("->");
                    textareaVal[i][0] = parseInt(textareaVal[i][0]);
                    textareaVal[i][1] = textareaVal[i][1].split(",");
                    textareaVal[i][1] = textareaVal[i][1].map(function (x) { 
                        return parseInt(x); 
                    });
                }
            }
            for(var i = 0; i < textareaVal.length; i++){
                if(textareaVal[i][0] > maxNode) maxNode = textareaVal[i][0];
                for (var j = 0; j < textareaVal[i][1].length; j++){
                    if(textareaVal[i][1][j] > maxNode) maxNode = textareaVal[i][1][j];
                }
            }
            for(var i = 0; i < maxNode; i++) {
                matrix[i] = new Array(maxNode).fill(0);
            }
            for(var i = 0; i < textareaVal.length; i++){
                for (var j = 0; j < textareaVal[i][1].length; j++){
                    matrix[textareaVal[i][0] - 1][textareaVal[i][1][j] -1] = 1;
                }
            }
        }
        if(matrix){
            return(matrix);
        }else{
            showMessage("alert", "unexpected error");
            return [];
        }
    }
   
};

var drawLine = function(ax,ay,bx,by,color) {
    if (color == "red") lineColor = '#ff0000';
    else lineColor =  "#000"
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
    ctx.strokeStyle = lineColor;
    ctx.stroke();
}


function drawDot(x,y, pointName) {
    ctx.fillRect(step*x,step*y,10,10);
    ctx.font = "30px Arial";
    ctx.fillText(pointName, step*x,step*y);
}



var matrix = [[0,0,0,0,1],[1,0,0,1,1],[1,1,0,1,1], [1,0,0,0,1], [0,0,0,0,0]];


var getLines = function(mat){
    var array = [];

    for (var i = 0; i < mat.length;i++){
        array.push([])
        for(var j = 0; j < mat[i].length;j++){
            if(mat[i][j] == 1) array[i].push(j);
        }
    }
    return array;
};


for (var i = 0; i < matrix.length;i++){
    for(var j = 0; j < matrix[i].length;j++){
        if(matrix[i][j] == 1){ 
            //drawDot(i,j)
            
        //drawLine(i,j,j,)
    }
    }
}


var addManualPoints = false;
$('#myCanvas').click(function(e){
    if(addManualPoints){
        var x = e.clientX - $('#myCanvas').position().left, 
        y = e.clientY - $('#myCanvas').position().top;
        if(graficPoints.length < matrix.length){
            graficPoints.push({
                name: "x"+(graficPoints.length+1),
                x:x,
                y:y
            });

            drawDot(x,y,"x"+(graficPoints.length));
            
        }
        if(graficPoints.length == matrix.length){
            drawLines(matrix);
            addManualPoints = false;
            showResult(matrix);
        }
    }
    
});


var generateGraficPoints = function(){
    circle_r = 100;
    circle_x = 250;
    circle_y = 250;
    var points = [];
    for(var i = 0; i < matrix.length; i++){
        var alpha = 2 * Math.PI * Math.random();
    
    
        r = circle_r * Math.sqrt(Math.random());
        
        x = parseInt(r * Math.cos(alpha) + circle_x);
        y = parseInt(r * Math.sin(alpha) + circle_y);
        points.push({
            name: "x"+(i+1),
            x:x,
            y:y
        });
    //drawDot(x,y, "x"+(i+1))
    }
    return points;
};

var addAutoPoints = function(){
    //var points = generateGraficPoints();

// for(var i = 0; i < points.length; i++){
//     drawDot(points[i].x,points[i].y,points[i].name)
// }
};

var getPointCoordonate = function(point){
    for (var i = 0; i< graficPoints.length; i++){
        if("x" + point == graficPoints[i].name) return{x:graficPoints[i].x, y: graficPoints[i].y};
    }
};


var drawLines = function(mat){
    var startPoint = 0;
    var stopPoint = 0;
    arrayOfNodes = getLines(mat);
    for(var i = 0; i < arrayOfNodes.length; i++){

        startPoint = getPointCoordonate(i+1);
        for(var j = 0; j < arrayOfNodes[i].length; j++){ 
            stopPoint = getPointCoordonate(arrayOfNodes[i][j]+1);
            if(startPoint && stopPoint) drawLine(startPoint.x,startPoint.y,stopPoint.x,stopPoint.y);
        }
    }
};

var matricePatratica = function(mat){
    for (var i = 0; i < mat.length; i++){
        if(mat[i].length != mat.length){
            
            return false;
        }
    }
    return true;
};

var circuite = function(mat){
    for (var i = 0; i < mat.length; i++){
        if(mat[i][i] == 1){
            
            return true;
        }
    }
    return false;
};

var startAlg = function(type){
    matrix = getInput();
    ctx.clearRect(0,0,canvas.clientWidth, canvas.height)
    if(matricePatratica(matrix)){
        if(circuite(matrix)){
            //$("#startAlg").css("visibility", "hidden");
            showMessage("alert", "Matricea are circuite!!")
        } else {
            arrayOfNodes = getLines(matrix);
            if(arrayOfNodes && arrayOfNodes.length > 0){
                //$("#startAlg").css("visibility", "visible");
                if(type == 'manual'){
                    graficPoints = [];
                    addManualPoints = true;

                }
                if(type == "auto"){
                    addManualPoints = false;
                    graficPoints = generateGraficPoints();
                    for(var i = 0; i < graficPoints.length; i++){
                        drawDot(graficPoints[i].x,graficPoints[i].y,graficPoints[i].name);
                    }
                    drawLines(graficPoints);
                    showResult(matrix);
                } 
                
            }else{

                //$("#startAlg").css("visibility", "hidden");
                showMessage("alert", "unexpected error")
            }
        }
    }else{

        //$("#startAlg").css("visibility", "hidden");
        showMessage("alert", "Matricea nu este patratica!!")
    }
};


var showResult = function(mat){
    var arrayOfNodes = getLines(matrix);
    var message = "";
    var nodeSum = 0;
    var nodesStringVal = "";
    var sortedPoints = [];
    for (var i = 0; i < arrayOfNodes.length; i++){
        if(i < arrayOfNodes.length - 1) ch = ", ";
        else ch = "<br>"
        message = message + "P(X" + (i + 1)+") =" + arrayOfNodes[i].length + ch;
        nodeSum = nodeSum + arrayOfNodes[i].length;
        nodesStringVal = nodesStringVal + arrayOfNodes[i].length + " + ";
        sortedPoints.push({
            x: i + 1,
            len: arrayOfNodes[i].length
        })
    }
    nodesStringVal = nodesStringVal.substring(0, nodesStringVal.length - 3);
    message = message + "<p><span>&Sigma;</span>P ( Xi ) = n(n - 1)/2</p><br>";
    message = message + "<p><span>&Sigma;</span>P ( Xi ) = "+ arrayOfNodes.length + "(" + arrayOfNodes.length + " - 1)/2</p><br>";
    message = message + nodesStringVal + " = "+ ((arrayOfNodes.length  * (arrayOfNodes.length - 1))/2)+"<br>";
    if(nodeSum == ((arrayOfNodes.length  * (arrayOfNodes.length - 1))/2)){// exista drum hamiltonian
        message = message + nodeSum + " = "+ ((arrayOfNodes.length  * (arrayOfNodes.length - 1))/2)+" => Exista drum hamiltonian<br>";
        sortedPoints.sort(function(a, b){return b.len - a.len;});
        var dh = "";
        for (var i = 0; i < sortedPoints.length; i++){
            if(i < arrayOfNodes.length - 1) ch = " > ";
            else ch = "<br>"
            message = message + "P(X" + (sortedPoints[i].x + 1)+")" + ch;
            dh = dh + "X" + (sortedPoints[i].x + 1) + " , ";
        }
        dh = dh.substring(0, dh.length - 3);
        message = message +"dH = " + dh;
        for (var i = 0; i < sortedPoints.length; i++){
            if(sortedPoints[i] != undefined && sortedPoints[i + 1] != undefined){
                startPoint = getPointCoordonate(sortedPoints[i].x);
            
                stopPoint = getPointCoordonate(sortedPoints[i + 1].x);
                if(startPoint && stopPoint){
                    drawLine(startPoint.x,startPoint.y,stopPoint.x,stopPoint.y, "red");
                }
            }
        }
    }else{
        message = message + nodeSum + " != "+ ((arrayOfNodes.length  * (arrayOfNodes.length - 1))/2)+" => Nu exista drum hamiltonian<br>"
        
    }
    $('#resultsMessage').html((message));
}
$('input[type=radio][name=inputType]').change(function() { 
    inputType = this.value;
    if(inputType == "1"){
        $('#inputEx').html(("Input example <br>0,0,0,0,1 <br>1,0,0,1,1 <br>1,1,0,1,1 <br>1,0,0,0,1 <br>0,0,0,0,0"));
    }
   if(inputType == "2"){
        $('#inputEx').html(("Input example <br>(1,5) (2,1) (2,4) (2,5) (3,1) (3,2) (3,4) (3,5) (4,1) (4,5)"));
    }
    if(inputType == "3"){
        $('#inputEx').html(("Input example <br>1->5<br>2->1,4,5 ..."));
    }
});

