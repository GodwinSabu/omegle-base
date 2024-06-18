import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export const Room = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const name = searchParams.get("name")
    console.log(name);
    

    useEffect(()=>{
        //login to init the user name 

    }, [name])
  return (
    <div>
        HI {name}
    </div>
  )
}
