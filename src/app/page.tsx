import Image from "next/image";

type Product = {
  name: String
  description: String
}

const PRODUCTS: Product[] = [
  {
    name: 'Ila Lantern',
    description: 'The light built for moments of connection.'
  },
  {
    name: 'Odyssey Journal',
    description: 'The private, encrypted journal for your walk with God.'
  },
  {
    name: 'Prequalification',
    description: '',
  },
  {
    name: 'Bid Management',
    description: '',
  },
  {
    name: 'Project Financials',
    description: ''
  }
]

export default function Home() {
  return (
    <main className="">
      <section>
        <h1>Marcus Bernales</h1>
        <h2>Follower of Christ | Husband | Builder</h2>
      </section>
      <section>
        <h1>Products</h1>
        <div>
          {PRODUCTS.map(product => (
            <div>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h1>Get In Touch</h1>
      </section>
    </main>
  );
}
