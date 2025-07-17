import { prisma } from "@/lib/prisma";
import { Label } from "@/components/ui/label";
import { SuccessBanner } from "@/components/success";
import { redirect } from "next/navigation";
import { ProductType } from "@/generated/prisma";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Add Product - 444",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString().toLowerCase().trim();
  const description = formData.get("description")?.toString();
  const imageNumber = formData.get("imageNumber")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageNumber || !price) {
    throw Error("Missing required fields");
  }

  let type: ProductType | null = null;

  if (name.includes("candle")) type = ProductType.candle;
  else if (name.includes("magnet")) type = ProductType.magnet;

  if (!type) {
    throw new Error("Invalid product type");
  }

  const imageFolders: Record<string, string> = {
    magnet: "magnet",
    candle: "candle",
  };

  const productType = Object.keys(imageFolders).find((key) =>
    name.includes(key),
  );

  if (!productType) {
    throw Error(
      "Product name must include one of: " +
        Object.keys(imageFolders).join(", "),
    );
  }

  const imageUrl = `/assets/images/${imageFolders[productType]}/${productType}${imageNumber}.png`;

  await prisma.product.create({
    data: { name, description, imageUrl, price, type },
  });

  redirect("/products/add-product?success=true");
}

export default function AddProductPage() {
  return (
    <main className="fantasy">
      <div className="flex w-full flex-col items-center justify-center gap-6">
        <h1 className="mb-3 text-lg font-semibold">Add Product</h1>
        <SuccessBanner />
        <form
          action={addProduct}
          className="grid w-5/12 gap-4 place-self-center"
        >
          <div>
            <Label className="mb-2 block font-semibold" htmlFor="name">
              Product Name
            </Label>
            <Input
              required
              id="name"
              name="name"
              placeholder="Name"
              className="mb-3 w-full"
            />
          </div>
          <div>
            <Label className="mb-2 block font-semibold" htmlFor="description">
              Product Description
            </Label>
            <Textarea
              required
              id="description"
              name="description"
              placeholder="Description"
              className="mb-3 w-full"
            />
          </div>
          <div>
            <Label className="mb-2 block font-semibold" htmlFor="imageNumber">
              Image Source
            </Label>
            <Input
              required
              id="imageNumber"
              name="imageNumber"
              placeholder="Image #"
              type="number"
              className="input mb-3 w-full"
            />
          </div>
          <div>
            <Label className="mb-2 block font-semibold" htmlFor="price">
              Price
            </Label>
            <Input
              required
              id="price"
              name="price"
              placeholder="Price"
              type="number"
              className="input mb-3 w-full"
            />
          </div>
          <Button type="submit" className="rounded-lg">
            Add Product
          </Button>
        </form>
      </div>
    </main>
  );
}
