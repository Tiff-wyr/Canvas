let canvas = document.getElementById("chess")
let ctx = canvas.getContext('2d')
let num = 30
let wins=[]
let mywin = [];
let computer = [];

for(let i=0;i<15;i++){
    wins[i] = []
    for (let j=0;j<15;j++){
       wins[i][j]=[]
    }
}

//赢法种类
let count = 0
//横线赢法
for (let i=0;i<15;i++){
    for (let j=0;j<11;j++){
        for (let k=0;k<5;k++){
            wins[i][j+k][count]=true
        }
        count+=1
    }

}

//竖线赢法
for(let i=0;i<15;i++){
    for(let j=0;j<11;j++){
        for (let k=0;k<5;k++){
            wins[j+k][i][count]=true
        }
        count+=1
    }
}
//斜线赢法
for (let i=0;i<11;i++){
    for (let j=14;j>3;j--){
        for (let k=0;k<5;k++){
            wins[i+k][j-k][count]=true
        }
        count+=1
    }
}
//反斜线赢法
for(let i=0; i<11; i++){
    for(let j=0; j<11; j++){
        for(let k=0; k<5; k++){
            wins[i+k][j+k][count] = true;
        }
        count++;
    }
}

for (let i=0;  i<count; i++){
    mywin[i] = 0;
    computer[i] = 0;
}

var img = new Image();
img.src = "images/geng.png";
img.onload = function() {
    ctx.drawImage(img,15,15,435,435);
    drawLine()

}
let drawLine=function () {
    for (let i = 0; i < 15; i++) {
        ctx.beginPath()
        ctx.moveTo(15, 15+num*i)
        ctx.lineTo(435, 15+num*i)
        ctx.stroke()
    }
    for (let j = 0; j < 15; j++) {
        ctx.beginPath()
        ctx.moveTo(15+num*j,15)
        ctx.lineTo(15+num*j,435)
        ctx.stroke()
    }
}
//绘制黑球
let drawBlack=function (x,y) {
    ctx.beginPath()
    let color=ctx.createRadialGradient(15+30*x,15+30*y,0,15+30*x,15+30*y,10)
    color.addColorStop(0,"#fff")
    color.addColorStop(1,"#000")
    ctx.arc(15+30*x,15+30*y,10,0,2*Math.PI)
    ctx.fillStyle=color
    ctx.fill()
}
//绘制白球
let drawWhite=function () {
    ctx.beginPath()
    let color=ctx.createRadialGradient(75,15,0,75,15,10)
    color.addColorStop(0,"#fff")
    color.addColorStop(1,"#ccc")
    ctx.arc(75,15,10,0,2*Math.PI)
    ctx.fillStyle=color
    ctx.fill()
}
canvas.onclick=function (e) {
    let locaX=e.offsetX;
    let locaY=e.offsetY;
    let i=Math.floor(locaX/30)
    let j=Math.floor(locaY/30)
    drawBlack(i,j)

    for(let k=0; k<count; k++){
        if (wins[i][j][k]){
            mywin[k]++;
            computer[k] = 6;
            if(mywin[k]=== 5){
                alert("YOU WIN!");
            }
        }
    }
    drawWhite()
}

