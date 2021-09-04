# Socket.io-CellGame-backend

![](socketgame.gif)

## Request Response Cycle
  
<table align="center">
  <tr>
    <th>EVENT</td>
    <th>REQUEST(frontend)</td>
    <th>RESPONSE(backend)</td>
  </tr>
  <tr>
    <td>Connect</td>
    <td> { } </td>
    <td> { <br> &nbsp;&nbsp;clientId : guid <br> }</td>
  </tr>
  <tr>
    <td>Create</td>
    <td> { <br> &nbsp;&nbsp;clientId : guid <br> } </td>
    <td> { <br> &nbsp;&nbsp;game : { <br> &nbsp;&nbsp;&nbsp;&nbsp;id : guid, <br> &nbsp;&nbsp;&nbsp;&nbsp;balls : id, <br> &nbsp;&nbsp;&nbsp;&nbsp;clients : [] <br> &nbsp;&nbsp;&nbsp;&nbsp;state : {} <br> &nbsp;&nbsp;} <br> }</td>
  </tr>
  <tr>
    <td>Join</td>
    <td> { <br> &nbsp;&nbsp;clientId : guid, <br>&nbsp;&nbsp;gameId : guid <br> } </td>
    <td> { <br> &nbsp;&nbsp;game : { <br> &nbsp;&nbsp;&nbsp;&nbsp;id : guid, <br> &nbsp;&nbsp;&nbsp;&nbsp;balls : id, <br> &nbsp;&nbsp;&nbsp;&nbsp;clients : [guid, color] <br> &nbsp;&nbsp;&nbsp;&nbsp;state : {} <br> &nbsp;&nbsp;} <br> }</td>
  </tr>
  <tr>
    <td>Play</td>
    <td> { <br> &nbsp;&nbsp;clientId : guid, <br>&nbsp;&nbsp;gameId : guid, <br>&nbsp;&nbsp;ballid : int, <br>&nbsp;&nbsp;color : color<br> } </td>
    <td> { <br> &nbsp;&nbsp;game : { <br> &nbsp;&nbsp;&nbsp;&nbsp;id : guid, <br> &nbsp;&nbsp;&nbsp;&nbsp;balls : id, <br> &nbsp;&nbsp;&nbsp;&nbsp;clients : [guid, color] <br> &nbsp;&nbsp;&nbsp;&nbsp;state : {} <br> &nbsp;&nbsp;} <br> }</td>
  </tr>
  <tr>
    <td>Over</td>
    <td> { <br> &nbsp;&nbsp;gameId : guid<br> } </td>
    <td> { <br> &nbsp;&nbsp;winner : color wins }</td>
  </tr>
  <tr>
    <td>Disconnect</td>
    <td> { } </td>
    <td> { <br> &nbsp;&nbsp;disconnect : true <br> }</td>
  </tr>
</table>

## How To Run

- clone both the frontend git and backend git to run the project.
- frontend git
https://github.com/kadumkomut47/18.Socket.io-Game-Frontend
- backend git
https://github.com/kadumkomut47/18.Socket.io-Game-Backend

- In both frontend and backend, Open the corresponding directory in cmd and install the modules using below commands
```
npm install
```
- First start the backend project and run 
```
npm start
```
- Then start the frontend project using
```
npm start
```

## Modules Used

- Socket.io is used to transmit the data across the clients and for real time experience.
- crypto is used to generate unique id for the user and game id.
- express is used as a web server.
- cors is used inside of socket.io for cross origin policy but not need to download the module as it is present inside the socket.io

## Game Process 

- When a user wants to play the game, He/she must first create a gameId or find someone who has already created the game id.
- The gameId allows you to enter the gamestate where two concurrent users can play the game against each other.
- GameId must be shared across any channel either it be whatsapp, facebook, email, sms etc.
- The game state can accept only two player.
- Each player gets a unique color for identification
- Inside the game state, the players will have 30seconds to click the cells. Whoever has the most color of cells after timer saturates wins the game.






