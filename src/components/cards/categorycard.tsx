import { ProductType } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Link from "next/link";
import { Magnet, Flame, type LucideIcon } from "lucide-react"
import React from "react";

interface CategoryCardProps {
  category: {
    slug: ProductType;
    name: string;
  };
}

const getIconBySlug = (slug: ProductType) => {
  const iconMap: Record<ProductType, LucideIcon> = {
    candle: Flame,
    magnet: Magnet,
  };
  
  return iconMap[slug] || Flame;
};

const CategoryCard = async ({ category }: CategoryCardProps) => {
  const products = await prisma.product.count({
    where: { type: category.slug }
  });

  const IconComponent = getIconBySlug(category.slug);

  return (
    <Link href={`/products?category=${category.slug}`}>
      <Card className="group relative h-full w-full overflow-hidden rounded-lg bg-transparent transition-colors hover:bg-primary">
        <CardHeader>
          <IconComponent className="h-8 w-8" />
        </CardHeader>
        <CardContent className="space-y-1.5">
          <CardTitle className="text-2xl text-primary capitalize group-hover:text-primary-foreground">
            {category.name}
          </CardTitle>
          <CardDescription className="group-hover:text-primary-foreground">
            {products} Products
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
