import { prisma } from "@/lib/prisma";
import { Label } from "@/components/ui/label";
import { Suspense } from "react";
import { SuccessBanner } from "@/components/success";
import { SuccessBannerFallback } from "@/components/skeletons/successbannerskeleton";
import { redirect } from "next/navigation";
import { ProductType } from "@/generated/prisma/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { LoginForm } from "@/components/login";

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
  else if (name.includes("rosary")) type = ProductType.rosary;

  if (!type) throw new Error("Invalid product type");

  const imageFolders: Record<string, string> = {
    magnet: "magnet",
    candle: "candle",
    rosary: "rosary",
  };

  const productType = Object.keys(imageFolders).find((key) =>
    name.includes(key)
  );

  if (!productType) {
    throw Error(
      "Product name must include one of: " +
        Object.keys(imageFolders).join(", ")
    );
  }

  // You can also change this to support jpg if needed
  const imageUrl = `/assets/images/${imageFolders[productType]}/${productType}${imageNumber}.png`;

  await prisma.product.create({
    data: { name, description, imageUrl, price, type },
  });

  redirect("/products/add-product?success=true");
}

async function login(formData: FormData) {
  "use server";

  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    const cookieStore = await cookies();
    cookieStore.set("auth", "true", { httpOnly: true });
    redirect("/products/add-product");
  }
  return { success: false, message: "Invalid credentials" };
}

// Mark the component as async so we can await cookies() on render.
export default async function AddProductPage() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth");

  if (!auth || auth.value !== "true") {
    // 🔑 Not logged in → show login form
    return (
      <main className="flex min-h-screen items-center justify-center">
        <LoginForm action={login} />
      </main>
    );
  }


  return (
    <main className="fantasy">
      <div className="flex w-full flex-col items-center justify-center gap-6">
        <div className="flex w-5/12 justify-between items-center">
          <h1 className="text-lg font-semibold">Add Product</h1>
          
        </div>

        <Suspense fallback={<SuccessBannerFallback />}>
          <SuccessBanner />
        </Suspense>

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