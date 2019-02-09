var c = document.getElementById("canvo");   
var ctx = c.getContext("2d");  // to set animation to render
var score;
var msg;
var base = 280;   // define disk base ..
var discheight = 10;     // define disk height
var discwidth = 80; 	// define disk width
var bar1=[];			//used to store disks
var bar2=[];
var bar3=[];
var srctrgt = [2];		// array of length 2 used to store , mouse bar selected and targeted bar
srctrgt[0] = null;		// store src bar clicked
srctrgt[1] = null;		// store target bar clicked
var popelement;			// element that will be poped and pushed
var noofdisc = 4;		// number of disks, defined static
var moves=0;			// moves taken


ctx.font = "30px Arial";
ctx.strokeText("Tower of Hanoi",10,50);

//-------------  drawdisc function is written in the variable --------------


// add action listener to canvas element, gettarget is function to invoke, boolean value to invoke the function

c.addEventListener('mousedown', gettarget, true);

var modal = document.getElementById('myModal');

var endscreen = document.getElementById('myModal1');

var close = document.getElementById("close");

var tryagain = document.getElementById("try");

/*  ----------- for hidding model ---------*/ 

modal.style.display = "block";

endscreen.style.display = "none";


/*  ----------- describing disks ---------*/ 

var disc1 = {x:c.width/4-110,y:base-10,width:discwidth,height:discheight,disknum:1,drawdisc: function(){ ctx.beginPath(); ctx.rect(this.x,this.y,this.width,this.height); ctx.fillStyle = 'green'; ctx.fill(); }};

var disc2 = {x:c.width/4-100,y:base-20,width:discwidth-20,height:discheight,disknum:2,drawdisc: function(){ ctx.beginPath(); ctx.rect(this.x,this.y,this.width,this.height); ctx.fillStyle = 'yellow'; ctx.fill(); }};

var disc3 = {x:c.width/4-90,y:base-30,width:discwidth-40,height:discheight,disknum:3,drawdisc: function(){ ctx.beginPath(); ctx.rect(this.x,this.y,this.width,this.height); ctx.fillStyle = 'red'; ctx.fill(); }};

var disc4 = {x:c.width/4-80,y:base-40,width:discwidth-60,height:discheight,disknum:4,drawdisc: function(){ ctx.beginPath(); ctx.rect(this.x,this.y,this.width,this.height); ctx.fillStyle = 'orange'; ctx.fill(); }};


/*  ----------- for drawing black bars ---------*/ 

function drawbars()
{
	ctx.clearRect(0,0,c.width,c.height);
	ctx.fillStyle = 'black';
	
	ctx.beginPath();
	ctx.rect(100, 180, 10, 100);  //vertical bar
	ctx.fill();

	ctx.beginPath();
	ctx.rect(300, 180, 10, 100);    //vertical bar
	ctx.fill();

	ctx.beginPath();
	ctx.rect(500, 180, 10, 100);    //vertical bar
	ctx.fill();

	ctx.beginPath();
	ctx.rect(20, 280, 600, 10);     //horizontal bar
	ctx.fill();
//ctx.stroke();
}

close.onclick = function()
{
	modal.style.display = "none";
}

tryagain.onclick = function()
{
	reset();
	endscreen.style.display = "none";
}



/*  ------------------ for drawing disks, default they rest on first bar

bar 1,2,3 represents the black bars. used to push and pop disks
 ---------------*/
function drawlayout()
{
	drawbars();
	bar1=[];
	bar2=[];
	bar3=[];

	disc1.x = c.width/4-110;
	disc1.y = base-10;

	disc2.x = c.width/4-100;
	disc2.y = base-20;

	disc3.x = c.width/4-90;
	disc3.y = base-30;

	disc4.x = c.width/4-80;
	disc4.y = base-40;

	bar1=[disc1,disc2,disc3,disc4];

	for(var i=0;i<bar1.length;i++)
 	{
 		bar1[i].drawdisc();
 	}
}

/*------------ function for animation --------------------*/

function animatedisc(elem,target)
{
	//console.log(elem);
	//console.log(target);
}


/* --------------- function to check if the mouse is clicked on the bar only -------------------*/

