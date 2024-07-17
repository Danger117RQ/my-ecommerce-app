'use client' // Esto marca el componente como un componente de cliente

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {
 const [username, setUsername] = useState('')
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [error, setError] = useState('')
 const router = useRouter()

 const handleRegister = async (e) => {
  e.preventDefault()

  const res = await fetch('http://localhost:1337/api/auth/local/register', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    username,
    email,
    password,
   }),
  })

  const data = await res.json()

  if (data.jwt) {
   // Guardar el token en el almacenamiento local
   localStorage.setItem('token', data.jwt)
   router.push('/') // Redirigir a la página de inicio
  } else {
   setError(data.message[0].messages[0].message)
  }
 }

 return (
  <div className='flex justify-center items-center h-screen'>
   <form
    onSubmit={handleRegister}
    className='bg-white p-6 rounded shadow-md w-96'
   >
    <h2 className='text-2xl font-bold mb-4'>Register</h2>
    {error && <p className='text-red-500 mb-4'>{error}</p>}
    <input
     type='text'
     placeholder='Username'
     value={username}
     onChange={(e) => setUsername(e.target.value)}
     className='border w-full p-2 mb-4'
    />
    <input
     type='email'
     placeholder='Email'
     value={email}
     onChange={(e) => setEmail(e.target.value)}
     className='border w-full p-2 mb-4'
    />
    <input
     type='password'
     placeholder='Password'
     value={password}
     onChange={(e) => setPassword(e.target.value)}
     className='border w-full p-2 mb-4'
    />
    <button
     type='submit'
     className='w-full bg-blue-500 text-white py-2 px-4 rounded'
    >
     Register
    </button>
   </form>
  </div>
 )
}

export default RegisterPage
