//src\components\types\images.d.ts

import { Product } from '@/generated/prisma/client'

export type Image = Pick<Product, 'imageUrl' | 'name'> & {

  url: string
}