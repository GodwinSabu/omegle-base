"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomManger = void 0;
let GLOBAL_ROOM_ID = 1;
class RoomManger {
    constructor() {
        this.rooms = new Map();
    }
    createRoom(user1, user2) {
        const roomId = this.generate();
        this.rooms.set(roomId.toString(), {
            user1,
            user2
        });
        user1.socket.emit("send-offer", {
            roomId
        });
    }
    onOffer(roomId, sdp) {
        const room = this.rooms.get(roomId);
        room === null || room === void 0 ? void 0 : room.user2.socket.emit("offer", {
            sdp
        });
    }
    onAnswer(roomId, sdp) {
        const room = this.rooms.get(roomId);
        room === null || room === void 0 ? void 0 : room.user1.socket.emit("answer", {
            sdp
        });
    }
    generate() {
        return GLOBAL_ROOM_ID++;
    }
}
exports.RoomManger = RoomManger;
