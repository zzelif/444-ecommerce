// src/app/(lobby)/products/[slug]/page.tsx

import { notFound } from 'next/navigation'
import { getProductById } from '@/lib/data'
import Gallery from '@/components/gallery/gallery'
import Info from '@/components/info'

interface ProductPageProps {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ productId?: string }>
}

export default async function ProductPage({
  searchParams,
}: ProductPageProps) {
  const {productId} = await searchParams || {}

  if (!productId) return notFound()

  const product = await getProductById(productId)

  if (!product) return notFound()

    const images = [
  {
    name: product.name,
    url: product.imageUrl,
    imageUrl: product.imageUrl
  },
]

  return (
    <div className='p-4 sm:p-6 lg:px-8'>
      <div className='grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:items-start lg:gap-x-8'>
        <Gallery images={images}/>
        <Info product={product}/>
      </div>
    </div>
  )
}

