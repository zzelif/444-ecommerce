import Hero from "@/components/hero";
import Categories from "@/components/categories";
import Product from "@/components/products";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="max-w-7xl mx-auto">
        <Categories />
        <Product />
      </div>
    </main>
  );
}