function gettarget(evt)
{    
	// -------- if clicked on first bar ----------------------------
    if((evt.clientX >= 400 && evt.clientX <= 410) && (evt.clientY >= 260 && evt.clientY <= 360))
    {
		// -------- evt.button gives mouse button (click, left right , middle) etc ----------------------------
     	if(evt.button == 0)
     	{
     		srctrgt[0] = 1;
     	}
     	else if(evt.button == 2)
     	{
     		srctrgt[1] = 1;
     		movethedisc(srctrgt);
     	}
    }
		// -------- if clicked on first bar ----------------------------
    else if((evt.clientX >= 600 && evt.clientX <= 610) && (evt.clientY >= 260 && evt.clientY <= 360))
    {
     	if(evt.button == 0)
     	{
     		srctrgt[0] = 2;
     	}
     	else if(evt.button == 2)
     	{
     		srctrgt[1] = 2;
     		movethedisc(srctrgt);
     	}
    }
		// -------- if clicked on first bar ----------------------------
    else if((evt.clientX >= 800 && evt.clientX <= 810) && (evt.clientY >= 260 && evt.clientY <= 360))
    {
     	if(evt.button == 0)
     	{
     		srctrgt[0] = 3;
     	}
     	else if(evt.button == 2)
     	{
     		srctrgt[1] = 3;
     		movethedisc(srctrgt);
     	}
    }
}


	// -------- calculate score, display message ----------------------------
function checkgame(nosofmoves)
{
	console.log("---------------------------------"+nosofmoves);
	var minmoves = Math.pow(2,noofdisc) - 1;
	var color ;

	if(bar2.length == noofdisc)
	    {
			score = 100*(minmoves/nosofmoves);
			if(score == 100)
			{
				msg = "Excellent!!! <p>You have completed the game in minimum number of moves</p>";
				color = "green";
			}
			else if(score >= 80 && score <99)
			{
				msg = "Good job";
				color = "yellow";
			}
			else if(score >= 60 && score <=80)
			{
				msg = "Fine job";
				color = "orange";
			}
			else
			{
				msg = "You can do better !!!!";
				color = "red";
			}

		endscreen.style.display = "block";
        document.getElementById("msg").innerHTML = msg;
		document.getElementById("msg").style.color = color;
        document.getElementById("endscore").innerHTML = "Your efficiency is " + score;
    	document.getElementById("endmoves").innerHTML = "Moves taken " + nosofmoves;
		}
}

// ----------- reset the game

function reset()
{
	moves = 0;
	scoreobj = {score:0,move:0,msg:""};
	ctx.clearRect(0,0,c.width,c.height);
	//console.log("in reset function");
	drawlayout();
	document.getElementById("move").innerHTML= moves;
}


