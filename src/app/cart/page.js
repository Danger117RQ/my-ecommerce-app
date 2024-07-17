'use client' // Esto marca el componente como un componente de cliente

import { useEffect, useState } from 'react'

const CartPage = () => {
 const [cart, setCart] = useState([])

 useEffect(() => {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || []
  setCart(storedCart)
 }, [])

 const removeFromCart = (productId) => {
  const updatedCart = cart.filter((item) => item.id !== productId)
  setCart(updatedCart)
  localStorage.setItem('cart', JSON.stringify(updatedCart))
 }

 return (
  <div className='p-4'>
   <h1 className='text-2xl font-bold'>Shopping Cart</h1>
   {cart.length > 0 ? (
    cart.map((product) => (
     <div key={product.id} className='border p-4 mt-4'>
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
      <h2 className='text-xl font-semibold mt-2'>{product.attributes.name}</h2>
      <p className='mt-2'>${product.attributes.price}</p>
      <button
       onClick={() => removeFromCart(product.id)}
       className='mt-2 bg-red-500 text-white py-1 px-4 rounded'
      >
       Remove
      </button>
     </div>
    ))
   ) : (
    <p>Your cart is empty.</p>
   )}
  </div>
 )
}

export default CartPage
