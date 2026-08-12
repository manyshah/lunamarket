import { Heart, Plus, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { useShop } from '../context/ShopContext'
import { ProductVisual } from './ProductVisual'

const formatPrice = (value: number) => new Intl.NumberFormat('fa-IR').format(value)

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop()
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0
  return (
    <article className="product-card">
      <div className="product-card__visual-wrap">
        {product.badge && <span className="badge">{product.badge}</span>}
        {discount > 0 && <span className="discount-badge">{discount}٪</span>}
        <button className={`icon-button product-card__wish ${isWishlisted(product.id) ? 'is-active' : ''}`} onClick={() => toggleWishlist(product.id)} aria-label="افزودن به علاقه‌مندی">
          <Heart size={18} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
        </button>
        <Link to={`/product/${product.slug}`} className="product-card__visual-link"><ProductVisual product={product} /></Link>
      </div>
      <div className="product-card__content">
        <span className="product-card__brand">{product.brand}</span>
        <Link to={`/product/${product.slug}`} className="product-card__title">{product.shortTitle}</Link>
        <div className="rating-row"><Star size={15} fill="currentColor" /><strong>{product.rating.toLocaleString('fa-IR')}</strong><span>({product.reviews.toLocaleString('fa-IR')})</span></div>
        <div className="product-card__bottom">
          <div>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}<div className="price">{formatPrice(product.price)} <small>تومان</small></div></div>
          <button className="add-button" onClick={() => addToCart(product.id)} aria-label="افزودن به سبد"><Plus size={20} /></button>
        </div>
      </div>
    </article>
  )
}
