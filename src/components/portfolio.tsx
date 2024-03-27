"use client"
import {Product, Slide} from "@/types";
import React from "react";
import {getProducts} from "@/data";
import {StickyContainer} from "@/components/sticky";
import {SplitLayout} from "@/components/splitLayout";
import {SlideContent} from "@/components/slideContent";

function SlideDescription(props: { slide: Slide }) {
  return (
    <p className={`sticky pb-7 px-12 text-lg text-white`}>
      {props.slide.description}
    </p>
  )
}

export function Portfolio() {
  const products = getProducts();
  return (
    <section className="min-h-screen flex flex-col">
      <div>
        {products.map(product => (
          <ProductShowcase key={product.slug} product={product}/>
        ))}
      </div>
    </section>
  );
}
export function ProductShowcase(props: { product: Product }) {
  const { slides = [] } = props.product

  return (
    <StickyContainer className="flex flex-col">
      <SplitLayout
        id="header"
        menu={
          <div className="px-12 py-7" >
            <h4 className="text-gray-100 mb-3">{props.product.organization.toLowerCase()}</h4>
            <h2 className="text-5xl text-white">{props.product.name.toLowerCase()}</h2>
            <p className="text-lg pt-3 pb-7 text-white">{props.product.description}</p>
          </div>
        }
        body={
          <SlideContent id="header" slide={{ image: props.product.coverImage, imageSize: props.product.coverImageSize, imageAnchor: props.product.coverImageAnchor }} />
        }
      />
      {slides.map((slide, index) => (
        <SplitLayout
          key={index}
          id={`${index}`}
          menu={
            <SlideDescription slide={slide} />
          }
          body={
            <SlideContent id={`${index}`} slide={slide} />
          }
        />
      ))}
    </StickyContainer>
  );
}