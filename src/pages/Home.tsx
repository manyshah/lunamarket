import { ArrowLeft, HeartHandshake, PackageCheck, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { HeroSlider } from '../components/HeroSlider'
import { ProductCard } from '../components/ProductCard'
import { SectionHeader } from '../components/SectionHeader'
import { products } from '../data/products'

export function Home() {
  const best = products.filter(product => product.bestSeller).slice(0, 4)
  const featured = products.filter(product => product.featured).slice(0, 4)
  return (
    <div className="container page-home">
      <HeroSlider />
      <section className="category-showcase">
        {[
          ['پوست', 'روتین پوستی', 'skin'], ['مو', 'مراقبت مو', 'hair'], ['آرایشی', 'آرایش', 'makeup'], ['مکمل', 'مکمل و سلامت', 'supplement']
        ].map(([category, label, tone]) => <Link key={category} to={`/products?category=${category}`} className={`category-tile category-tile--${tone}`}><span className="category-tile__art"><Sparkles /></span><small>COLLECTION</small><strong>{label}</strong><span>مشاهده <ArrowLeft size={16} /></span></Link>)}
      </section>
      <section className="products-section" id="best-sellers"><SectionHeader kicker="BEST SELLERS" title="محبوب‌ترین‌های لونا" to="/products?sort=popular" /><div className="product-grid">{best.map(product => <ProductCard product={product} key={product.id} />)}</div></section>
      <section className="editorial-banner">
        <div className="editorial-banner__copy"><span className="section-kicker">LUNA EDITORIAL</span><h2>زیبایی، وقتی حرفه‌ای طراحی می‌شود.</h2><p>نسخه اولیه با تمرکز روی Portfolio: سلسله‌مراتب بصری دقیق، تجربه خرید قابل تست و معماری آماده اتصال به API واقعی.</p><Link className="button button--light" to="/products">شروع خرید نمایشی</Link></div>
        <div className="editorial-banner__art"><span className="editorial-ring" /><div className="editorial-bottle"><span>LUNA<br/>01</span></div><div className="editorial-box"><span>CARE<br/>SERIES</span></div></div>
      </section>
      <section className="products-section"><SectionHeader kicker="CURATED FOR YOU" title="انتخاب‌های امروز" /><div className="product-grid">{featured.map(product => <ProductCard product={product} key={product.id} />)}</div></section>
      <section className="trust-strip"><div><Truck /><span><b>ارسال سریع</b><small>تجربه Demo برای تمام شهرها</small></span></div><div><ShieldCheck /><span><b>خرید مطمئن</b><small>Flow کامل و شفاف Checkout</small></span></div><div><PackageCheck /><span><b>پیگیری سفارش</b><small>Timeline وضعیت سفارش</small></span></div><div><HeartHandshake /><span><b>پشتیبانی</b><small>ساختار آماده اتصال واقعی</small></span></div></section>
    </div>
  )
}
