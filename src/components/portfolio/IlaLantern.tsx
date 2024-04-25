import React from "react";
import {ProductShowcase} from "@/components/portfolio/productShowcase";
import {getProducts} from "@/data";

export function IlaLantern() {
  const product = getProducts().find(p => p.slug ==='ila-lantern')
  return (
    <ProductShowcase product={product} />
  )
}
