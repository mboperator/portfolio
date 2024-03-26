"use client"
import {Product, Slide} from "@/types";
import React, {useEffect} from "react";

function useVisibility(ref: React.RefObject<HTMLDivElement | null>) {
  const [isFullyVisible, setIsVisible] = React.useState<boolean>(false);
  const [isTotallyInvisible, setIsTotallyInvisible] = React.useState<boolean>(false);

  useEffect(() => {
    if (!ref.current) return
    const entranceObserver = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, { threshold: .99 });

    const exitObserver = new IntersectionObserver(([entry]) => {
      setIsTotallyInvisible(entry.isIntersecting)
    }, { threshold: .01 });

    entranceObserver.observe(ref.current);
  }, [ref]);

  return { isFullyVisible, isTotallyInvisible }
}

type VisibilityHandler = () => any

export function SlideImage(props: { color: number, product: Product, slide: Slide, onEnterViewport: VisibilityHandler, onExitViewport: VisibilityHandler }) {
  const ref = React.createRef<HTMLDivElement>();
  const { isFullyVisible, isTotallyInvisible } = useVisibility(ref)

  useEffect(() => {
    if (isFullyVisible) {
      console.info(`${props.product.name} - ${props.slide.image} is in the viewport`)
      props.onEnterViewport()
    }
    if (isTotallyInvisible) {
      console.info(`${props.product.name} - ${props.slide.image} is not in the viewport`)
      props.onExitViewport()
    }
  }, [isFullyVisible, isTotallyInvisible, props.product, props.slide]);

  const bgColor = props.color % 2 === 1 ? 'red' : 'cyan'
  return (
    <div ref={ref} className={`h-lvh w-full`} style={{ backgroundColor: bgColor}}>
    </div>
  );
}
