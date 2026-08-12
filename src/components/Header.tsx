import { Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import { useShop } from '../context/ShopContext'

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { cartCount, wishlist } = useShop()
  const navigate = useNavigate()
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return products.filter(product => `${product.title} ${product.brand} ${product.category}`.toLowerCase().includes(q)).slice(0, 5)
  }, [query])
  useEffect(() => { if (!searchOpen) setQuery('') }, [searchOpen])
  const submitSearch = () => {
    if (!query.trim()) return
    setSearchOpen(false)
    navigate(`/products?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <>
      <div className="announcement"><span>ارسال رایگان سفارش‌های بالای ۳ میلیون تومان</span><span className="announcement__dot">•</span><span>نسخه نمایشی Portfolio — پرداخت واقعی انجام نمی‌شود</span></div>
      <header className="site-header">
        <div className="container header-main">
          <button className="mobile-menu-button" onClick={() => setMobileOpen(true)} aria-label="باز کردن منو"><Menu /></button>
          <Link className="brand" to="/"><img src="./luna-logo.webp" alt="Luna Market" /></Link>
          <button className="search-trigger" onClick={() => setSearchOpen(true)}><Search size={20} /><span>جستجو بین محصولات و برندها...</span><kbd>⌘ K</kbd></button>
          <div className="header-actions">
            <button className="icon-button desktop-search-icon" onClick={() => setSearchOpen(true)}><Search /></button>
            <Link className="icon-button counter-wrap" to="/wishlist" aria-label="علاقه‌مندی"><Heart />{wishlist.length > 0 && <span className="counter">{wishlist.length.toLocaleString('fa-IR')}</span>}</Link>
            <Link className="icon-button" to="/auth" aria-label="حساب کاربری"><UserRound /></Link>
            <Link className="cart-pill" to="/cart"><ShoppingBag size={19} /><span>سبد خرید</span><b>{cartCount.toLocaleString('fa-IR')}</b></Link>
          </div>
        </div>
        <nav className="container nav-row">
          <NavLink to="/products">همه محصولات</NavLink><NavLink to="/products?category=پوست">مراقبت پوست</NavLink><NavLink to="/products?category=مو">مراقبت مو</NavLink><NavLink to="/products?category=آرایشی">آرایشی</NavLink><NavLink to="/products?category=مکمل">مکمل و سلامت</NavLink><NavLink to="/track">پیگیری سفارش</NavLink><span className="nav-spacer" /><a href="#footer">درباره لونا</a>
        </nav>
      </header>

      {searchOpen && <div className="overlay" onMouseDown={() => setSearchOpen(false)}>
        <div className="search-modal" onMouseDown={event => event.stopPropagation()}>
          <div className="search-modal__input"><Search /><input autoFocus value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => event.key === 'Enter' && submitSearch()} placeholder="مثلاً ضد آفتاب، سرم یا Luna Skin" /><button className="icon-button" onClick={() => setSearchOpen(false)}><X /></button></div>
          <div className="search-modal__body">
            {!query && <><span className="search-label">جستجوهای پیشنهادی</span><div className="search-chips">{['ضد آفتاب', 'سرم', 'مکمل', 'مراقبت مو'].map(item => <button key={item} onClick={() => setQuery(item)}>{item}</button>)}</div></>}
            {query && results.length === 0 && <div className="empty-inline">محصولی با این عبارت پیدا نشد.</div>}
            {results.map(product => <button className="search-result" key={product.id} onClick={() => { setSearchOpen(false); navigate(`/product/${product.slug}`) }}><span className="search-result__dot" style={{ background: product.accent }} /><span><b>{product.shortTitle}</b><small>{product.brand} · {product.category}</small></span></button>)}
          </div>
        </div>
      </div>}

      {mobileOpen && <div className="mobile-drawer-backdrop" onClick={() => setMobileOpen(false)}>
        <aside className="mobile-drawer" onClick={event => event.stopPropagation()}>
          <div className="mobile-drawer__head"><img src="./luna-logo.webp" alt="Luna Market" /><button className="icon-button" onClick={() => setMobileOpen(false)}><X /></button></div>
          <button className="mobile-search" onClick={() => { setMobileOpen(false); setSearchOpen(true) }}><Search size={19} /> جستجو در فروشگاه</button>
          {[
            ['خانه', '/'], ['همه محصولات', '/products'], ['مراقبت پوست', '/products?category=پوست'], ['مراقبت مو', '/products?category=مو'], ['آرایشی', '/products?category=آرایشی'], ['مکمل و سلامت', '/products?category=مکمل'], ['پیگیری سفارش', '/track'], ['ورود / ثبت‌نام', '/auth']
          ].map(([label, to]) => <Link key={label} to={to} onClick={() => setMobileOpen(false)}>{label}</Link>)}
        </aside>
      </div>}
    </>
  )
}
