'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage(){
  const router = useRouter()
  
  const handleLogout = async()=>{
    try {
      const res = await fetch('/api/logout')
      const data = await res.json()
      console.log(data)
      if(res.ok){
        router.push('/')
      }
    } catch (error) {
      console.log('logout error', error)
    }
  }
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px]">
    Hare Krishna Profile Page
    

    <button onClick={handleLogout}>Logout</button>
    </div>
  );
}