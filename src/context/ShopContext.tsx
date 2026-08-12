import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { CartItem, DemoOrder } from '../types'
import { products } from '../data/products'

type ShopContextValue = {
  cart: CartItem[]
  wishlist: number[]
  orders: DemoOrder[]
  cartCount: number
  cartTotal: number
  addToCart: (productId: number, quantity?: number) => void
  setQuantity: (productId: number, quantity: number) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  toggleWishlist: (productId: number) => void
  isWishlisted: (productId: number) => boolean
  createOrder: (total: number) => DemoOrder
}

const ShopContext = createContext<ShopContextValue | null>(null)

function readStorage<T>(key: string, fallback: T): T {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T : fallback } catch { return fallback }
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => readStorage('luna-cart', []))
  const [wishlist, setWishlist] = useState<number[]>(() => readStorage('luna-wishlist', []))
  const [orders, setOrders] = useState<DemoOrder[]>(() => readStorage('luna-orders', []))

  useEffect(() => localStorage.setItem('luna-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('luna-wishlist', JSON.stringify(wishlist)), [wishlist])
  useEffect(() => localStorage.setItem('luna-orders', JSON.stringify(orders)), [orders])

  const addToCart = (productId: number, quantity = 1) => setCart(current => {
    const found = current.find(item => item.productId === productId)
    return found ? current.map(item => item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item) : [...current, { productId, quantity }]
  })

  const setQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) return setCart(current => current.filter(item => item.productId !== productId))
    setCart(current => current.map(item => item.productId === productId ? { ...item, quantity } : item))
  }
  const removeFromCart = (productId: number) => setCart(current => current.filter(item => item.productId !== productId))
  const clearCart = () => setCart([])
  const toggleWishlist = (productId: number) => setWishlist(current => current.includes(productId) ? current.filter(id => id !== productId) : [...current, productId])
  const isWishlisted = (productId: number) => wishlist.includes(productId)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = useMemo(() => cart.reduce((sum, item) => {
    const product = products.find(product => product.id === item.productId)
    return sum + (product?.price ?? 0) * item.quantity
  }, 0), [cart])
  const createOrder = (total: number) => {
    const order: DemoOrder = { id: `LN-${Math.floor(100000 + Math.random() * 900000)}`, createdAt: new Date().toISOString(), total, status: 'processing' }
    setOrders(current => [order, ...current]); return order
  }

  return <ShopContext.Provider value={{ cart, wishlist, orders, cartCount, cartTotal, addToCart, setQuantity, removeFromCart, clearCart, toggleWishlist, isWishlisted, createOrder }}>{children}</ShopContext.Provider>
}

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) throw new Error('useShop must be used inside ShopProvider')
  return context
}
