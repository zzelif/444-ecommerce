import { ArrowRight, ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import PopularProductsSkeleton from '@/components/skeletons/popularproductskeleton'
import PopularProducts from '@/components/popularproduct'

const Product = () => {
    return (
        <section id="products" aria-labelledby='product-heading'
      className="space-y-8 px-4 sm:px-6 lg:px-8 py-8 md:pt-10 lg:pt-24">
        <div className='flex items-end justify-between'>
        <div className='flex flex-col space-y-4'>
          <h2 className='text-3xl md:text-5xl text-start text-emerald-600 font-bold leading-[1.1]'>
            Popular Products
          </h2>
          <h3 className='leading-normal text-muted-foreground sm:text-lg sm:leading-7'>
            Explore all products we offer to meet your needs
          </h3>
        </div>
        <Link
          href='/products'
          className='hidden md:flex gap-1 text-emerald-700 hover:translate-x-1 hover:text-emerald-600 transition-all'
        >
          Shop the collection <ArrowRight />
        </Link>
      </div>
      <Suspense fallback={<PopularProductsSkeleton />}>
        <PopularProducts />
      </Suspense>
      <Link
        href='/products'
        className={cn(
          buttonVariants(),
          'mx-auto bg-emerald-700 flex w-fit hover:before:-translate-x-48',
        )}
      >
        View all products
        <ArrowRightIcon className='ml-2 h-4 w-4' aria-hidden='true' />
      </Link>
      </section>
    )
}

export default Product