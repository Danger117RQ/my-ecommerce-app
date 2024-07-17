// src/components/ProtectedRoute.js

'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
 const router = useRouter()
 const token =
  typeof window !== 'undefined' ? localStorage.getItem('token') : null

 useEffect(() => {
  if (!token) {
   router.push('/auth/login')
  }
 }, [token, router])

 return token ? children : null
}

export default ProtectedRoute
