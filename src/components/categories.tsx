import { Suspense } from "react";
import Link from "next/link"
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/categories";
import CategoryCard from "@/components/cards/categorycard";
import CategoryCardSkeleton from "@/components/skeletons/categorycardskeleton";

const Categories = () => {
    return (
        <section id="categories" aria-labelledby="categories-heading"
      className="space-y-8 px-4 py-8 sm:px-6 sm:pb-28 md:pt-10 lg:px-8 lg:pt-24">
        <div className="flex items-end justify-between">
            <div className="flex flex-col space-y-4">
                <h2 className="max-w-sm text-start text-3xl leading-[1.1] font-bold text-emerald-600 md:text-5xl">
            Featured Categories
                </h2>
                <h3 className="text-muted-foreground leading-normal sm:text-lg sm:leading-7">
                    Find the best quality and service to meet your printing and design
                    needs
                </h3>
            </div>
            <Link
            href="/products"
            className="hidden gap-1 text-emerald-700 transition-all hover:translate-x-1 hover:text-emerald-600 md:flex"
            >
            Browse the collection <ArrowRight />
            </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
                <Suspense key={category.slug} fallback={<CategoryCardSkeleton/>}>
                    <CategoryCard category={category} />
                </Suspense>
            ))}
        </div>
      </section>
    )
}

export default Categories