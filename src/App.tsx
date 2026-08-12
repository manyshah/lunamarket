import { HashRouter, Route, Routes } from 'react-router-dom'
import { ShopProvider } from './context/ShopContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Products } from './pages/Products'
import { ProductDetail } from './pages/ProductDetail'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/Checkout'
import { Auth } from './pages/Auth'
import { Profile } from './pages/Profile'
import { Wishlist } from './pages/Wishlist'
import { TrackOrder } from './pages/TrackOrder'
import { NotFound } from './pages/NotFound'

export default function App() {
  return <ShopProvider><HashRouter><Routes><Route path="/auth" element={<Auth />} /><Route element={<Layout />}><Route index element={<Home />} /><Route path="/products" element={<Products />} /><Route path="/product/:slug" element={<ProductDetail />} /><Route path="/cart" element={<Cart />} /><Route path="/checkout" element={<Checkout />} /><Route path="/profile" element={<Profile />} /><Route path="/wishlist" element={<Wishlist />} /><Route path="/track" element={<TrackOrder />} /><Route path="*" element={<NotFound />} /></Route></Routes></HashRouter></ShopProvider>
}
