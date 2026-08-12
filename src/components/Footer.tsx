import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container newsletter">
        <div><span className="section-kicker">LUNA CLUB</span><h2>خبرهای خوب را زودتر بگیر.</h2><p>برای نسخه نمونه‌کار، فرم عضویت نمایشی است و اطلاعاتی ارسال نمی‌شود.</p></div>
        <form onSubmit={event => event.preventDefault()}><input type="email" placeholder="ایمیل شما" aria-label="ایمیل" /><button className="button button--dark">عضویت</button></form>
      </div>
      <div className="container footer-grid">
        <div className="footer-brand"><img src="./luna-logo.webp" alt="Luna Market" /><p>فروشگاه Demo زیبایی، سلامت و مراقبت؛ طراحی‌شده به‌عنوان نمونه‌کار Frontend حرفه‌ای.</p><div className="social-row"><button aria-label="اینستاگرام"><span className="social-glyph" aria-hidden="true">◎</span></button><button aria-label="ایمیل"><Mail /></button></div></div>
        <div><h3>فروشگاه</h3><Link to="/products">همه محصولات</Link><Link to="/products?category=پوست">مراقبت پوست</Link><Link to="/products?category=مو">مراقبت مو</Link><Link to="/wishlist">علاقه‌مندی‌ها</Link></div>
        <div><h3>خدمات مشتریان</h3><Link to="/track">پیگیری سفارش</Link><Link to="/auth">حساب کاربری</Link><a href="#!">قوانین و مقررات</a><a href="#!">سؤالات متداول</a></div>
        <div className="footer-contact"><h3>ارتباط با ما</h3><span><Phone size={17} /> ۰۲۱-۰۰۰۰۰۰۰۰</span><span><Mail size={17} /> hello@lunamarket.demo</span><span><MapPin size={17} /> تهران — Demo Address</span><span><ShieldCheck size={17} /> پرداخت و سفارش‌ها نمایشی‌اند</span></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Luna Market — Portfolio Edition</span><span>React · TypeScript · Vite · GitHub Pages</span></div>
    </footer>
  )
}
