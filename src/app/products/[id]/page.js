'use client' // Esto marca el componente como un componente de cliente

import { useEffect, useState } from 'react'

const ProductDetailsPage = ({ params }) => {
 const [product, setProduct] = useState(null)
 const { id } = params

 useEffect(() => {
  if (id) {
   const fetchProduct = async () => {
    try {
     const res = await fetch(
      `http://localhost:1337/api/products/${id}?populate=*`
     )
     const data = await res.json()
     console.log(data) // Añade esto para ver los datos obtenidos en la consola
     setProduct(data.data)
    } catch (error) {
     console.error('Error fetching product:', error)
     setProduct(null)
    }
   }

   fetchProduct()
  }
 }, [id])

 const addToCart = (product) => {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || []
  const updatedCart = [...storedCart, product]
  localStorage.setItem('cart', JSON.stringify(updatedCart))
 }

 if (!product) {
  return <p>Loading...</p>
 }

 return (
  <div className='p-4'>
   <h1 className='text-2xl font-bold'>{product.attributes.name}</h1>
   {product.attributes.image &&
   product.attributes.image.data &&
   product.attributes.image.data.attributes &&
   product.attributes.image.data.attributes.url ? (
    <img
     src={`http://localhost:1337${product.attributes.image.data.attributes.url}`}
     alt={product.attributes.name}
     className='w-full h-96 object-cover mt-4'
    />
   ) : (
    <div className='w-full h-96 bg-gray-200 flex items-center justify-center mt-4'>
     No Image
    </div>
   )}
   <p className='text-xl mt-4'>${product.attributes.price}</p>
   <p className='mt-4'>{product.attributes.description}</p>
   <button
    onClick={() => addToCart(product)}
    className='mt-4 bg-green-500 text-white py-2 px-4 rounded'
   >
    Add to Cart
   </button>
  </div>
 )
}

export default ProductDetailsPage
