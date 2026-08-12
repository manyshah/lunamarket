import { Heart, LogOut, Package, UserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

const formatPrice = (value: number) => new Intl.NumberFormat('fa-IR').format(value)

export function Profile() {
  const navigate = useNavigate()
  const { orders, wishlist } = useShop()
  const raw = localStorage.getItem('luna-demo-user')
  const user = raw ? JSON.parse(raw) as { phone: string, name: string } : null
  if (!user) return <div className="container inner-page empty-state"><UserRound /><h1>هنوز وارد نشده‌ای.</h1><p>ورود Demo را تست کن.</p><Link className="button button--dark" to="/auth">ورود / ثبت‌نام</Link></div>
  const logout = () => { localStorage.removeItem('luna-demo-user'); navigate('/') }
  return (
    <div className="container inner-page"><div className="profile-hero"><div className="profile-avatar">{user.name.slice(0,1)}</div><div><span className="section-kicker">LUNA MEMBER</span><h1>{user.name}</h1><p>{user.phone}</p></div><button className="button button--ghost" onClick={logout}><LogOut size={18} /> خروج</button></div><div className="profile-stats"><Link to="/wishlist"><Heart /><span><b>{wishlist.length.toLocaleString('fa-IR')}</b><small>علاقه‌مندی</small></span></Link><div><Package /><span><b>{orders.length.toLocaleString('fa-IR')}</b><small>سفارش Demo</small></span></div></div><section className="profile-orders"><div className="section-header"><div><span className="section-kicker">MY ORDERS</span><h2>سفارش‌های اخیر</h2></div></div>{orders.length === 0 ? <div className="empty-inline">هنوز سفارشی ثبت نشده. Checkout Demo را تست کن.</div> : orders.map(order => <Link className="order-row" key={order.id} to={`/track?id=${order.id}`}><span><b>{order.id}</b><small>{new Date(order.createdAt).toLocaleDateString('fa-IR')}</small></span><span><b>{formatPrice(order.total)} تومان</b><small>در حال پردازش</small></span></Link>)}</section></div>
  )
}
