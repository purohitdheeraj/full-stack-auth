'use client';
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link";

export default function Login() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })

  const [processing,setProcessing] = useState(false)

  const handleChange = (e) => {
    setUserInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleLogin = (e) => {
    e.preventDefault()
    console.log(userInfo)

    // make a api call login
    // if success
    // setProcessing(true)
    // router.push('/dashboard')
  }
  return (
    <>
      <div className="grid place-items-center gap-2 h-[100vh]">
        <div className="flex flex-col gap-4">
        <h2 className="mx-auto">Login Page</h2>
         
          <label htmlFor="email">Email</label>
          <input type="email" onChange={handleChange} className="border px-2 py-1" value={userInfo.email} id="email" name="email" />

          <label htmlFor="password">Password</label>
          <input type="password" onChange={handleChange} className="border px-2 py-1" value={userInfo.password} id="password" name="password" />

          <button className="border rounded-xl px-2 py-1" onClick={handleLogin} type="submit">Login</button>
          <Link href="/signup">
            Don't have an account? Signup
          </Link>
        </div>
      </div>
    </>
  )
}