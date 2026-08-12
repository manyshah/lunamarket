import { SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { categories, products } from '../data/products'

export function Products() {
  const [params, setParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const query = params.get('q') ?? ''
  const category = params.get('category') ?? 'همه'
  const sort = params.get('sort') ?? 'recommended'
  const visible = useMemo(() => {
    let list = [...products]
    if (category !== 'همه') list = list.filter(product => product.category === category)
    if (query) { const q = query.toLowerCase(); list = list.filter(product => `${product.title} ${product.brand} ${product.category}`.toLowerCase().includes(q)) }
    if (sort === 'cheap') list.sort((a, b) => a.price - b.price)
    if (sort === 'expensive') list.sort((a, b) => b.price - a.price)
    if (sort === 'popular') list.sort((a, b) => b.reviews - a.reviews)
    return list
  }, [category, query, sort])
  const setParam = (key: string, value: string) => { const next = new URLSearchParams(params); if (!value || value === 'همه') next.delete(key); else next.set(key, value); setParams(next) }
  return (
    <div className="container inner-page">
      <div className="page-heading"><span className="section-kicker">LUNA SHOP</span><h1>همه محصولات</h1><p>{query ? `نتایج جستجو برای «${query}»` : 'کالکشن نمایشی محصولات زیبایی، مراقبتی و سلامت.'}</p></div>
      <div className="catalog-toolbar"><button className="filter-button" onClick={() => setFiltersOpen(true)}><SlidersHorizontal size={18} /> فیلترها</button><div className="category-pills">{categories.map(item => <button key={item} className={category === item ? 'is-active' : ''} onClick={() => setParam('category', item)}>{item}</button>)}</div><select value={sort} onChange={event => setParam('sort', event.target.value)} aria-label="مرتب‌سازی"><option value="recommended">پیشنهادی</option><option value="popular">محبوب‌ترین</option><option value="cheap">ارزان‌ترین</option><option value="expensive">گران‌ترین</option></select></div>
      <div className="catalog-meta"><span>{visible.length.toLocaleString('fa-IR')} محصول</span>{query && <button onClick={() => setParam('q', '')}><X size={15} /> حذف جستجو</button>}</div>
      {visible.length ? <div className="product-grid product-grid--catalog">{visible.map(product => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><div className="empty-state__icon">⌕</div><h2>چیزی پیدا نشد.</h2><p>فیلتر یا عبارت جستجو را تغییر بده.</p><button className="button button--dark" onClick={() => setParams({})}>حذف همه فیلترها</button></div>}
      {filtersOpen && <div className="mobile-drawer-backdrop" onClick={() => setFiltersOpen(false)}><aside className="filter-drawer" onClick={event => event.stopPropagation()}><div className="filter-drawer__head"><h3>فیلتر محصولات</h3><button className="icon-button" onClick={() => setFiltersOpen(false)}><X /></button></div><span className="filter-label">دسته‌بندی</span><div className="filter-list">{categories.map(item => <button key={item} className={category === item ? 'is-active' : ''} onClick={() => setParam('category', item)}>{item}</button>)}</div><button className="button button--dark button--full" onClick={() => setFiltersOpen(false)}>مشاهده {visible.length.toLocaleString('fa-IR')} محصول</button></aside></div>}
    </div>
  )
}
