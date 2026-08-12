import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function SectionHeader({ kicker, title, to = '/products' }: { kicker: string, title: string, to?: string }) {
  return <div className="section-header"><div><span className="section-kicker">{kicker}</span><h2>{title}</h2></div><Link to={to}>مشاهده همه <ArrowLeft size={18} /></Link></div>
}
