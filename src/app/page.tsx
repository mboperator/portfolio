import {PRODUCTS} from "@/data";
import {Product} from "@/types";
import React from "react";
import {PortfolioSection} from "@/components/portfolioSection";

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

function Portfolio() {
  return (
    <section className="min-h-screen flex flex-col">
      <div>
        {PRODUCTS.map(product => (
          <PortfolioSection key={product.slug} product={product}/>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return <section className="h-screen flex flex-col p-12 justify-center items-center">
    <a href="mailto:hello@marcusbernal.es">
      <h1 className="text-white text-7xl underline">email me</h1>
    </a>
  </section>;
}

export default function Home() {
  return (
    <main className="flex flex-col w-screen bg-gray-950">
      <HeroSection/>
      <Portfolio />
      <Contact/>
    </main>
  );
}
