import type { Product } from '../types'

export function ProductVisual({ product, large = false }: { product: Product, large?: boolean }) {
  return (
    <div className={`product-visual ${large ? 'product-visual--large' : ''}`} style={{ '--accent': product.accent } as React.CSSProperties} aria-label={product.shortTitle}>
      <span className="visual-glow" />
      <div className={`mock-product mock-product--${product.visual}`}>
        <span className="mock-cap" />
        <span className="mock-label">LUNA</span>
        <span className="mock-sub">{product.brand}</span>
      </div>
      <span className="visual-orbit visual-orbit--one" />
      <span className="visual-orbit visual-orbit--two" />
    </div>
  )
}
