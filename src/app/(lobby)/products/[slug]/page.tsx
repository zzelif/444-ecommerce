// src/app/(lobby)/products/[slug]/page.tsx

import { notFound } from 'next/navigation'
import { getProductById } from '@/lib/data'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params

  if (!id) return notFound()

  const product = await getProductById(id)

  if (!product) return notFound()

  return (
    <div className='max-w-4xl mx-auto px-4 py-10'>
      <div className='flex flex-col md:flex-row gap-10'>
        <div className='relative w-full md:w-1/2 aspect-square bg-gray-100 rounded-xl overflow-hidden'>
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className='object-cover'
          />
        </div>

        <div className='flex flex-col space-y-4 w-full md:w-1/2'>
          <h1 className='text-3xl font-bold text-emerald-700'>{product.name}</h1>
          <p className='text-sm text-gray-500 capitalize'>{product.type}</p>
          <p className='text-lg text-muted-foreground'>{product.description}</p>
          <p className='text-2xl font-bold text-emerald-600'>
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </div>
  )
}

