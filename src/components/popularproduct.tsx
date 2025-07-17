import ProductCard from "@/components/cards/productcard";
import { ProductType } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

const PopularProducts = async () => {
    const products = await prisma.product.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        take: 8,
    })

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product: { name: string; id: string; description: string; imageUrl: string; price: number; type: ProductType; createdAt: Date; updatedAt: Date; }) => (
                <ProductCard key={product.id} product={product} />
            ) )}
        </div>
    )
}

export default PopularProducts