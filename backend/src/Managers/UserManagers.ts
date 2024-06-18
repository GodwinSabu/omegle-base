import { Socket } from "socket.io"
import { RoomManger } from "./RoomManager";


export interface User {
    socket:Socket,
    name:String,
}
export class UserManger{
    private users: User[];
    private queue: string[];
    private roomManager: RoomManger;

    constructor(){
        this.users = [];
        this.queue = [];
        this.roomManager = new RoomManger();

    }
    addUser(name: string, socket:Socket){
        this.users.push({
            name, socket
        })
    }
    removeUser(socketId:string){
        this.users = this.users.filter(x=> x.socket.id === socketId)

    }

    clearQueue() {
        console.log("inside clear queues")
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
    initHandlers(socket: Socket) {
        socket.on("offer", ({sdp, roomId}: {sdp: string, roomId: string}) => {
            this.roomManager.onOffer(roomId, sdp, );
        })

        socket.on("answer",({sdp, roomId}: {sdp: string, roomId: string}) => {
            this.roomManager.onAnswer(roomId, sdp, );
        })
    }
}