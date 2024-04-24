import {Slide} from "@/types";
import React from "react";
import {StickyContext} from "@/components/sticky";

export function SlideDescription(props: { id: string, slide: Slide }) {
  const {children} = React.useContext(StickyContext);
  const self = children.get(props.id);

  let classes;
  if (self?.sticky) {
    classes = "opacity-1"
  } else {
    classes = "opacity-0"
  }
  return (
    <p className={`transition-opacity duration-500 pb-7 px-12 text-lg text-white ${classes}`}>
      {props.slide.description}
    </p>
  )
}
