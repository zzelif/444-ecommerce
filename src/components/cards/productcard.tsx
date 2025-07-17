//src\components\cards\productcard.tsx

'use client'

import { Product } from '@/generated/prisma/client'
// import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
// import { MouseEventHandler } from 'react'

// import { Button } from '@/components/ui/button'
import { formatPrice, slugify, titleCase } from '@/lib/utils'
// import useCart from '@/hooks/useCart'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const cart = useCart()

//   const onAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
//     e.preventDefault()
//     cart.addItem(product)
//   }

  const productUrl = `/products/${slugify(product.name)}?productId=${product.id}`

  return (
    <div className='group/card h-full space-y-4 rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-2xl'>
      <Link href={productUrl}>
        <div className='relative aspect-square m-3 overflow-hidden rounded-2xl bg-gray-100'>
          <Image
            src={product.imageUrl}
            alt={product.imageUrl}
            fill
            sizes='200px'
            className='object-cover rounded-2xl'
          />
        </div>

        <div className='space-y-3 px-4 pb-6'>
          <div className='space-y-1'>
            <p className='text-sm capitalize text-gray-500'>{product.type}</p>
            <p
              className='truncate text-lg font-semibold group-hover/card:text-emerald-800'
              title={product.name}
            >
              {titleCase(product.name)}
            </p>
            
          </div>

          <div className='flex items-center justify-between'>
            <div className='font-semibold text-emerald-700'>
              {formatPrice(product.price)}
            </div>

            <div className='group/icon'>
              {/* <Button
                aria-label='Add to cart'
                className='bg-emerald-50 group-hover/icon:bg-emerald-500'
                // onClick={onAddToCart}
              >
                <ShoppingCart
                    size={20}
                    className='text-emerald-600 group-hover/icon:text-white'
                  />
              </Button> */}
              
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
