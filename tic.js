/*
    Lucas Childers
    12/19/2016
*/

B = ""
X = "<img src='x.png'/>";
O = "<img src='o.png'/>";

xScore = 0;
oScore = 0;

var moveStrings = ["it's your move!", "make a move!", "take a shot!", "take action!", "it's up to you!", "come on!", "go!"]

var move = 0;
// 0 is blank, 1 is X, 2 is O
var gameBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

function translate(piece) {
    return piece == 1 ? "X" : "O";
}

function coordToInt(y, x) {
    return (y * 3) + x + 1;
}

function checkWin() {
    // Left to Right wins
    for (var y = 0; y < 3; y++) {
        if (gameBoard[y][0] != 0) {
            var curPiece = gameBoard[y][0];
            
            if (gameBoard[y][1] == curPiece && gameBoard[y][2] == curPiece) {
                $(".piece").removeAttr('style');
                
                $("#" + coordToInt(y, 0)).css({
                    "background-color" : "#A3E4D7",
                    "transition" : "1.5s"
                });
                $("#" + coordToInt(y, 1)).css({
                    "background-color" : "#A3E4D7",
                    "transition" : "1.5s"
                });
                $("#" + coordToInt(y, 2)).css({
                    "background-color" : "#A3E4D7",
                    "transition" : "1.5s"
                });
                
                $("#status").html(translate(curPiece) + ", you win!");
                
                curPiece == 1 ? xScore++ : oScore++;
                return true;
            }
        }
    }
    
    // Up to Down wins
    for (var x = 0; x < 3; x++) {
        if (gameBoard[0][x] != 0) {
            var curPiece = gameBoard[0][x];
            
            if (gameBoard[1][x] == curPiece && gameBoard[2][x] == curPiece) {
                $(".piece").removeAttr('style');
                
                $("#" + coordToInt(0, x)).css({
                    "background-color" : "#A3E4D7",
                    "transition" : "1.5s"
                });
                $("#" + coordToInt(1, x)).css({
                    "background-color" : "#A3E4D7",
                    "transition" : "1.5s"
                });
                $("#" + coordToInt(2, x)).css({
                    "background-color" : "#A3E4D7",
                    "transition" : "1.5s"
                });
                
                $("#status").html(translate(curPiece) + ", you win!");
                curPiece == 1 ? xScore++ : oScore++;
                
                return true;
            }
        }
    }
    
    // Top Left to Bottom Right wins
    if (gameBoard[0][0] != 0) {
        var curPiece = gameBoard[0][0];
        if (gameBoard[1][1] == curPiece && gameBoard[2][2] == curPiece) {
            $(".piece").removeAttr('style');
            
            $("#" + coordToInt(0, 0)).css({
                    "background-color" : "#A3E4D7",
                    "transition" : "1.5s"
                });
            $("#" + coordToInt(1, 1)).css({
                    "background-color" : "#A3E4D7",
                    "transition" : "1.5s"
                });
            $("#" + coordToInt(2, 2)).css({
                    "background-color" : "#A3E4D7",
                    "transition" : "1.5s"
                });
            
            $("#status").html(translate(curPiece) + ", you win!");
            curPiece == 1 ? xScore++ : oScore++;
            
            return true;
        }
    }
    
    // Bottom Left to Top Right wins
    if (gameBoard[2][0] != 0) {
        var curPiece = gameBoard[2][0];
        if (gameBoard[1][1] == curPiece && gameBoard[0][2] == curPiece) {
            $(".piece").removeAttr('style');
            
            $("#" + coordToInt(2, 0)).css({
                    "background-color" : "#A3E4D7",
                    "transition" : "1.5s"
                });
            $("#" + coordToInt(1, 1)).css({
                    "background-color" : "#A3E4D7",
                    "transition" : "1.5s"
                });
            $("#" + coordToInt(0, 2)).css({
                    "background-color" : "#A3E4D7",
                    "transition" : "1.5s"
                });
            
            $("#status").html(translate(curPiece) + ", you win!");
            curPiece == 1 ? xScore++ : oScore++;
            
            return true;
        }
    }
    
    return false;
}

function checkBoardFull() {
	for (var i = 1; i < 10; i++) {
  	if ($("#" + i).html() == B) {
    	return false;
    }
  }
  
  return true;
}

function clearBoard() {
    //$("#reset").fadeOut();
	$(".piece").html("");  
    $(".piece").css({
        "background-color" : "white",
        "transition" : "2.5s",
    });
        
    gameBoard = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    move = 0;
    $("#status").html((move == 0 ? "X" : "O") + ", " + moveStrings[Math.floor(Math.random()*moveStrings.length)]);  
    $(".piece").css("pointer-events", "auto");
    return;
}

function updateBoard(loc, piece) {
    loc = loc - 1;
    var y = Math.floor(loc / 3);
    var x = loc % 3;
    
    gameBoard[y][x] = piece;
    
    return;
}

$( document ).ready(function() {
    $(document).on("contextmenu", function() {
        return false;
    });
    
    var loc;
    var valid = false;
    $("#reset").fadeIn();
    $("#status").html((move == 0 ? "X" : "O") + ", " + moveStrings[Math.floor(Math.random()*moveStrings.length)]); 
    $("#scoreLeft").html("X: " + (xScore == 0 ? "none!" : xScore));
    $("#scoreRight").html("O: " + (oScore == 0 ? "none!" : oScore));
    
    $('.piece').mousedown(function(event) {
        loc = parseInt($(this).attr('id'));
        
        // Not allowing repeat placement
        if ($(this).html() == B) {
            valid = true;
        }
        else {
            valid = false;
            return;
        }

        // Move is 0, add an O
        if (move == 0) {
    		$(this).html("X");
        }
    
        // Move is 1, add an X
        if (move == 1) {
        	$(this).html("O");
        }
    });
    
    $('.piece').mouseup(function() {
        if (valid) {
            updateBoard(loc, move + 1);
        
            // Flip moves
            move = 1 - move;
    
            // Check for win, reset board
            if (checkWin()) {
                // Display button
                $(".piece").css("pointer-events", "none");
                $("#scoreLeft").html("X: " + (xScore == 0 ? "none!" : xScore));
                $("#scoreRight").html("O: " + (oScore == 0 ? "none!" : oScore));                
                //$("#reset").fadeIn();
                
                
                //clearBoard();
            }
        
            else if (checkBoardFull()) {
                $("#status").html("Tie game!"); 
                $(".piece").css({
                    "background-color" : "#F5B7B1",
                    "transition" : "1.5s"
                });
                //$("#reset").fadeIn();
            }
        
            else {
                $("#status").html((move == 0 ? "X" : "O") + ", " + moveStrings[Math.floor(Math.random()*moveStrings.length)]); 
            }
        }
    });
});


