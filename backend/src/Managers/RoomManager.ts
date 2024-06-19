import { Socket } from "socket.io";
import { User } from "./UserManagers";

let GLOBAL_ROOM_ID = 1;

interface Room {
    user1: User,
    user2: User,
}

export class RoomManger {
    private rooms: Map<string , Room>
    constructor(){
        this.rooms = new Map<string, Room>()
    }

    createRoom(user1: User, user2: User){
        const roomId: any = this.generate().toString()
        this.rooms.set(roomId.toString(), {
            user1,
            user2
        })
        user1.socket.emit("send-offer", {
            roomId
        })
    }

    onOffer(roomId: string, sdp: string){
        const room = this.rooms.get(roomId)
        room?.user2.socket.emit("offer", {
            
            sdp,
            roomId
        })
    }

    onAnswer(roomId: string, sdp: string){
        const room = this.rooms.get(roomId)
        room?.user1.socket.emit("answer", {
            sdp,
            roomId 
        })
    }

    generate() {
        return GLOBAL_ROOM_ID++
    }
}
