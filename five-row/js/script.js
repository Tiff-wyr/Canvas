/**
 * Created by GFY on 2017/10/16.
 */
var OVER = false;
var me = true;
//赢法数组
var wins = [];
//赢法统计数组
var mywin = [];
var computer = [];
//棋盘数组
var chessBoard = [];
for(var i=0; i<15; i++){
    chessBoard[i] = [];
    for(var j=0; j<15; j++){
        chessBoard[i][j] = 0;
    }
}

//初始化wins
for(var i=0; i<15; i++){
    wins[i] = [];
    for(var j=0; j<15; j++){
        wins[i][j] = [];
    }
}
//赢法种类
var count = 0;
/*定义赢法数组*/
//横线赢法
for(var i=0; i<15; i++){
    for(var j=0; j<11; j++){
        for(var k=0; k<5; k++){
            wins[i][j+k][count] = true;
        }
        count++;
    }
}
//竖线赢法
for(var i=0; i<15; i++){
    for(var j=0; j<11; j++){
        for(var k=0; k<5; k++){
            wins[j+k][i][count] = true;
        }
        count++;
    }
}
//斜线赢法
for(var i=0; i<11; i++){
    for(var j=0; j<11; j++){
        for(var k=0; k<5; k++){
            wins[i+k][j+k][count] = true;
        }
        count++;
    }
}
//反斜线赢法
for(var i=0; i<11; i++){
    for(var j=14; j>3; j--){
        for(var k=0; k<5; k++){
            wins[i+k][j-k][count] = true;
        }
        count++;
    }
}
//初始化赢法统计数组
for (var i=0;  i<count; i++){
    mywin[i] = 0;
    computer[i] = 0;
}

var canvas = document.getElementById("chess");
var cContext = canvas.getContext("2d");
cContext.strokeStyle =  "#BFBFBF";

var logo = new Image();
logo.src="images/geng.png";
logo.onload = function () {
    cContext.drawImage(logo,0,0,450,450);
    drawChessBox();
}

//绘制棋盘
var drawChessBox = function(){
    for(var i=0; i<15; i++){
        cContext.moveTo(15+30*i , 15);
        cContext.lineTo(15+30*i, 435);
        cContext.stroke();
        cContext.moveTo(15 , 15+30*i);
        cContext.lineTo(435, 15+30*i);
        cContext.stroke();
    }
}

//绘制棋子
var drawChessPiecces = function(i , j , me){
    cContext.beginPath();
    cContext.arc(15+30*i, 15+30*j , 13, 0, 2*Math.PI);   //context画圆 （x坐标，y坐标，半径，起始角，结束角，规定应该逆时针还是顺时针绘图（False = 顺时针，true = 逆时针））
    cContext.closePath();
    var gradient = cContext.createRadialGradient(15+30*i +2, 15+30*j - 2 , 13,15+30*i +2, 15+30*j - 2 , 0);  //创建渐变色对象
    if(me){
        gradient.addColorStop(0,"#0A0A0A");         //填充渐变色
        gradient.addColorStop(1,"#636766");
    }else{
        gradient.addColorStop(0,"#D1D1D1");
        gradient.addColorStop(1,"#F9F9F9");
    }
    cContext.fillStyle = gradient;
    cContext.fill();
}

canvas.onclick = function (e) {
    if(OVER){
        return;
    }
    if(!me){
        return;
    }
    var i =Math.floor( e.offsetX/30);
    var j = Math.floor(e.offsetY/30);
    if(chessBoard[i][j] === 0){
        drawChessPiecces(i, j, me);
        chessBoard[i][j] = 1;
        for(var k=0; k<count; k++){
            if (wins[i][j][k]){
                mywin[k]++;
                computer[k] = 6;
                if(mywin[k]=== 5){
                    alert("YOU WIN!");
                    OVER = true;
                }
            }
        }
        if(!OVER){
            me = !me;
            ComputerIA();
        }
        /*if (me){
         chessBoard[i][j] = 1;
         me = false;
         }else {
         chessBoard[i][j] = 2;
         me = true;
         }*/
    }
};

var ComputerIA = function(){
    //用于存储人机得分方便以后比较哪个点更好
    var myScore = [];
    var computerScore = [];
    //用于比较更好的点
    var max = 0;
    var u=0, v=0;
    for(var i=0; i<15; i++){
        myScore[i] = [];
        computerScore[i] = [];
        for(var j=0; j<15; j++ ){
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    for(var i=0; i<15; i++){
        for(var j=0; j<15; j++){
            if (chessBoard[i][j] === 0){
                for(var k=0; k<count; k++){
                    if(wins[i][j][k]){
                        if(mywin[k] === 1){
                            myScore[i][j] += 200;
                        }else if(mywin[k] === 2){
                            myScore[i][j] += 400;
                        }else if (mywin[k] === 3){
                            myScore[i][j] += 1000;
                        }else if(mywin[k] === 4){
                            myScore[i][j] += 10000;
                        }
                        if(computer[k] === 1){
                            computerScore[i][j] += 220;
                        }else if(computer[k] === 2){
                            computerScore[i][j] += 420;
                        }else if (computer[k] === 3){
                            computerScore[i][j] += 5000;
                        }else if(computer[k] === 4){
                            computerScore[i][j] += 20000;
                        }
                    }
                }
                if (myScore[i][j] >max){
                    max = myScore[i][j];
                    u = i;
                    v = j;
                }else if(myScore[i][j] === max){
                    if(computerScore[i][j] > computerScore[u][v]){
                        u = i;
                        v = j;
                    }
                }
                if (computerScore[i][j] >max){
                    max = computerScore[i][j];
                    u = i;
                    v = j;
                }else if(computerScore[i][j] === max){
                    if(myScore[i][j] > myScore[u][v]){
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    drawChessPiecces(u, v, false);
    chessBoard[u][v] = 2;
    for(var k=0; k<count; k++){
        if (wins[u][v][k]){
            computer[k]++;
            console.log(k+"---"+mywin[k]);
            mywin[k] = 6;
            if(computer[k]=== 5){
                alert("COMPUTER WIN!");
                OVER = true;
            }
        }
    }
    if(!OVER){
        me = !me;
    }
}