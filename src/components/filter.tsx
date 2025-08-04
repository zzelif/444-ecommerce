// src\components\filter.tsx

"use client"

import { categories } from '@/lib/categories'

import { Filter as FilterIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from "react"

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle, 
  SheetTrigger,
  SheetDescription,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

interface FilterProps extends React.HTMLAttributes<HTMLDivElement> {
    categories: typeof categories
}

const Filter: React.FC<FilterProps> = ({ categories, className, ...props }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    // const router = useRouter()
    const searchParams = useSearchParams()

    const selectedCategory = searchParams.get("category")

    const changeCategory = (categorySlug: string) => {
    setIsOpen(false)

    const url = new URL(window.location.href)

    if (!categorySlug || categorySlug === selectedCategory) {

        url.searchParams.delete('category')
    } else {
        url.searchParams.set('category', categorySlug)
    }

    window.location.assign(url.toString())
    }

    return (
        <div className={cn('flex', className)} {...props}>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" className='flex items-center gap-x-2 rounded-full'>
                        <FilterIcon/>
                        Filters
                        {selectedCategory && (
                            <span className="ml-1 rounded-full bg-chart-2 px-2 py-0.5 text-xs text-primary-foreground">
                                1
                            </span>
                        )}
                    </Button>
                </SheetTrigger>
                
                <SheetContent side='right'>
                    <SheetHeader>
                        <div className='flex flex-col gap-4'>
                            <SheetTitle className='text-lg font-semibold'>
                            Filter Products
                            </SheetTitle>
                            <SheetDescription>
                                Choose a category to filter products
                            </SheetDescription>

                            <Separator />
                                
                            <div className='flex flex-wrap gap-2'>
                                <Button
                                    variant={!selectedCategory ? 'default' : 'outline'}
                                    className="rounded-full"
                                    onClick={() => changeCategory('')}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <span>All Products</span>
                                        
                                    </div>
                                </Button>

                                {categories.map((category) => (
                                    <Button
                                        key={category.slug}
                                        variant={selectedCategory === category.slug ? 'default' : 'outline'}
                                        className="rounded-full"
                                        onClick={() => changeCategory(category.slug)}
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <span>{category.name}</span>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                        </div>
                        
                    </SheetHeader>
                
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Filter