//src\app\api\products\routes.ts

import {prisma} from "@/lib/prisma"
import { z } from "zod"
import { ProductType } from "@/generated/prisma/client"

export async function GET(req: Request) {
    try {
        const url = new URL(req.url)

        const { limit, page, category } = z
            .object({
                limit: z.string(),
                page: z.string(),
                category: z.string(),
            })
            .parse({
                limit: url.searchParams.get('limit'),
                page: url.searchParams.get('page'),
                category: url.searchParams.get('category'),
            })
        
        let result

        if (category != 'null') {
            const products = await prisma.product.findMany({
                where: {
                    type: category as ProductType
                },
                take: parseInt(limit),
                skip: (parseInt(page) - 1) * parseInt(limit),
                orderBy: {
                    createdAt: 'desc'
                },
            })

            result = products
        } else {
            const products = await prisma.product.findMany({
                take: parseInt(limit),
                skip: (parseInt(page) - 1) * parseInt(limit),
                orderBy: {
                    createdAt: 'desc'
                },
            })

            result = products
        }

        return Response.json(result)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid request data passed.', {status: 422})
        }

        console.log(error)


        return new Response('Could not fetch more posts.', {status: 500})
    }
}