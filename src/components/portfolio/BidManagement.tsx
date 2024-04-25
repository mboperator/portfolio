import React from "react";
import {ProductShowcase} from "@/components/portfolio/productShowcase";
import {getProducts} from "@/data";

export function BidManagement() {
  const product = getProducts().find(p => p.slug ==='bid-management')
  return (
    <ProductShowcase product={product} />
  )
}
