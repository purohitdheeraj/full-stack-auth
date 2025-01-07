'use client';
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link";

export default function Signup() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    username: ''
  })

  const [processing,setProcessing] = useState(false)

  const handleChange = (e) => {
    setUserInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSignup = async(e) => {
    e.preventDefault()
    setProcessing(true)

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      })

      const data = await res.json()
      console.log(data)

    } catch (error:any) {
      console.log('signup error', error)
    } finally{
      setProcessing(false)
    }

  }
  return (
    <>
      <div className="grid place-items-center gap-2 h-[100vh]">
        <div className="flex flex-col gap-4">
        <h2 className="mx-auto">{processing ? 'Processing' : 'Signup Page'}</h2>
          <label htmlFor="username">Username</label>
          <input type="text" className="border px-2 py-1" onChange={handleChange} value={userInfo.username} id="username" name="username" />
          
          <label htmlFor="email">Email</label>
          <input type="email" onChange={handleChange} className="border px-2 py-1" value={userInfo.email} id="email" name="email" />

          <label htmlFor="password">Password</label>
          <input type="password" onChange={handleChange} className="border px-2 py-1" value={userInfo.password} id="password" name="password" />

          <button className="border rounded-xl px-2 py-1" onClick={handleSignup} type="submit">Signup</button>
          <Link href="/login">
            Already have an account? Login
          </Link>

        </div>
      </div>
    </>
  )
}