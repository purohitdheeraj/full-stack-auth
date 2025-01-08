'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage(){
  const router = useRouter();
  const [user, setUser] = useState(null)

  const handleLogout = async()=>{
    try {
      const res = await fetch('/api/logout')
      const data = await res.json()
      if(res.ok){
        router.push('/')
      }
    } catch (error) {
      console.log('logout error', error)
    }
  }

  const getUserDetails = async()=>{
    try {
      const res = await fetch('/api/me')
      const data = await res.json()
      setUser(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px]">
    Hare Krishna Profile Page

    {user && <>
      <p>{user.username}</p>
      <p>{user.email}</p>
    </>}   

    <button onClick={handleLogout}>Logout</button>
    </div>
  );
}