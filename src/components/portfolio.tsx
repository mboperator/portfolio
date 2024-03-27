"use client"
import {Product, Slide} from "@/types";
import {SlideImage as SlidePlaceholder} from "@/components/slideImage";
import React from "react";
import {PRODUCTS} from "@/data";
import {Sticky, StickyContainer} from "@/components/sticky";

function SlideDescription(props: { slide: Slide }) {
  return (
    <p key={props.slide.description} className={`sticky pb-7 text-lg text-white`}>
      {props.slide.description}
    </p>
  )
}

function SlideImage(props: { slide: Slide, isVisible: boolean }) {
  return (
    <img
      alt={props.slide.description || 'no-alt'}
      className={`${props.isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity pl-7 object-cover object-${props.slide.imageAnchor || "center"} h-full w-full`} src={props.slide.image} />
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

export function SplitLayout(props: any) {
  return (
    <div className="flex flex-row h-lvh">
      <div className="w-1/4 bg-gradient-to-r from-black">
        <Sticky id={props.id} className="px-12 py-7" debug={false}>
          {props.renderMenu()}
        </Sticky>
      </div>

      <div className="min-h-lvh w-3/4">
        {props.renderBody()}
      </div>
    </div>
  )
}


export function ProductShowcase(props: { product: Product }) {
  const { slides = [] } = props.product

  return (
    <StickyContainer className="flex flex-col">
      <SplitLayout
        id="header"
        renderMenu={() => (
          <>
            <h4 className="text-gray-100 mb-3">{props.product.organization.toLowerCase()}</h4>
            <h2 className="text-5xl text-white">{props.product.name.toLowerCase()}</h2>
            <p className="text-lg pt-3 pb-7 text-white">{props.product.description}</p>
          </>
        )}
        renderBody={() =>(
          <SlideImage slide={{ image: props.product.coverImage, imageAnchor: props.product.coverImageAnchor }} isVisible/>
        )}
      />
      {slides.map((slide, index) => (
        <SplitLayout
          key={index}
          id={index}
          renderMenu={() => (
            <SlideDescription key={index} slide={slide} />
          )}
          renderBody={() => (
            <SlidePlaceholder
              key={`${index}--${slide.description}`}
              product={props.product}
              slide={slide}
              onEnterViewport={() => {}}
              onExitViewport={() => {}}
            />
          )}
        />
      ))}
    </StickyContainer>

  );
}
