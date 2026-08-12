import { Check, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductVisual } from '../components/ProductVisual'
import { ProductCard } from '../components/ProductCard'
import { products } from '../data/products'
import { useShop } from '../context/ShopContext'

const formatPrice = (value: number) => new Intl.NumberFormat('fa-IR').format(value)

export function ProductDetail() {
  const { slug } = useParams()
  const product = products.find(item => item.slug === slug)
  const [quantity, setQuantity] = useState(1)
  const [tab, setTab] = useState<'about' | 'details' | 'reviews'>('about')
  const { addToCart, toggleWishlist, isWishlisted } = useShop()
  if (!product) return <div className="container empty-state"><h2>محصول پیدا نشد.</h2><Link className="button button--dark" to="/products">بازگشت به فروشگاه</Link></div>
  const related = products.filter(item => item.category === product.category && item.id !== product.id).slice(0, 4)
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0
  return (
    <div className="container inner-page">
      <div className="breadcrumbs"><Link to="/">خانه</Link><span>/</span><Link to="/products">محصولات</Link><span>/</span><b>{product.shortTitle}</b></div>
      <section className="product-detail">
        <div className="product-gallery"><div className="product-gallery__main"><ProductVisual product={product} large /></div><div className="gallery-thumbs">{[0,1,2].map(index => <button key={index} className={index === 0 ? 'is-active' : ''}><span style={{ background: product.accent }} /></button>)}</div></div>
        <div className="product-info">
          <div className="product-info__topline"><span>{product.brand}</span><button className={`icon-button ${isWishlisted(product.id) ? 'is-active' : ''}`} onClick={() => toggleWishlist(product.id)}><Heart fill={isWishlisted(product.id) ? 'currentColor' : 'none'} /></button></div>
          <h1>{product.title}</h1>
          <div className="product-info__rating"><Star size={17} fill="currentColor" /><b>{product.rating.toLocaleString('fa-IR')}</b><span>{product.reviews.toLocaleString('fa-IR')} نظر</span><i>موجود در انبار</i></div>
          <div className="product-info__price">{discount > 0 && <span className="discount-badge">{discount}٪</span>}<div>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}<strong>{formatPrice(product.price)} <small>تومان</small></strong></div></div>
          <p className="product-info__description">{product.description}</p>
          <ul className="benefits-list">{product.benefits.map(item => <li key={item}><Check size={17} /> {item}</li>)}</ul>
          <div className="purchase-row"><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={17} /></button><span>{quantity.toLocaleString('fa-IR')}</span><button onClick={() => setQuantity(quantity + 1)}><Plus size={17} /></button></div><button className="button button--dark purchase-button" onClick={() => addToCart(product.id, quantity)}><ShoppingBag size={19} /> افزودن به سبد خرید</button></div>
          <div className="mini-trust"><span><Truck /> ارسال سریع</span><span><ShieldCheck /> ضمانت تجربه Demo</span></div>
        </div>
      </section>
      <section className="product-tabs">
        <div className="tab-buttons"><button className={tab === 'about' ? 'is-active' : ''} onClick={() => setTab('about')}>درباره محصول</button><button className={tab === 'details' ? 'is-active' : ''} onClick={() => setTab('details')}>مشخصات</button><button className={tab === 'reviews' ? 'is-active' : ''} onClick={() => setTab('reviews')}>نظرات</button></div>
        <div className="tab-content">{tab === 'about' && <><h3>معرفی محصول</h3><p>{product.description} این متن برای نسخه Portfolio نوشته شده و بعداً می‌تواند با محتوای واقعی Backend جایگزین شود.</p></>}{tab === 'details' && <div className="spec-list"><span><b>برند</b><em>{product.brand}</em></span><span><b>دسته‌بندی</b><em>{product.category}</em></span><span><b>نوع فروش</b><em>نسخه نمایشی</em></span><span><b>موجودی</b><em>موجود</em></span></div>}{tab === 'reviews' && <div className="review-demo"><div className="review-score">{product.rating.toLocaleString('fa-IR')}</div><div><b>امتیاز کاربران Demo</b><p>{product.reviews.toLocaleString('fa-IR')} نظر نمونه برای نمایش UI.</p></div></div>}</div>
      </section>
      {related.length > 0 && <section className="products-section"><div className="section-header"><div><span className="section-kicker">YOU MAY ALSO LIKE</span><h2>محصولات مشابه</h2></div></div><div className="product-grid">{related.map(item => <ProductCard key={item.id} product={item} />)}</div></section>}
    </div>
  )
}
