"use client"
import {SlideImage} from "@/components/slideContent/slideImage";
import {Slide} from "@/types";
import React from "react";
import {StickyContext} from "@/components/sticky";

export function SlideContent(props: { id: string, slide: Slide}) {
  const {children} = React.useContext(StickyContext);
  const self = children.get(props.id);

  if (props.slide.image) {
    return <SlideImage id={props.id} slide={props.slide} active={Boolean(self?.sticky)} />
  } else if (props.slide.component) {
    const Component = props.slide.component;
    return <Component id={props.id} slide={props.slide} active={Boolean(self?.sticky)} />
  }
  return (
    <div>
      <h1>No slide content handler yet...</h1>
    </div>
  )
}
export {SlideDescription} from "@/components/slideContent/slideDescription";
