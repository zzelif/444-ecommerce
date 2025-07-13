import { ProductType } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  category: {
    slug: ProductType;
    name: string;
  };
}

const CategoryCard = async ({ category }: CategoryCardProps) => {
  const products = await prisma.product.count({
    where: { type: category.slug }
  });

  return (
    <Link href={`/products?category=${category.slug}`}>
      <Card className="group relative h-full w-full overflow-hidden rounded-lg bg-transparent transition-colors hover:bg-emerald-600">
        <CardHeader>
          <Image
            src={`/svg/${category.slug}.svg`}
            alt={category.name}
            width={32}
            height={32}
          />
        </CardHeader>
        <CardContent className="space-y-1.5">
          <CardTitle className="text-2xl text-emerald-600 capitalize group-hover:text-white">
            {category.name}
          </CardTitle>
          <CardDescription className="group-hover:text-white">
            {products} Products
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
