import { Server,Socket } from "socket.io";
import http from "http"
import express from 'express'
import { UserManger } from "./Managers/UserManagers";


const app = express();
const server = http.createServer(http)
const io = new Server(server,{
  cors:{
    origin:"*"
  }
}); 

const userManger = new UserManger()
  
  io.on('connection', (socket:Socket) => {
    console.log('a user connected');
    userManger.addUser("random name", socket)
    socket.on('disconnect', ()=>{
      userManger.removeUser(socket.id)
    })
  });
  


  server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
  });