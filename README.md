node-xmix
=========

A demo for a multiplayer tic-tac-toe game

Installing
----------
This project requires Node.js.
* run npm install
* run node js/app.js
* visit localhost:3000

Usage
-----
Start a tic-tac-toe game by creating a room, and wait for another player to join the room (rooms will be visible in the lobby once they are created.

The game will start once the room has been created, but two players are required to play.
Each player can make a move in his turn.

In order to test out the game, open the same room with two different windows to emulate two players.

Development
-----------
TODO:

* ~~make rooms accept 2 players, number them accordingly~~
* manage games in a collection
* ~~manage sockets in rooms~~
* ~~apply actual directory structure~~
* design tic-tac-toe game

Known Issues:

* socket events sent to all rooms instead of only socket's room

Future:

* add support for additional games
* add users / usernames / friend lists
  * add history, score, levels
