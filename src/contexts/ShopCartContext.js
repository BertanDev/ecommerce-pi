'use client'

import { createContext, useState } from 'react'

export const ShopCartContext = createContext()

export function ShopCart({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  return (
    <ShopCartContext.Provider value={{ cart, addToCart }}>
      {children}
    </ShopCartContext.Provider>
  )
}
