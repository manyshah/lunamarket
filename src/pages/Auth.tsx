import { ArrowLeft, Check, LockKeyhole, Smartphone } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function Auth() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const submitPhone = () => { if (!/^09\d{9}$/.test(phone)) return setError('شماره موبایل را به شکل 09xxxxxxxxx وارد کن.'); setError(''); setStep('otp') }
  const submitOtp = () => { if (otp !== '12345') return setError('کد Demo برابر 12345 است.'); localStorage.setItem('luna-demo-user', JSON.stringify({ phone, name: 'کاربر لونا' })); navigate('/profile') }
  return (
    <div className="auth-page">
      <div className="auth-art"><Link className="auth-back" to="/"><ArrowLeft /> بازگشت به فروشگاه</Link><div className="auth-art__content"><img src="./luna-logo.webp" alt="Luna Market" /><span className="section-kicker">LUNA MEMBERS</span><h1>خرید شخصی‌تر، سریع‌تر و مرتب‌تر.</h1><p>ورود و ثبت‌نام در یک Flow ساده؛ طراحی‌شده برای تجربه‌ای تمیزتر از فرم‌های سنتی فروشگاهی.</p><div className="auth-benefits"><span><Check /> مشاهده سفارش‌ها</span><span><Check /> علاقه‌مندی‌های پایدار</span><span><Check /> Checkout سریع‌تر</span></div></div></div>
      <div className="auth-form-side"><div className="auth-card"><span className="auth-icon">{step === 'phone' ? <Smartphone /> : <LockKeyhole />}</span><span className="section-kicker">WELCOME TO LUNA</span><h2>{step === 'phone' ? 'ورود یا ثبت‌نام' : 'کد تأیید'}</h2><p>{step === 'phone' ? 'شماره موبایل خودت را وارد کن.' : `کد ارسال‌شده به ${phone} را وارد کن.`}</p>
      {step === 'phone' ? <><label className="phone-field"><span>+98</span><input autoFocus inputMode="numeric" maxLength={11} value={phone} onChange={event => setPhone(event.target.value.replace(/\D/g, ''))} placeholder="09xxxxxxxxx" /></label><button className="button button--dark button--full" onClick={submitPhone}>ادامه</button></> : <><input className="otp-field" autoFocus inputMode="numeric" maxLength={5} value={otp} onChange={event => setOtp(event.target.value.replace(/\D/g, ''))} placeholder="— — — — —" /><div className="demo-code">کد نسخه Demo: <b>12345</b></div><button className="button button--dark button--full" onClick={submitOtp}>تأیید و ورود</button><button className="text-button" onClick={() => { setStep('phone'); setError('') }}>ویرایش شماره موبایل</button></>}
      {error && <div className="form-error">{error}</div>}<small className="auth-terms">با ادامه، قوانین استفاده و حریم خصوصی نسخه Demo را می‌پذیرید.</small></div></div>
    </div>
  )
}
