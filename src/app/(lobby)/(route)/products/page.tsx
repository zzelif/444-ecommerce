// src\app\(lobby)\products\page.tsx

import type { ProductType } from "@/generated/prisma/enums"
import { prisma } from "@/lib/prisma"
import { categories, INFINITE_SCROLL_LIMIT } from "@/lib/categories"
import { Heading } from "@/components/heading"
import Filter from "@/components/filter"
import ProductsList from "@/components/productslist"

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Products = async ({
    searchParams
}: ProductsPageProps) => {

    let products
    let totalProducts

    const resolvedSearchParams = await searchParams;
    const rawCategoryParam = resolvedSearchParams?.["category"];
    //const typedCategoryParam = Array.isArray(rawCategoryParam) ? rawCategoryParam[0] : rawCategoryParam;

    const category = rawCategoryParam as ProductType | undefined

    if (category) {
        const productsWithCategory = await prisma.product.findMany({
           where: category ? { type: category } : undefined,
            orderBy: {
                createdAt: 'desc',
            },
            take: INFINITE_SCROLL_LIMIT,
        })

        const totalProductsWithCategory = await prisma.product.count({
            where: category ? { type: category } : undefined,
        })

        products = productsWithCategory
        totalProducts = totalProductsWithCategory
        console.log("total: ", totalProductsWithCategory)

    } else {
        const productWithoutCategory = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: INFINITE_SCROLL_LIMIT,
        })

        const totalProductsWithoutCategory = await prisma.product.count()

        products = productWithoutCategory
        totalProducts = totalProductsWithoutCategory

        console.log("total: ", totalProductsWithoutCategory)
    }

    return (
        <div className="flex flex-col py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
            <Heading
                title={`Products (${totalProducts})`}
                description='Explore all the products we offer'
            />
            <Filter categories={categories} className="mt-8 sm:mt-10 mb-4 sm:mb-6"/>
            <ProductsList initialProducts={products} totalData={totalProducts}/>
        </div>
        
    )
}

export default Products