import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  { eyebrow: 'LUNA BEAUTY EDIT', title: 'روتین زیبایی، با انتخاب‌های دقیق‌تر', text: 'فروشگاهی مدرن برای مراقبت پوست، مو و زیبایی؛ طراحی شده برای یک تجربه خرید سریع و شفاف.', cta: 'مشاهده محصولات', link: '/products', tone: 'rose' },
  { eyebrow: 'SUMMER CARE', title: 'سبک، روشن، آماده‌ی تابستان', text: 'محصولات منتخب مراقبت روزانه با یک تجربه بصری نرم، مینیمال و کاملاً Responsive.', cta: 'کالکشن پوست', link: '/products?category=پوست', tone: 'peach' },
  { eyebrow: 'LUNA SELECT', title: 'پرفروش‌هایی که ارزش دیدن دارند', text: 'از مکمل‌های زیبایی تا مراقبت تخصصی؛ همه در یک Showcase حرفه‌ای و قابل ارائه به‌عنوان Portfolio.', cta: 'پرفروش‌ها', link: '/products?sort=popular', tone: 'lavender' }
]

export function HeroSlider() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStart = useRef<number | null>(null)

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(() => setActive(current => (current + 1) % slides.length), 10000)
    return () => window.clearInterval(timer)
  }, [paused])

  const go = (index: number) => setActive((index + slides.length) % slides.length)
  const onTouchStart = (event: React.TouchEvent) => { touchStart.current = event.touches[0].clientX }
  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStart.current === null) return
    const delta = event.changedTouches[0].clientX - touchStart.current
    if (Math.abs(delta) > 45) go(delta > 0 ? active - 1 : active + 1)
    touchStart.current = null
  }

  return (
    <section className="hero-shell" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="hero-slider" style={{ transform: `translateX(${active * 100}%)` }}>
        {slides.map(slide => (
          <article className={`hero-slide hero-slide--${slide.tone}`} key={slide.title}>
            <div className="hero-copy">
              <span className="hero-eyebrow"><Sparkles size={16} /> {slide.eyebrow}</span>
              <h1>{slide.title}</h1><p>{slide.text}</p>
              <div className="hero-actions"><Link to={slide.link} className="button button--dark">{slide.cta}</Link><a href="#best-sellers" className="button button--ghost">انتخاب‌های امروز</a></div>
            </div>
            <div className="hero-art" aria-hidden="true">
              <span className="hero-bubble hero-bubble--a" /><span className="hero-bubble hero-bubble--b" />
              <div className="hero-product hero-product--back"><span>LUNA</span></div><div className="hero-product hero-product--front"><span>SKIN</span></div><div className="hero-disc">NEW<br />CARE</div>
            </div>
          </article>
        ))}
      </div>
      <button className="hero-arrow hero-arrow--right" onClick={() => go(active - 1)} aria-label="اسلاید قبلی"><ChevronRight /></button>
      <button className="hero-arrow hero-arrow--left" onClick={() => go(active + 1)} aria-label="اسلاید بعدی"><ChevronLeft /></button>
      <div className="hero-dots">{slides.map((_, index) => <button key={index} className={active === index ? 'is-active' : ''} onClick={() => go(index)} aria-label={`اسلاید ${index + 1}`}><span className={active === index && !paused ? 'dot-progress' : ''} /></button>)}</div>
    </section>
  )
}
