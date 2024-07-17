// src/app/auth/login/page.js

'use client' // Esto marca el componente como un componente de cliente

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
 const [username, setUsername] = useState('')
 const [password, setPassword] = useState('')
 const router = useRouter()

 const handleSubmit = async (e) => {
  e.preventDefault()

  try {
   const res = await fetch('http://localhost:1337/api/auth/local', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     identifier: username,
     password,
    }),
   })

   if (res.ok) {
    const data = await res.json()
    localStorage.setItem('token', data.jwt) // Guardar el token en localStorage
    router.push('/user/profile') // Redirigir al perfil del usuario
   } else {
    alert('Login failed')
   }
  } catch (error) {
   console.error('Error during login:', error)
   alert('Login failed')
  }
 }

 return (
  <div className='flex justify-center items-center h-screen'>
   <div className='bg-white p-6 rounded shadow-md w-96'>
    <h2 className='text-2xl font-bold mb-4'>Login</h2>
    <form onSubmit={handleSubmit}>
     <div className='mb-4'>
      <label className='block mb-2'>Username</label>
      <input
       type='text'
       value={username}
       onChange={(e) => setUsername(e.target.value)}
       className='border w-full p-2'
      />
     </div>
     <div className='mb-4'>
      <label className='block mb-2'>Password</label>
      <input
       type='password'
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       className='border w-full p-2'
      />
     </div>
     <button
      type='submit'
      className='w-full bg-blue-500 text-white py-2 px-4 rounded'
     >
      Login
     </button>
    </form>
   </div>
  </div>
 )
}

export default LoginPage
