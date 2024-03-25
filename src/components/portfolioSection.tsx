"use client"
import {Product, Slide} from "@/types";
import {SlideImage} from "@/components/slideImage";
import React from "react";


function SlideDescription(props: { slide: Slide, isVisible: boolean }) {
  return (
    <p key={props.slide.description} className={`pb-7 text-lg text-white ${props.isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {props.slide.description}
    </p>
  )
}

export function PortfolioSection(props: { product: Product }) {
  const [ slidesShown, setSlidesShown ] = React.useState<number[]>([]);
  const { slides = [] } = props.product

  function handleSlideVisible(index: number) {
    console.info('handleSlideVisible', index, slides[index])
    setSlidesShown(slides => slides.concat(index));
  }

  const wasSlideShown = React.useCallback(function wasSlideShown(index: number) {
    return Boolean(slidesShown.includes(index));
  }, [slidesShown])

  return (
    <div className="flex flex-row">
      <div className="px-12 py-7 w-1/4 bg-gradient-to-r h-full from-black sticky top-0">
        <h4 className="text-gray-100 mb-3">{props.product.organization.toLowerCase()}</h4>
        <h2 className="text-5xl text-white">{props.product.name.toLowerCase()}</h2>
        <p className="text-lg pt-3 pb-7 text-white">{props.product.description}</p>
        {slides.map((slide, index) => (
          <SlideDescription key={index} slide={slide} isVisible={wasSlideShown(index)} />
        ))}
      </div>
      <div className="min-h-lvh w-3/4">
        {slides.map((slide, index) => (
          <SlideImage
            key={slide.description}
            product={props.product}
            slide={slide}
            onVisible={() => handleSlideVisible(index)}
          />
        ))}
      </div>
    </div>
  );
}
