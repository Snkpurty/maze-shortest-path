let gridContainer = document.getElementsByClassName('gridContainer');
for(let i = 0 ; i < 2100 ; i++)
{
    gridContainer[0].innerHTML += '<div class="block"></div>';
}
let block = document.getElementsByClassName('block');
let source = document.getElementsByClassName('source');
let dest = document.getElementsByClassName('dest');
let blocking = document.getElementsByClassName('blocking');
let start = document.getElementsByClassName('start');
let again = document.getElementsByClassName('again');
//source
source[0].onclick = function(){Source()};
let sourcePrev=-1;
function sourceFun(i)
{
    if(sourcePrev!=-1)
        block[sourcePrev].style.backgroundColor = "white";
    block[i].style.backgroundColor = "green";
    sourcePrev=i;
}
function Source(){
    for(let i=0;i<2100;i++)
    {
            block[i].onclick = function() {sourceFun(i)};
    }
}

//dest
dest[0].onclick = function(){Dest()};
let destPrev=-1;
function destFun(i)
{
    if(destPrev!=-1)
        block[destPrev].style.backgroundColor = "white";
    block[i].style.backgroundColor = "blue";
    destPrev=i;
}
function Dest(){
    for(let i=0;i<2100;i++)
    {
            block[i].onclick = function() {destFun(i)};
    }
}

//blocking
let blockingPrev=[];
let boolBlock=[];
for(let i=0;i<2100;i++)
{
    boolBlock.push(false);
}
blocking[0].onclick = function(){Blocking()};
function blockingFun(i)
{
    block[i].style.backgroundColor = "black";
    blockingPrev.push(i);
    boolBlock[i]=true;
}
function Blocking()
{
    for(let i=0;i<blockingPrev.length;i++)
    {
        block[blockingPrev[i]].style.backgroundColor = "white";
        boolBlock[blockingPrev[i]]=false;
    }
    blockingPrev.splice(0,blockingPrev.length);
    for(let i=0;i<2100;i++)
    {
        block[i].onclick = function(){blockingFun(i)};
    }
}

//start
start[0].onclick = function(){Start()};
function Start()
{
    if(sourcePrev==-1 || destPrev==-1)
        alert("select source and dest");
    else
        bfsFun(sourcePrev,destPrev);
}

async function bfsFun(sourcePrev,destPrev)
{
    let queue=[];
    let visited=[];
    let parent=[];
    let dist=[];
    for(let i=0;i<2100;i++)
    {
        parent.push(-1);
        dist.push(50000);
    }
    for(let i=0;i<2100;i++)
        visited.push(false);
    let val = sourcePrev;
    let col = 150;
    dist[sourcePrev]=0;
    visited[sourcePrev]=true;
    while(val!=destPrev)
    {
        console.log(val);
        ///promise
        let promise = new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve();
            }, 10);
        })
        await promise;
        ///promise
        if(val!=sourcePrev && val!=destPrev)
            block[val].style.backgroundColor = "pink";
            // "rgb(255,105,"+col+")";
            // col=col+10;

        //left
        if(val-1>=(Math.floor(val/70)*70) && !visited[val-1] && !boolBlock[val-1])
        {
            queue.push(val-1);
            visited[val-1] = true;
            if(dist[val-1]>dist[val]+1)
            {
                parent[val-1]=val;
                dist[val-1]=dist[val]+1;
            }
        }

        // top
        if(val-70>=0 && !visited[val-70] && !boolBlock[val-70])
        {
            queue.push(val-70);
            visited[val-70] = true;
            if(dist[val-70]>dist[val]+1)
            {
                parent[val-70]=val;
                dist[val-70]=dist[val]+1;
            }
        }

        // right
        if(val+1<((Math.floor(val/70)+1)*70) && !visited[val+1] && !boolBlock[val+1])
        {
            queue.push(val+1);
            visited[val+1] = true;
            if(dist[val+1]>dist[val]+1)
            {
                parent[val+1]=val;
                dist[val+1]=dist[val]+1;
            }
        }

        //bottom
        if(val+70<2100 && !visited[val+70] && !boolBlock[val+70])
        {
            queue.push(val+70);
            visited[val+70] = true;
            if(dist[val+70]>dist[val]+1)
            {
                parent[val+70]=val;
                dist[val+70]=dist[val]+1;
            }
        }

        //left-top
        if(val-71>=(Math.floor((val-70)/70)*70) && val-71>=0 && !visited[val-71] && !boolBlock[val-71])
        {
            queue.push(val-71);
            visited[val-71]=true;
           if(dist[val-71]>dist[val]+Math.sqrt(2))
           {
                parent[val-71]=val;
                dist[val-71]=dist[val]+Math.sqrt(2);
           }
        }

        // top-right
         if(val-69>Math.floor((val-69)/70)*70 && val-69>0 && !visited[val-69] && !boolBlock[val-69])
         {
             queue.push(val-69);
             visited[val-69]=true;
             if(dist[val-69]>dist[val]+Math.sqrt(2))
            {
                 parent[val-69]=val;
                 dist[val-69]=dist[val]+Math.sqrt(2);
            }
         }

         // right-bottom
        if(val+71<((Math.floor((val+71)/71)+1)*70) && val+71<2100 && !visited[val+71] && !boolBlock[val+71])
        {
            queue.push(val+71);
            visited[val+71]=true;
            if(dist[val+71]>dist[val]+Math.sqrt(2))
            {
                parent[val+71]=val;
                dist[val+71]=dist[val]+Math.sqrt(2);
            }
        }

        //bottom-right
        if(val+69!= (Math.floor((val+69)/69)*70)-1  && val+69<2099 && !visited[val+69] && !boolBlock[val+69])
        {
            queue.push(val+69);
            visited[val+69]=true;
           if(dist[val+69]>dist[val]+Math.sqrt(2))
            {
                parent[val+69]=val;
                dist[val+69]=dist[val]+Math.sqrt(2);
            }
        }
        val=queue.shift();
    }

    let path=[];
    let p=destPrev;
    path.push(p);
    while(parent[p]!=-1)
    {
        path.push(parent[p]);
        p=parent[p];
    }
    for(let i=path.length-1;i>=0;i--)
    {
        let promise = new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve();
        }, 50);
    })
    await promise;
    if(path[i]!=sourcePrev && path[i]!=destPrev)
        block[path[i]].style.backgroundColor = "greenyellow";
    }
    console.log(dist[destPrev]);
}
//again
function Again()
{
    sourcePrev=-1;
    destPrev=-1;
    for(let i=0;i<2100;i++)
    {
        boolBlock[i]=false;
        block[i].style.backgroundColor = "white";
    }
}
again[0].onclick = function(){Again()};
