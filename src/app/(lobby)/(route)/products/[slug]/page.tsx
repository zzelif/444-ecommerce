// src/app/(lobby)/products/[slug]/page.tsx

import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { cache } from 'react'
import { notFound } from 'next/navigation'
import Gallery from '@/components/gallery/gallery'
import Info from '@/components/info'

interface ProductPageProps {
  params: Promise<{ slug: string, }>
  searchParams: Promise<{productId: string}>
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({where: {id}})
  if (!product) notFound()
    return product
})

export async function generateMetadata({searchParams}: ProductPageProps): Promise<Metadata> {
  const { productId } = await searchParams
  if (!productId) notFound()

  const product = await getProduct(productId);

  return {
    title: product.name + " - 444 Custom Print Hub",
    description: product.description,
    openGraph: {
      images: [{url: product.imageUrl}]
    },

  }
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const { productId } = await searchParams
  if (!productId) return notFound()

  const product = await getProduct(productId)

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

