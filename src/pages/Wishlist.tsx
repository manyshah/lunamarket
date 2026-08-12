import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { products } from '../data/products'
import { useShop } from '../context/ShopContext'

export function Wishlist() {
  const { wishlist } = useShop()
  const list = products.filter(product => wishlist.includes(product.id))
  return <div className="container inner-page"><div className="page-heading"><span className="section-kicker">SAVED FOR LATER</span><h1>علاقه‌مندی‌ها</h1><p>محصولاتی که برای بعد ذخیره کرده‌ای.</p></div>{list.length ? <div className="product-grid product-grid--catalog">{list.map(product => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><div className="empty-state__icon"><Heart /></div><h2>لیست علاقه‌مندی خالی است.</h2><p>روی قلب کارت محصولات بزن تا اینجا ذخیره شوند.</p><Link className="button button--dark" to="/products">مشاهده محصولات</Link></div>}</div>
}
