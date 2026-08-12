import { Check, PackageCheck, Search, Truck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

export function TrackOrder() {
  const [params, setParams] = useSearchParams()
  const [value, setValue] = useState(params.get('id') ?? 'LN-140500')
  const [searched, setSearched] = useState(Boolean(params.get('id')))
  const { orders } = useShop()
  const order = useMemo(() => orders.find(item => item.id.toLowerCase() === value.trim().toLowerCase()), [orders, value])
  const isDemo = value.trim().toUpperCase() === 'LN-140500'
  const found = searched && Boolean(order || isDemo)
  const runSearch = () => { setSearched(true); setParams(value.trim() ? { id: value.trim() } : {}) }
  return (
    <div className="container inner-page track-page">
      <div className="page-heading page-heading--center"><span className="section-kicker">ORDER TRACKING</span><h1>پیگیری سفارش</h1><p>کد سفارش Demo را وارد کن و Timeline را ببین.</p></div>
      <div className="tracking-search"><input value={value} onChange={event => { setValue(event.target.value); setSearched(false) }} placeholder="مثلاً LN-140500" /><button className="button button--dark" onClick={runSearch}><Search size={18} /> پیگیری</button></div>
      <div className="demo-hint">کد آماده برای تست: <button onClick={() => { setValue('LN-140500'); setSearched(false) }}>LN-140500</button></div>
      {searched && !found && <div className="empty-inline">سفارشی با این کد پیدا نشد. برای Demo از LN-140500 استفاده کن.</div>}
      {found && <section className="tracking-card"><div className="tracking-card__head"><span><small>کد سفارش</small><b>{order?.id ?? 'LN-140500'}</b></span><span className="status-chip">در حال ارسال</span></div><div className="timeline"><div className="timeline-item is-done"><b><Check /></b><span><strong>ثبت سفارش</strong><small>سفارش با موفقیت ثبت شد.</small></span></div><div className="timeline-item is-done"><b><PackageCheck /></b><span><strong>آماده‌سازی</strong><small>محصولات بررسی و بسته‌بندی شدند.</small></span></div><div className="timeline-item is-current"><b><Truck /></b><span><strong>تحویل به پیک</strong><small>سفارش در مسیر مقصد است.</small></span></div><div className="timeline-item"><b><Check /></b><span><strong>تحویل شده</strong><small>پس از تحویل نهایی تکمیل می‌شود.</small></span></div></div></section>}
    </div>
  )
}
