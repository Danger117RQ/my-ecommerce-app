// src/app/page.js
'use client' // Esto marca el componente como un componente de cliente

import { useEffect, useState } from 'react'
import Link from 'next/link'

const HomePage = () => {
 const [products, setProducts] = useState([])
 const [searchTerm, setSearchTerm] = useState('')

 useEffect(() => {
  const fetchProducts = async () => {
   try {
    const res = await fetch('http://localhost:1337/api/products?populate=*')
    const data = await res.json()
    console.log(data) // Añade esto para ver los datos obtenidos en la consola
    setProducts(data.data || [])
   } catch (error) {
    console.error('Error fetching products:', error)
    setProducts([])
   }
  }

  fetchProducts()
 }, [])

 const filteredProducts = products.filter((product) =>
  product.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
 )

 return (
  <div className='p-4'>
   <h1 className='text-2xl font-bold'>Products</h1>
   <input
    type='text'
    placeholder='Search products...'
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className='border p-2 w-full mt-4'
   />
   <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
    {filteredProducts.length > 0 ? (
     filteredProducts.map((product) => (
      <Link key={product.id} href={`/products/${product.id}`}>
       <div className='border p-4 cursor-pointer'>
        {product.attributes.image &&
        product.attributes.image.data &&
        product.attributes.image.data.attributes &&
        product.attributes.image.data.attributes.url ? (
         <img
          src={`http://localhost:1337${product.attributes.image.data.attributes.url}`}
          alt={product.attributes.name}
          className='w-full h-48 object-cover'
         />
        ) : (
         <div className='w-full h-48 bg-gray-200 flex items-center justify-center'>
          No Image
         </div>
        )}
        <h2 className='text-xl font-semibold mt-2'>
         {product.attributes.name}
        </h2>
        <p className='mt-2'>${product.attributes.price}</p>
       </div>
      </Link>
     ))
    ) : (
     <p>No products available.</p>
    )}
   </div>
  </div>
 )
}

export default HomePage
