import {PRODUCTS} from "@/data";
import {Product} from "@/types";

function ProductCard(props: { product: Product }) {
  return <div className="py-7 h-2/3vh flex flex-col justify-end border-2 my-7 p-7 rounded-3xl">
    <h4 className="text-gray-700 mb-3">{props.product.organization.toLowerCase()}</h4>
    <h2 className="text-5xl">{props.product.name.toLowerCase()}</h2>
    <p className="text-lg pt-3 pb-3">{props.product.description}</p>
  </div>;
}

export default function Home() {
  return (
    <main className="">
      <section className="h-screen flex flex-col justify-center p-12">
        <h1 className="text-7xl mb-7">marcus bernales</h1>
        <h2 className="text-3xl">disciple of Jesus | husband | engineer</h2>
      </section>
      <section className="min-h-screen flex flex-col p-12">
        <h1 className="text-7xl mb-7">portfolio</h1>
        <div>
          {PRODUCTS.map(product => (
            <ProductCard key={product.slug} product={product}/>
          ))}
        </div>
      </section>
      <section className="h-screen flex flex-col p-12 justify-center items-center">
        <a href="mailto:hello@marcusbernal.es">
          <h1 className="text-7xl underline">email me</h1>
        </a>
      </section>
    </main>
  );
}
