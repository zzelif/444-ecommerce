"use client";

import { Product } from "@/generated/prisma/client";
import { formatPrice, titleCase } from "@/lib/utils";
import { Separator } from "@/components/ui/separator"

interface InfoProps {
    product: Product
}

const Info: React.FC<InfoProps> = ({ product }) => {
    return (
        <div>
            <h1 className='text-3xl font-semibold text-foreground'>{titleCase(product.name)}</h1>
            <div className='mt-3 flex items-end justify-between'>
                <h2 className="text-2xl font-medium text-foreground">
                    {formatPrice(product.price)}
                </h2>
            </div>
            <Separator className='my-4' />
            <div className='flex flex-col gap-y-6'>
                <h3 className='font-medium'>Description :</h3>
                {product.description ? (
                <p>{product.description}</p>
                ) : (
                <p>No description</p>
                )}
            </div>
        </div>
    )
}

export default Info