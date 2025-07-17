import { prisma } from "@/lib/prisma";

export async function getProductById(id: string) {
  try {
    return await prisma.product.findUnique({
      where: { id },
    })
  } catch {
    return null
  }
}