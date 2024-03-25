import {PRODUCTS} from "@/data";
import {Product} from "@/types";

function ProductCard(props: { product: Product }) {
  const { slides = [] } = props.product

  return (
    <div className="flex flex-row">
      <div className="px-12 py-7 w-1/4 bg-gradient-to-r h-full from-black sticky top-0">
        <h4 className="text-gray-100 mb-3">{props.product.organization.toLowerCase()}</h4>
        <h2 className="text-5xl text-white">{props.product.name.toLowerCase()}</h2>
        <p className="text-lg pt-3 pb-3 text-white">{props.product.description}</p>
      </div>
      <div className="min-h-lvh w-3/4">
        {slides.length > 0 && slides.map(slide => (
          <div className="h-lvh w-full">
            <img
              alt={`${props.product.name}`}
              className={`pl-7 object-${slide.imageSize || 'cover'} object-${slide.imageAnchor || 'center' } h-full w-full`}
              src={slide.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroSection() {
  return <section
    className="h-screen w-full flex flex-col justify-between items-start p-12 bg-sunset bg-cover bg-center">
    <div>
      <h1 className="text-white text-7xl mb-7">marcus bernales</h1>
      <h2 className="text-white text-3xl">disciple of Jesus | husband | engineer</h2>
    </div>
    <div>
      <h1 className="text-7xl mb-3 text-white">portfolio</h1>
    </div>
  </section>;
}

function Contact() {
  return <section className="h-screen flex flex-col p-12 justify-center items-center">
    <a href="mailto:hello@marcusbernal.es">
      <h1 className="text-white text-7xl underline">email me</h1>
    </a>
  </section>;
}

function Portfolio(props: { renderProduct: (product: Product) => JSX.Element }) {
  return (
    <section className="min-h-screen flex flex-col">
      <div>
        {PRODUCTS.map(props.renderProduct)}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col w-screen bg-gray-950">
      <HeroSection/>
      <Portfolio renderProduct={product => (
        <ProductCard key={product.slug} product={product}/>
      )}/>
      <Contact/>
    </main>
  );
}
