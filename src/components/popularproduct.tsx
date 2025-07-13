import ProductCard from "@/components/cards/productcard";
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
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ) )}
        </div>
    )
}

export default PopularProducts