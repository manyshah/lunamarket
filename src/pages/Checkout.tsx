import { Check, ChevronLeft, CreditCard, MapPin, PackageCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

const formatPrice = (value: number) => new Intl.NumberFormat('fa-IR').format(value)

export function Checkout() {
  const { cart, cartTotal, clearCart, createOrder } = useShop()
  const [params] = useSearchParams()
  const [step, setStep] = useState(1)
  const [orderId, setOrderId] = useState('')
  const discount = params.get('coupon') === 'LUNA10' ? Math.round(cartTotal * 0.1) : 0
  const finalTotal = cartTotal - discount
  const [form, setForm] = useState({ name: '', phone: '', city: 'تهران', address: '' })
  const validAddress = useMemo(() => Boolean(form.name.trim() && form.phone.trim().length >= 10 && form.address.trim().length >= 8), [form])
  if (!cart.length && !orderId) return <div className="container inner-page empty-state"><h1>سبد خرید خالی است.</h1><Link className="button button--dark" to="/products">بازگشت به فروشگاه</Link></div>
  const finish = () => { const order = createOrder(finalTotal); setOrderId(order.id); clearCart(); setStep(4) }
  return (
    <div className="container inner-page checkout-page">
      <div className="checkout-header"><Link to="/cart"><ChevronLeft /> بازگشت به سبد</Link><div className="checkout-steps">{[1,2,3].map(index => <span key={index} className={step >= index ? 'is-active' : ''}><b>{step > index ? <Check size={15} /> : index.toLocaleString('fa-IR')}</b></span>)}</div></div>
      {step === 1 && <section className="checkout-card"><div className="checkout-card__title"><MapPin /><div><h1>آدرس تحویل</h1><p>اطلاعات Demo برای ادامه فرایند خرید.</p></div></div><div className="form-grid"><label>نام و نام خانوادگی<input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="مثلاً محمد احمدی" /></label><label>شماره موبایل<input inputMode="numeric" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="09xxxxxxxxx" /></label><label>شهر<select value={form.city} onChange={e => setForm({...form, city: e.target.value})}><option>تهران</option><option>شیراز</option><option>اصفهان</option><option>مشهد</option></select></label><label className="form-grid__full">آدرس<textarea value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="آدرس کامل برای Demo..." /></label></div><button disabled={!validAddress} className="button button--dark button--full" onClick={() => setStep(2)}>ادامه به روش ارسال</button></section>}
      {step === 2 && <section className="checkout-card"><div className="checkout-card__title"><PackageCheck /><div><h1>روش ارسال</h1><p>یک روش ارسال را برای سفارش نمایشی انتخاب کن.</p></div></div><button className="shipping-option is-active"><span><b>ارسال اکسپرس لونا</b><small>تحویل نمایشی ۱ تا ۲ روز کاری</small></span><strong>رایگان</strong></button><button className="button button--dark button--full" onClick={() => setStep(3)}>ادامه به پرداخت</button></section>}
      {step === 3 && <section className="checkout-card"><div className="checkout-card__title"><CreditCard /><div><h1>پرداخت Demo</h1><p>هیچ درگاه یا تراکنش واقعی در این نسخه وجود ندارد.</p></div></div><div className="fake-card"><span>LUNA DEMO CARD</span><strong>•••• •••• •••• ۱۴۰۵</strong><small>PORTFOLIO PAYMENT</small></div><div className="checkout-total"><span>مبلغ سفارش</span><strong>{formatPrice(finalTotal)} تومان</strong></div><button className="button button--dark button--full" onClick={finish}>ثبت سفارش نمایشی</button></section>}
      {step === 4 && <section className="checkout-card checkout-success"><div className="success-icon"><Check /></div><span className="section-kicker">ORDER CREATED</span><h1>سفارش نمایشی ثبت شد.</h1><p>کد سفارش شما <b>{orderId}</b> است. می‌توانی Timeline پیگیری سفارش را هم تست کنی.</p><div className="success-actions"><Link className="button button--dark" to={`/track?id=${orderId}`}>پیگیری سفارش</Link><Link className="button button--ghost" to="/">بازگشت به خانه</Link></div></section>}
    </div>
  )
}