// ----------- pushes and pops disks and repaints animation
function movethedisc(srcntarget)
{
	console.log(srcntarget);
	if((srcntarget[0] != null || srcntarget[0] != undefined) && (srcntarget[1] != null || srcntarget[1] != undefined))
	{
	 	//popelement = bar[0].pop();
	 	if(srcntarget[0] === srcntarget[1])
	 	{
	 		event.preventDefault();
	 	}
	 	else
	 	{
	 		// --------------------------- for bar1 ------------------------------------
	 		if(srcntarget[0] == 1)  // source is bar1 
	 		{			
	 			//ctx.clearRect(popelement.x,popelement.y,popelement.width,popelement.height);

	 			// target is bar1
	 			if(srcntarget[1] == 1)  //if source and target is bar1
	 			{
	 				event.preventDefault();
	 			}
	 			else if(srcntarget[1] == 2)  //if source is bar 1 and target is bar2
	 			{
					if(bar1.length == 0)
					{
						event.preventDefault();
					}
					else 
					{	 				
						if(bar2.length == 0)
						{
							popelement = bar1.pop();
	 						animatedisc(popelement,srcntarget);
	 						bar2.push(popelement);
	 						moves = moves+1;
	 						ctx.clearRect(0,0,c.width,c.height);
	 						renderframe(popelement,srcntarget);
	 						document.getElementById("move").innerHTML= moves;
	 						checkgame(moves);
	 					}
						else if(bar2[bar2.length-1].disknum < bar1[bar1.length-1].disknum)	
						{
							popelement = bar1.pop();
	 						animatedisc(popelement,srcntarget);
	 						bar2.push(popelement);
	 						moves = moves+1;
	 						ctx.clearRect(0,0,c.width,c.height);
	 						renderframe(popelement,srcntarget);
	 						document.getElementById("move").innerHTML= moves;
	 						checkgame(moves);
						}
						else
						{
							event.preventDefault();
						}
	 				}
	 			}
	 			else if(srcntarget[1] == 3)  //if source is bar 1 and target is bar3
	 			{
	 				if(bar1.length == 0)
					{
						event.preventDefault();
					}
					else
					{
	 					if(bar3.length == 0)
						{
							popelement = bar1.pop();
	 						animatedisc(popelement,srcntarget);
	 						bar3.push(popelement);
	 						moves = moves+1;
	 						ctx.clearRect(0,0,c.width,c.height);
	 						renderframe(popelement,srcntarget);
	 						document.getElementById("move").innerHTML= moves;
	 						checkgame(moves);
						}
						else if(bar3[bar3.length-1].disknum < bar1[bar1.length-1].disknum)	
						{
							popelement = bar1.pop();
	 						animatedisc(popelement,srcntarget);
	 						bar3.push(popelement);
	 						moves = moves+1;
	 						ctx.clearRect(0,0,c.width,c.height);
	 						renderframe(popelement,srcntarget);
	 						document.getElementById("move").innerHTML= moves;
	 						checkgame(moves);
						}
						else
						{
							event.preventDefault();
						}
	 				}
	 			}
	 		}

	 		// --------------------------- for bar2 ------------------------------------

	 		// if source is bar2
	 		else if(srcntarget[0] == 2)
	 		{
	 			if(srcntarget[1] == 1) //if source is bar 2 and target is bar1
	 			{
	 				if(bar2.length == 0)
					{
						event.preventDefault();
					}
					else
					{	 				
	 					if(bar1.length == 0)
						{
							popelement = bar2.pop();
	 						animatedisc(popelement,srcntarget);
	 						bar1.push(popelement);
	 						moves = moves+1;
	 						ctx.clearRect(0,0,c.width,c.height);
	 						renderframe(popelement,srcntarget);
	 						document.getElementById("move").innerHTML= moves;
	 						checkgame(moves);
						}
						else if(bar1[bar1.length-1].disknum < bar2[bar2.length-1].disknum)	
						{
							popelement = bar2.pop();
	 						animatedisc(popelement,srcntarget);
	 						bar1.push(popelement);
	 						moves = moves+1;
	 						ctx.clearRect(0,0,c.width,c.height);
	 						renderframe(popelement,srcntarget);
	 						document.getElementById("move").innerHTML= moves;
	 						checkgame(moves);
						}
						else
						{
							event.preventDefault();
						}				
	 				}
	 			}
	 			else if(srcntarget[1] == 2)  // if source and target is bar2
	 			{
	 				event.preventDefault();
	 			}
	 			else if(srcntarget[1] == 3)  //if source is bar 2 and target is bar3
	 			{
	 				if(bar2.length == 0)
					{
						event.preventDefault();
					}
					else
					{	
	 					if(bar3.length == 0)
						{
							popelement = bar2.pop();
	 						animatedisc(popelement,srcntarget);
	 						bar3.push(popelement);
	 						moves = moves+1;
	 						ctx.clearRect(0,0,c.width,c.height);
	 						renderframe(popelement,srcntarget);
	 						document.getElementById("move").innerHTML= moves;
	 						checkgame(moves);
						}
						else if(bar3[bar3.length-1].disknum < bar2[bar2.length-1].disknum)	
						{
							popelement = bar2.pop();
	 						animatedisc(popelement,srcntarget);
	 						bar3.push(popelement);
	 						moves = moves+1;
	 						ctx.clearRect(0,0,c.width,c.height);
	 						renderframe(popelement,srcntarget);
	 						document.getElementById("move").innerHTML= moves;
	 						checkgame(moves);
						}
						else
						{
							event.preventDefault();
						}
	 				}
	 			}
	 		}

	 		// --------------------------- for bar3 ------------------------------------
	 		//if source is bar3
	 		else if(srcntarget[0] == 3)
	 		{	
	 			if(srcntarget[1] == 1)   //if source is bar3 and target is bar1
	 			{
	 				if(bar3.length == 0)
					{
						event.preventDefault();
					}
					else
					{	 			
	 					if(bar1.length == 0)
						{
							popelement = bar3.pop();
	 						animatedisc(popelement,srcntarget);
	 						bar1.push(popelement);
	 						moves = moves + 1;
	 						ctx.clearRect(0,0,c.width,c.height);
	 						renderframe(popelement,srcntarget);
	 						document.getElementById("move").innerHTML= moves;
	 						checkgame(moves);
						}
						else if(bar1[bar1.length-1].disknum < bar3[bar3.length-1].disknum)	
						{
							popelement = bar3.pop();
	 						animatedisc(popelement,srcntarget);
	 						bar1.push(popelement);
	 						moves = moves+1;
	 						ctx.clearRect(0,0,c.width,c.height);
	 						renderframe(popelement,srcntarget);
	 						document.getElementById("move").innerHTML= moves;
	 						checkgame(moves);
						}
						else
						{
							event.preventDefault();
						}
	 				}
	 			}
	 			else if(srcntarget[1] == 2)  //if source is bar3 and target is bar2
	 			{
	 				if(bar3.length == 0)
					{
						event.preventDefault();
					}
					else
					{	 				
	 					if(bar2.length == 0)
						{
							popelement = bar3.pop();
	 						animatedisc(popelement,srcntarget);
	 						bar2.push(popelement);
	 						moves = moves+1;
	 						ctx.clearRect(0,0,c.width,c.height);
	 						renderframe(popelement,srcntarget);
	 						document.getElementById("move").innerHTML= moves;
	 						checkgame(moves);
						}
						else if(bar2[bar2.length-1].disknum < bar3[bar3.length-1].disknum)	
						{
							popelement = bar3.pop();
	 						animatedisc(popelement,srcntarget);
	 						bar2.push(popelement);
	 						moves = moves+1;
	 						ctx.clearRect(0,0,c.width,c.height);
	 						renderframe(popelement,srcntarget);
	 						document.getElementById("move").innerHTML= moves;
	 						checkgame(moves);
						}
						else
						{
							event.preventDefault();
						}
	 				}
	 			}
	 			else if(srcntarget[1] == 3)  //if source and target is bar3
	 			{
	 				event.preventDefault();
	 			}
	 		}

	 		// ctx.clearRect(0,0,c.width,c.height);
	 		
	 		// renderframe(popelement,srcntarget);

	 		// document.getElementById("move").innerHTML= moves;
	 	}
	}
	 else
	{
	 	event.preventDefault();
	}
}


