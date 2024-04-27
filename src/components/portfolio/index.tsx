"use client"
import React from "react";
import {getProducts} from "@/data";
import {ProductShowcase} from "@/components/productShowcase/productShowcase";

export function Portfolio() {
  const products = getProducts();

  return (
    <section className="min-h-screen flex flex-col relative" id="portfolio">
      {products.map(product => (
        <ProductShowcase key={product.slug} product={product}/>
      ))}
    </section>
  );
}
