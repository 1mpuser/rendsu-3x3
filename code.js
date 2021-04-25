"use strict"
let arrayOfWinSituations=[
    [0,1,2],
    [3,4,5], 
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let cells=document.getElementsByClassName('cell');
let pMove=document.getElementById('move');
let XWinsStat=document.getElementById('XWinsStat');
let zeroWinsStat=document.getElementById('zeroWinsStat');
let drawStat=document.getElementById('drawStat');
let start;
XMove();

function isCellsFull(){
    let flag=true;
    for (let i=0;i<cells.length;i++){
        if(cells[i].innerHTML=='') flag=false;
    }
    return flag;
}
function checkWin(){
    let arrayOfXPicks=[];
    let x=0;
    let arrayOfZeroPicks=[];
    let y=0;
    for(let i=0;i<cells.length;i++){
        if (cells[i].innerHTML=='x') {arrayOfXPicks[x]=cells[i].getAttribute('data-id');
        x++;}
    }
    for(let i=0;i<cells.length;i++){
        if (cells[i].innerHTML!='x'&&cells[i].innerHTML!='') {arrayOfZeroPicks[y]=cells[i].getAttribute('data-id');
        y++;}
    }
    for(let i=0;i<arrayOfWinSituations.length;i++){
        if(isLowerArrInBiggerArr(arrayOfWinSituations[i],arrayOfXPicks)){ 
            XWins();
            return true;}
            if (isLowerArrInBiggerArr(arrayOfWinSituations[i],arrayOfZeroPicks)){
                ZeroWins();
                return true;}// надо было сравнить в одном цикле
    }
}

function XWins(){
    pMove.innerText='Выиграл: X';
    for (let i=0; i<cells.length; i++){
        cells[i].removeEventListener('click', XClick);
    }
    let arr=XWinsStat.innerText.split('');
    arr[arr.length-1]++;
    arr[8]="<b>x</b>";
    XWinsStat.innerHTML=arr.join('');
    start='x';
}
function ZeroWins(){
    pMove.innerText='Выиграл: 0';
    for (let i=0; i<cells.length; i++){
        cells[i].removeEventListener('click', ZeroClick);
    }
    let arr=zeroWinsStat.innerText.split('');
    arr[arr.length-1]++;
    arr[8]="<b>0</b>";
    zeroWinsStat.innerHTML=arr.join('');
    start='zero';
}

function Draw(){
    for (let i=0; i<cells.length; i++){
        cells[i].removeEventListener('click', ZeroClick);
        cells[i].removeEventListener('click', XClick);
    }
    pMove.innerText='Ничья';
    let arr=drawStat.innerText.split('')
    arr[arr.length-1]=+arr[arr.length-1]+1;
    drawStat.innerHTML=arr.join('');    
}
function XClick(){
    if(this.innerText==''){this.innerHTML='x';
    ZeroMove();}
}
function ZeroClick(){
    if(this.innerText==''){this.innerHTML=0;
    XMove();}
}

function XMove(){
    if (checkWin()) return; 
    if (isCellsFull()){
        Draw();
        return;
    }
    for(let i=0;i<cells.length;i++){
        cells[i].removeEventListener('click',ZeroClick);
        cells[i].addEventListener('click',XClick);
    }
    pMove.innerText='Ходит: X...';

}
function ZeroMove(){
    if (checkWin()) return;
    if (isCellsFull()){
        Draw();
        return;
    }
    for(let i=0;i<cells.length;i++){
        cells[i].removeEventListener('click',XClick);
        cells[i].addEventListener('click',ZeroClick);
    }
    pMove.innerText='Ходит: 0...';   
}
function restart(){
    for (let i=0;i<cells.length;i++){
        cells[i].innerHTML='';
    }
    if(start=='zero'){
        start='x';
        XMove();
    }
    else{
    start='zero';
    ZeroMove();
    }
}

function isLowerArrInBiggerArr(arr1,arr2){// теперь это точно работает
    let overall=0;
    for(let i=0;i<arr1.length;i++){
        for(let j=0;j<arr2.length;j++){
            if(arr1[i]==arr2[j]) overall++;
        }
    }
    if (overall==arr1.length) return true;
    else return false;
}