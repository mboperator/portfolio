"use client"
import {Product, Slide} from "@/types";
import React from "react";
import {PRODUCTS} from "@/data";
import {StickyContainer, StickyContext} from "@/components/sticky";
import {SplitLayout} from "@/components/splitLayout";

function SlideDescription(props: { slide: Slide }) {
  return (
    <p className={`sticky pb-7 px-12 text-lg text-white`}>
      {props.slide.description}
    </p>
  )
}

function SlideImage(props: { id: string, slide: Slide }) {
  const {children} = React.useContext(StickyContext);
  const self = children.get(props.id)
  if (self?.sticky) {
    console.log('SlideImage', self);
  }
  const imageSize = `object-${props.slide.imageSize || 'cover'}`
  return (
    <img
      alt={props.slide.description || 'no-alt'}
      className={`${imageSize} ${self?.sticky ? 'opacity-100' : 'opacity-50'} ${self?.sticky ? 'blur-0' : 'blur-sm'} transition-all duration-700 pl-7 object-${props.slide.imageAnchor || "center"} h-full w-full`} src={props.slide.image} />
  )
}

export function Portfolio() {
  return (
    <section className="min-h-screen flex flex-col">
      <div>
        {PRODUCTS.map(product => (
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
          <SlideImage id="header" slide={{ image: props.product.coverImage, imageSize: props.product.coverImageSize, imageAnchor: props.product.coverImageAnchor }} />
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
            <SlideImage id={`${index}`} slide={slide} />
          }
        />
      ))}
    </StickyContainer>
  );
}
