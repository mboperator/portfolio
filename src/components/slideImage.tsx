"use client"
import {Product, Slide} from "@/types";
import React, {useEffect} from "react";

function useVisibility(ref: React.RefObject<HTMLDivElement | null>) {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) =>
      setIsVisible(entry.isIntersecting)
    );

    observer.observe(ref.current);
  }, [ref]);

  return { isVisible }
}

type VisibilityHandler = () => any

export function SlideImage(props: { product: Product, slide: Slide, onVisible: VisibilityHandler }) {
  const ref = React.createRef<HTMLDivElement>();
  const { isVisible } = useVisibility(ref)

  useEffect(() => {
    if (isVisible) {
      console.info(`${props.product.name} - ${props.slide.image} is visible`)
      props.onVisible()
    }
  }, [isVisible, props.product, props.slide]);

  return (
    <div ref={ref} className="h-lvh w-full">
      <img
        alt={`${props.product.name}`}
        className={`pl-7 object-${props.slide.imageSize || "cover"} object-${props.slide.imageAnchor || "center"} h-full w-full`}
        src={props.slide.image}
      />
    </div>
  );
}
