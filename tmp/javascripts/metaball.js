//<![CDATA[ 
$(document).ready(function(){


var canvas = document.getElementById("metaball"),
    ctx = canvas.getContext("2d"),
    tempCanvas = document.createElement("canvas"),
    tempCtx = tempCanvas.getContext("2d"),
    width = 680,
    height = 680,
    threshold = 200,
    colors = {r:0,g:0,b:0}, cycle = 0,
    points = [];

canvas.width = tempCanvas.width = width;
canvas.height= tempCanvas.height= height;

//создаём шары и пушим
for(var i = 0; i < 3; i++){
    var x = Math.random()*600+40,
        y = Math.random()*600+40,
        vx = (Math.random()*8)-4,
        vy = (Math.random()*8)-4,
        size = 90,
        destinationx = Math.random() *600+40,
        destinationy = Math.random() *600+40,
        vectorx = 85,
        vectory = 85;
    var newx, newy;
    points.push({x:x,y:y,vx:vx,vy:vy, size:size, destinationx:destinationx, destinationy:destinationy,vectorx:vectorx, vectory:vectory});
                       
};


function update(){
    var len = points.length;
    tempCtx.clearRect(0,0,width,height);
    while(len--){
        var point = points[len];

        point.vectorx = point.destinationx - point.x,
        point.vectory = point.destinationy - point.y;

        point.x += point.vectorx/120;
        point.y += point.vectory/120;

        if (point.vectorx < 10  && point.vectory < 10) {
          point.destinationx = Math.random() *600+40;
          point.destinationy = Math.random() *600+40;
        };




        //прорисовка массива шаров
        tempCtx.beginPath();
        var grad = tempCtx.createRadialGradient(point.x, point.y, 20*2, point.x, point.y, point.size*2);
        grad.addColorStop(0, 'rgba(0,0,0,5)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        tempCtx.fillStyle = grad;
        tempCtx.arc(point.x, point.y, point.size*2, 0, Math.PI*2);
        tempCtx.fill();
    }
    //создаю центральный шар
    var grad = tempCtx.createRadialGradient(340, 340,80*2, 340, 340, 200*2);
        grad.addColorStop(0, 'rgba(0,0,0,1)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        tempCtx.fillStyle = grad;
        tempCtx.arc(340, 340, 200*2, 0, Math.PI*2);
        tempCtx.fill();
    metabalize();
    setTimeout(update,10);
}



function metabalize(){
    var imageData = tempCtx.getImageData(0,0,width,height),
        pix = imageData.data;
    
    for (var i = 0, n = pix.length; i <n; i += 4) {
        if(pix[i+3]<threshold){
           pix[i+3]/=6;
            if(pix[i+3]>threshold/4){
                pix[i+3]=0;
            }
        }
    }
    for (var i = 0, n = pix.length; i <n; i += 4) {
        if(pix[i+3]<235){
           pix[i+3]/=200;
            if(pix[i+3]>230/4){
                pix[i+3]=200;
            }
        }
    }
    ctx.putImageData(imageData, 0, 0);    
}

update();
});
// =(
//]]>  
;
