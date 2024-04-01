import {Slide} from "@/types";
import React from "react";

export function SlideDescription(props: { slide: Slide }) {
  return (
    <p className={`sticky pb-7 px-12 text-lg text-white`}>
      {props.slide.description}
    </p>
  )
}
