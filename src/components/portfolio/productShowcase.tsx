import {Product} from "@/types";
import {StickyChild, StickyParent} from "@/components/sticky";
import {SplitLayout} from "@/components/splitLayout";
import {SlideContent, SlideDescription} from "@/components/slideContent";
import React from "react";
import {SquareArrowOutUpRight} from "lucide-react";
import useWindowDimensions from "@/utils/useWindowDimensions";
import {withBreakpoints} from "@/utils/withBreakpoints";

export function ProduceShowcaseMobile(props: { product: Product }) {
  if (props.product === undefined) {
    return null;
  }
  const {slides = []} = props.product
  return (
    <>
      <StickyParent className="flex flex-col flex-1">
        <SplitLayout
          sidebar={
            <StickyChild id={"header"}>
              <div className="px-3 py-3 ml-0 backdrop-blur-lg bg-black bg-opacity-70">
                <h4 className="text-gray-100 mb-3">{props.product.organization.toLowerCase()}</h4>
                <a href={props.product.url} target="_blank" className="flex flex-row">
                  <h2
                    className="text-5xl text-white no-underline hover:underline underline-offset-8 transition-all duration-300">{props.product.name.toLowerCase()}</h2>
                  <SquareArrowOutUpRight color="white" className="p-1" size={30}/>
                </a>
                <p className="text-lg pt-3 pb-0 text-white">{props.product.description}</p>
              </div>
            </StickyChild>
          }
          body={
            <SlideContent id="header" active slide={{
              image: props.product.coverImage,
              imageSize: props.product.coverImageSize,
              imageAnchor: props.product.coverImageAnchor
            }}/>
          }
        />
      </StickyParent>
      {slides.map((slide, index) => (
        <StickyParent key={index} className="flex flex-col flex-1">
          <SplitLayout
            sidebar={
              <StickyChild id={`${index}`}>
                <SlideDescription id={`${index}`} slide={slide} />
              </StickyChild>
            }
            body={
              <SlideContent id={`${index}`} slide={slide}/>
            }
          />
        </StickyParent>
      ))}
    </>
  )
}

export function ProduceShowcaseWeb(props: { product: Product }) {
  if (props.product === undefined) {
    return null;
  }
  const {slides = []} = props.product
  return (
    <StickyParent className="flex flex-col flex-1">
      <SplitLayout
        sidebar={
          <StickyChild id={"header"}>
            <div className="px-12 py-7 ml-0 bg-black">
              <h4 className="text-gray-100 mb-3">{props.product.organization.toLowerCase()}</h4>
              <a href={props.product.url} target="_blank" className="flex flex-row">
                <h2
                  className="text-5xl text-white no-underline hover:underline underline-offset-8 transition-all duration-300">{props.product.name.toLowerCase()}</h2>
                <SquareArrowOutUpRight color="white" className="p-1" size={30}/>
              </a>
              <p className="text-lg pt-3 pb-0 text-white">{props.product.description}</p>
            </div>
          </StickyChild>
        }
        body={
          <SlideContent id="header" active slide={{
            image: props.product.coverImage,
            imageSize: props.product.coverImageSize,
            imageAnchor: props.product.coverImageAnchor
          }}/>
        }
      />

      {slides.map((slide, index) => (
        <SplitLayout
          key={index}
          sidebar={
            <StickyChild id={`${index}`}>
              <SlideDescription id={`${index}`} slide={slide}/>
            </StickyChild>
          }
          body={
            <SlideContent id={`${index}`} slide={slide}/>
          }
        />
      ))}
    </StickyParent>
  );
}

export const ProductShowcase = withBreakpoints({
  md: ProduceShowcaseMobile,
  default: ProduceShowcaseWeb,
})
