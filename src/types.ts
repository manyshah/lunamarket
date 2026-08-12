export type Category = 'پوست' | 'مو' | 'مکمل' | 'آرایشی' | 'بهداشتی'

export interface Product {
  id: number
  slug: string
  title: string
  shortTitle: string
  brand: string
  category: Category
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  badge?: string
  featured?: boolean
  bestSeller?: boolean
  visual: 'jar' | 'bottle' | 'box' | 'tube' | 'dropper'
  accent: string
  description: string
  benefits: string[]
}

export interface CartItem {
  productId: number
  quantity: number
}

export interface DemoOrder {
  id: string
  createdAt: string
  total: number
  status: 'processing' | 'packed' | 'sent' | 'delivered'
}
