"use client"
import {Product} from "@/types";
import React from "react";
import {getProducts} from "@/data";
import {SplitLayout} from "@/components/splitLayout";
import {SlideContent, SlideDescription} from "@/components/slideContent";
import {StickyParent} from "@/components/sticky";
import { SquareArrowOutUpRight } from 'lucide-react';

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
    <StickyParent className="flex flex-col">
      <SplitLayout
        id="header"
        sidebar={
          <div className="px-12 py-7" >
            <h4 className="text-gray-100 mb-3">{props.product.organization.toLowerCase()}</h4>
            <a href={props.product.url} target="_blank" className="flex flex-row">
              <h2 className="text-5xl text-white no-underline hover:underline underline-offset-8 transition-all duration-300">{props.product.name.toLowerCase()}</h2>
              <SquareArrowOutUpRight color="white" className="p-1" size={30} />
            </a>
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
          sidebar={
            <SlideDescription slide={slide} />
          }
          body={
            <SlideContent id={`${index}`} slide={slide} />
          }
        />
      ))}
    </StickyParent>
  );
}