//  -----  draw the disks after they are pushed to array

function drawdiscs()
{
	srctrgt = [];

	if(bar1.length != 0)
	{
		for(var i =0; i < bar1.length; i++)
		{
			bar1[i].drawdisc();
		}
	}
	if(bar2.length !=0)
	{
		for(var i =0; i < bar2.length; i++)
		{
			bar2[i].drawdisc();
		}
	}
	if(bar3.length != 0)
	{
		for(var i =0; i < bar3.length; i++)
		{
			bar3[i].drawdisc();
		}
	}
}


// ----- function to calculate and set the co-ordinates of disks depending upon the placement of bars
function renderframe(elem,target)
{
	console.log("elem-------------"+JSON.stringify(elem)+"target---------------------"+target);
	if(target.length !=0 && elem.length != 0)
	{
		/* -------------- for bar1 ----------------*/

		if(target[1] == 1 && elem.disknum == 1)  // check target and disk, disknum used to determine, here disk is green
		{
			elem.x = c.width/4-110;                    // calculate width
			elem.y = base - (10*(bar1.length));			// calculate base depending upon the disks in tower, which it is about to rest
		}
		else if(target[1] == 1 && elem.disknum == 2)
		{
			elem.x = c.width/4-100;
			elem.y = base - (10*(bar1.length));
		}
		else if(target[1] == 1 && elem.disknum == 3)
		{
			elem.x = c.width/4-90;
			elem.y = base - (10*(bar1.length));
		}
		else if(target[1] == 1 && elem.disknum == 4)
		{
			elem.x = c.width/4-80;
			elem.y = base - (10*(bar1.length));
		}

		/* -------------- for bar2 ----------------*/

 		else if(target[1] == 2 && elem.disknum == 1)
 		{
			elem.x = c.width/2-85;
			elem.y = base - (10*(bar2.length));
		}
		else if(target[1] == 2 && elem.disknum == 2)
 		{
			elem.x = c.width/2-75;
			elem.y = base - (10*(bar2.length));
		}
		else if(target[1] == 2 && elem.disknum == 3)
 		{
			elem.x = c.width/2-65;
			elem.y = base - (10*(bar2.length));
		}
		else if(target[1] == 2 && elem.disknum == 4)
 		{
			elem.x = c.width/2-55;
			elem.y = base - (10*(bar2.length));
		}

		/* -------------- for bar3 ----------------*/

 		else if(target[1] == 3 && elem.disknum == 1)
		{
			elem.x = c.width/2+115;
			elem.y = base - (10*(bar3.length));
		}
		else if(target[1] == 3 && elem.disknum == 2)
		{
			elem.x = c.width/2+125;
			elem.y = base - (10*(bar3.length));
		}
		else if(target[1] == 3 && elem.disknum == 3)
		{
			elem.x = c.width/2+135;
			elem.y = base - (10*(bar3.length));
		}	
		else if(target[1] == 3 && elem.disknum == 4)
		{
			elem.x = c.width/2+145;
			elem.y = base - (10*(bar3.length));
		}
		drawbars();
		drawdiscs();
	}
	else
	{
		event.preventDefault();
	}
}

drawlayout();