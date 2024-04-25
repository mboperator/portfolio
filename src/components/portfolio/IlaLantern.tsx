import React from "react";
import {ProductShowcase} from "@/components/portfolio/productShowcase";
import {getProducts} from "@/data";

export function IlaLantern() {
  const [active, setActive] = React.useState(false);
  const product = getProducts().find(p => p.slug ==='ila-lantern')
  React.useEffect(() => {
    if (!active) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setTimeout(() => {
        setActive(true);
      }, 500);
    }
  }, [setActive, active])
  return (
    <div className={`${active ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
      <ProductShowcase product={product} />
    </div>
  )
}
