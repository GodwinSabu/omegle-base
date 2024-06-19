"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const UserManagers_1 = require("./Managers/UserManagers");
const app = (0, express_1.default)();
const server = http_1.default.createServer(http_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
const userManger = new UserManagers_1.UserManger();
io.on('connection', (socket) => {
    console.log('a user connected');
    userManger.addUser("random name", socket);
    socket.on('disconnect', () => {
        userManger.removeUser(socket.id);
    });
});
server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});
