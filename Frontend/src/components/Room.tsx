import { io, Socket } from "socket.io-client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const URL = "http://localhost:3000";

export const Room = () => {
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");
    const [socket, setSocket] = useState<Socket | null>(null);
    const [lobby, setLobby] = useState(true)
    const [sendingPc, setSendingPc] = useState< RTCPeerConnection|null >(null);
    const [receivingPc, setReceivingPc] = useState<null | RTCPeerConnection>(null);
    const [remoteVideoTrack, setRemoteVideoTrack] = useState<MediaStreamTrack | null>(null);
    const [remoteAudioTrack, setRemoteAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [remoteMediaStream, setRemoteMediaStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        const newSocket: Socket = io(URL, {
            autoConnect: true
        });

        newSocket.on("send-offer", async ({ roomId }) => {
            alert('send offer please');
            setLobby(false)
            const pc = new RTCPeerConnection();

            setSendingPc(pc); 
            const sdp = await pc.createOffer();
            newSocket.emit("offer", {
                roomId,
                sdp: ""
            });
        });

        newSocket.on("offer",  async({ roomId, offer }) => {
            alert('send answer please');
            setLobby(false)
            const pc = new RTCPeerConnection();
            pc.setRemoteDescription({sdp:offer, type:"offer"})
            const sdp = await pc.createAnswer();
            //@ts-ignore
              // trickle ice 
              setReceivingPc(pc);
            pc.ontrack= ({track,type})=>{
              if (type== 'audio'){
                setRemoteAudioTrack(track)
              }else{
                setRemoteVideoTrack(track)
              }
            }

            pc.setLocalDescription(sdp)
            // newSocket.emit("answer", {
            //     roomId,
            //     sdp: ""
            // });
        });

        newSocket.on("answer", ({ roomId, answer }) => {
          setLobby(false)
            alert('connection done');
        });

        newSocket.on("lobby",()=>{
          setLobby(true)
        })
        setSocket(newSocket);

        // Clean up the socket connection on unmount
        return () => {
            newSocket.disconnect();
        };
    }, []);

    if(lobby){
      return <div>
        waiting to connect
      </div>
    }
    return (
      <div>
        Hi {name}
        <video autoPlay width={400} height={400}  />
        {/* {lobby ? "Waiting to connect you to someone" : null} */}
        <video autoPlay width={400} height={400} />
    </div>
    )
};
