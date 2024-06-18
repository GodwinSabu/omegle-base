"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManger = void 0;
const RoomManager_1 = require("./RoomManager");
class UserManger {
    constructor() {
        this.users = [];
        this.queue = [];
        this.roomManager = new RoomManager_1.RoomManger();
    }
    addUser(name, socket) {
        this.users.push({
            name, socket
        });
    }
    removeUser(socketId) {
        this.users = this.users.filter(x => x.socket.id === socketId);
    }
    clearQueue() {
        console.log("inside clear queues");
        console.log(this.queue.length);
        if (this.queue.length < 2) {
            return;
        }
        const id1 = this.queue.pop();
        const id2 = this.queue.pop();
        console.log("id is " + id1 + " " + id2);
        const user1 = this.users.find(x => x.socket.id === id1);
        const user2 = this.users.find(x => x.socket.id === id2);
        if (!user1 || !user2) {
            return;
        }
        console.log("creating room");
        const room = this.roomManager.createRoom(user1, user2);
        this.clearQueue();
    }
    initHandlers(socket) {
        socket.on("offer", ({ sdp, roomId }) => {
            this.roomManager.onOffer(roomId, sdp);
        });
        socket.on("answer", ({ sdp, roomId }) => {
            this.roomManager.onAnswer(roomId, sdp);
        });
    }
}
exports.UserManger = UserManger;
