import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductVisual } from '../components/ProductVisual'
import { useShop } from '../context/ShopContext'
import { products } from '../data/products'

const formatPrice = (value: number) => new Intl.NumberFormat('fa-IR').format(value)

export function Cart() {
  const { cart, cartTotal, setQuantity, removeFromCart } = useShop()
  const [coupon, setCoupon] = useState('')
  const [couponOk, setCouponOk] = useState(false)
  const discount = couponOk ? Math.round(cartTotal * 0.1) : 0
  const finalTotal = cartTotal - discount
  if (!cart.length) return <div className="container inner-page empty-state"><div className="empty-state__icon"><ShoppingBag /></div><h1>سبد خرید خالی است.</h1><p>چند محصول به سبد اضافه کن و Flow خرید را تست کن.</p><Link className="button button--dark" to="/products">رفتن به فروشگاه</Link></div>
  return (
    <div className="container inner-page">
      <div className="page-heading"><span className="section-kicker">YOUR BAG</span><h1>سبد خرید</h1><p>{cart.length.toLocaleString('fa-IR')} نوع محصول در سبد شماست.</p></div>
      <div className="cart-layout">
        <section className="cart-list">{cart.map(item => { const product = products.find(product => product.id === item.productId); if (!product) return null; return <article className="cart-item" key={item.productId}><div className="cart-item__visual"><ProductVisual product={product} /></div><div className="cart-item__content"><span>{product.brand}</span><Link to={`/product/${product.slug}`}>{product.shortTitle}</Link><strong>{formatPrice(product.price)} تومان</strong></div><div className="quantity"><button onClick={() => setQuantity(product.id, item.quantity - 1)}><Minus size={16} /></button><span>{item.quantity.toLocaleString('fa-IR')}</span><button onClick={() => setQuantity(product.id, item.quantity + 1)}><Plus size={16} /></button></div><button className="icon-button cart-item__delete" onClick={() => removeFromCart(product.id)}><Trash2 size={18} /></button></article> })}</section>
        <aside className="order-summary"><h2>خلاصه سفارش</h2><div><span>جمع کالاها</span><b>{formatPrice(cartTotal)} تومان</b></div><div><span>ارسال</span><b>رایگان</b></div>{couponOk && <div className="summary-discount"><span>تخفیف LUNA10</span><b>-{formatPrice(discount)} تومان</b></div>}<div className="summary-total"><span>مبلغ نهایی</span><strong>{formatPrice(finalTotal)} تومان</strong></div><div className="coupon-row"><input value={coupon} onChange={event => setCoupon(event.target.value)} placeholder="کد تخفیف: LUNA10" /><button onClick={() => setCouponOk(coupon.trim().toUpperCase() === 'LUNA10')}>اعمال</button></div>{coupon && !couponOk && coupon.trim().toUpperCase() !== 'LUNA10' && <small className="coupon-error">برای Demo کد LUNA10 را وارد کن.</small>}<Link className="button button--dark button--full" to={`/checkout${couponOk ? '?coupon=LUNA10' : ''}`}>ادامه و ثبت سفارش</Link><p className="summary-note">این یک Checkout نمایشی است و پرداخت واقعی انجام نمی‌شود.</p></aside>
      </div>
    </div>
  )
}
