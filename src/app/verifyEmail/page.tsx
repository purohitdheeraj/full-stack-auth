'use client';
import {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'


export default function VerifyTokenPage() {
  const router = useRouter()
  const [processing, setProcessing] = useState(false)
  const [token, setToken] = useState('')
  const [verified, setVerified] = useState(false)

  // get token from serach params
  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    setToken(token) 
  },[])


  const handleVerifyToken = async()=>{
    try {
      const response = await fetch('/api/verify-token',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({token})
      })
      if(response.ok){
        const data = await response.json()
        console.log(data)
        setVerified(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(token.length > 0){
      handleVerifyToken()
    }
  }, [token])
  
  return (
    <div>
      <h1>Verify Token Page</h1>
      {verified && <>
        Email Verified SuccessFully ✅ 
      </>}
    
    </div>
  )
}