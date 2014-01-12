"use strict";
var socket = io.connect('/');

var board = [];
var player = -1;
var players = [];

function makeMove (x) {
	var obj = {x: x};
	console.log("making move", obj);
	socket.emit('makeMove', obj, function (serverBoard) {
		if (typeof serverBoard === "object") {
			board = serverBoard;
			console.log('board:', board);
		}
	});
}

function renderBoard () {
	$('.board').show().find('td').each(function (i) {
		var td = $(this);
		td.removeClass().addClass("player"+board[i]);
	});
}

function getBoard () {
	socket.emit('getBoard', function (serverBoard) {
		board = serverBoard;
		console.log('board:', board);
		renderBoard();
	});
}

function renderDetails () {
	var playersDiv = $('.players ul').empty(),
		i;
	for (i in players) {
		if (players.hasOwnProperty(i)) {
			playersDiv.append('<li>Player ' + players[i]+ '</li>');
		}
	}
}

$('.board td').click(function () {
	if ($(this).hasClass('player0')){
		makeMove($(this).attr('data-x'));
	}
});
$('.reset').click(function () {
	socket.emit('resetGame');
});
$('.player').click(function (){
	player = $(this).attr('data-player');
});

function bindSocketEvents() {
	socket.on('boardChanged', function (serverBoard) {
		board = serverBoard;
		renderBoard();
	});
	socket.on('gameOver', function (winner) {
		if (winner < 0) {
			alert('Game over: Tie');
		} else {
			alert('Game over: Winning player: ' + winner);
		}
		renderBoard();
	});
	socket.on('playerJoined', function (player) {
		players.push(player);
		renderDetails();
	});
	socket.on('playerLeft', function (player) {
		players.splice(players.indexOf(player), 1);
		renderDetails();
	});
}

socket.emit('joinGame', gameId, function (gameData) {
	player = gameData.playerId;
	players = gameData.players;
	getBoard();
	renderDetails();
	bindSocketEvents();
});