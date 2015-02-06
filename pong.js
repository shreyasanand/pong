function initialize() {

    // Initial position of the ball
    xPos = 0;
    yPos = -50;
    
    xvel = 10;
    yvel = 7;

    // Initial speed of the ball (slow)
    timer = 25;
    
    score = 0;
    
    // Initialize the sounds
    wallSound = new Audio("resources/wall.mp3");
    paddleSound = new Audio("resources/paddle.mp3");
    loseSound = new Audio("resources/lose.mp3");
}


// Function to call when the ball misses the paddle. 
// It increments the score, displays the score, resets the speed to slow and brings back the ball to a random position on left side of the court
function restart() {
	score = score+1;
	document.getElementById("message").innerHTML = score;
	alert("You lose! Computer Score: "+score);
	setSpeed(0);   
	xPos = 0;
	yPos = Math.floor((Math.random()*400)+1);
	ball.style.left = xPos;
    ball.style.top = yPos;
    clearTimeout(setTimer);
    document.getElementById("level1").checked = true;
}

// Function to move the paddle along the y-axis with the movement of the mouse
function movePaddle(x)
{
	// Get the y coordinate of the mouse to a variable
	var y = x.clientY;
	
	// If the y coordinate of the mouse moves above the game boundary set the variable to the starting of the game boundary
	if (y < 50){
		y = 0;
	}
	
	// Else if the y coordinate of the mouse moves below the game boundary set the variable to the ending of the game boundary
	else if(y > 380){
		y = 380;
	}
	
	// Adjusting the mouse pointer to the paddle top
	else{
	y = y - 50;
	}
	
	// Set the position of the paddle to the mouses' y coordinate
	document.getElementById("paddle").style.top= y + 'px';
	}

// Setting the speed of the ball movement by setting the timer value to be used with the settimeout function
function setSpeed(x) {
	if(x == 0){
		timer = 25;
	}
	else if(x==1){
		timer = 13;
	}
	else if(x==2){
		timer = 8;
	}
}


// Resetting the score counter back to 0. Called when the reset button is clicked
function resetCounter() {
	document.getElementById("message").innerHTML = 0;
	score = 0;
}

// Function called to start the ball movement. Onclick inside the court
function startGame(event) {
	moveball();	
}


// Clearing the timer and calling the moveball function
function move() {
	clearTimeout(setTimer);
	moveball();
}



function moveball() {
		
	// call the move function which inturn clears the setTimeout value and calls the moveball function
	setTimer = setTimeout('move()', timer);
	
	xPos = xPos + xvel;
    yPos = yPos + yvel;
	   
    ball.style.left = xPos;
    ball.style.top = yPos;
    
    // Boundary logic
    
    // Mirror the y coordinate when the ball crosses the court at the top and bottom
    if ((yPos < -60) || (yPos > 370)) {
        yvel= -1*yvel;
        wallSound.play();
    }
    
    // Mirror the x coordinate when the ball crosses the court at the left and right
    if ((xPos < 0 ) || (xPos > 1050)){
        
    	// If the ball crosses the court boundary call restart
    	if(xPos > 1050){
            loseSound.play();
    		restart();
    	}
    	
    	xvel= -1*xvel;
    } 
    
    // Checking if the ball position crosses the paddle position
    if (xPos > 1000)  {
    	// get the y coordinate of the ball
    	var py = parseInt(yPos,10);
    	py = py - 5;
    	
    	// get the top value of the paddle
    	var paddleTop = parseInt(paddle.style.top);
    	paddleTop = paddleTop - 100;
    	
    	// set the bottom value of the paddle
    	var paddleBot = paddleTop + 130;
    	
    	// if the y coordinate of the ball touches anywhere between the top and bottom values of the paddle then mirror the x-coordinate
    	if((py >= paddleTop) && (py <= paddleBot)) {
    		xvel= -1*xvel;
            paddleSound.play();
    	}
    }
}
