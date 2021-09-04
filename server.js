const app = require('express')();

const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors:{
        origin:"*"
    }
})

// unique id
const crypto = require('crypto')
const randomId = () => crypto.randomBytes(8).toString("hex");

games = {}
client_game_id = {}

io.on('connection',(socket)=>{

    // when iam connected
    console.log("iam connected - "+ socket.handshake.address)


    socket.on('create',()=>{
        const gameId = randomId();
        games[gameId] = {
            "id": gameId,
            "cells": 20,
            "clients": [],
            "state": {},
        }
        io.to(socket.id).emit('create',{game:games[gameId]})
    })

    socket.on('join',(result)=>{
        const gameId = result.gameId;
        const clientId = socket.id;
        if(!(gameId in games)){
            console.log('wrong')
            io.to(socket.id).emit('join',{'wrong': true})
            return;
        }
        const game = games[gameId];
        // max players reach, return
        if(game.clients.length>=3) return;
        // choose colors based on length
        const color = {'0': 'red','1':'green','2':'blue'}[game.clients.length]
        game.clients.push({
            "clientId":clientId,
            "color":color
        })
        client_game_id[socket.id] = gameId
        game.clients.forEach(c=>{
            io.to(c.clientId).emit('join',game)    
        })
    })

    socket.on('play',(result)=>{
        const gameId = result.gameId;
        const ballId = result.ballId;
        const color = result.color;
        let state = games[gameId].state;
        if(!state) state = {}
        state[ballId] = color;
        games[gameId].state = state;
        const game = games[gameId]
        
        game.clients.forEach(c=> {
            io.to(c.clientId).emit('update',game)    
        })
    })

    socket.on('over',(result)=>{
        const game = games[result];
        let red= 0, green = 0;
        for(const b in game.state){
            if(game.state[b]==="red") red++;
            if(game.state[b]==="green") green++;
        }
        let winner = red>green?"red wins":"green wins";
        game.clients.forEach(c=> {
            io.to(c.clientId).emit('over',winner)    
        })
        

    })

    socket.on('disconnect',()=>{
        const game = games[client_game_id[socket.id]]
        if(game){
            game.clients.forEach(c=> {   
                io.to(c.clientId).emit('discon',true)    
            })
        }
    })

})


const port = process.env.PORT || 5000

server.listen(port,()=>{
    console.log("server is listening on port 5000")
})