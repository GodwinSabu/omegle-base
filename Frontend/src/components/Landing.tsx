import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export const Landing = () => {
    const [name, setName] = useState("")
    const [joined,setJoined] = useState("")
    const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null);  
    const videoRef = useRef<HTMLVideoElement>(null);

    const getCam= async()=>{
      const stream = await window.navigator.mediaDevices.getUserMedia({
        video:false,
        audio: false

      })
    
       // MediaStream
       const audioTrack = (stream).getAudioTracks()[0]
       const videoTrack = stream.getVideoTracks()[0]
       setLocalAudioTrack(audioTrack);
       setlocalVideoTrack(videoTrack);
       if (!videoRef.current) {
        return;
    }
    videoRef.current.srcObject = new MediaStream([videoTrack])
    videoRef.current.play();
    }

    useEffect(() => {
      if (videoRef && videoRef.current) {
          getCam()
      }
  }, [videoRef]);

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
           <video autoPlay ref={videoRef}></video>
            <div className="text-center">
                <input 
                    type="text" 
                    onChange={(e) => setName(e.target.value)} 
                    value={name} 
                    className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Enter your name"
                />
                <Link 
                    to={`/room/?name=${name}`}  
                    className="inline-block px-4 py-2 ml-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                >
                    Join
                </Link>
            </div>
        </div>
    )
}

export default Landing
