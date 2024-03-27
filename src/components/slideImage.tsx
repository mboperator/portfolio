"use client"
import {ImageAnchorPosition, Slide} from "@/types";
import React from "react";
import {StickyContext} from "@/components/sticky";

const anchorPositions = {
  center: 'center',
  left: 'left',
  bottom: 'bottom',
}

const imageSizes = {
  cover: 'object-cover',
  contain: 'object-contain',
}

export function SlideImage(props: { id: string, slide: Slide }) {
  const {children} = React.useContext(StickyContext);
  const self = children.get(props.id);
  if (self?.sticky) {
    console.log('SlideImage', self);
  }

  const {
    imageAnchor = 'center',
    imageSize = 'cover'
  } = props.slide

  return (
    <img
      alt={props.slide.description || 'no-alt'}
      className={`${imageSizes[imageSize]} ${anchorPositions[imageAnchor]} ${self?.sticky ? 'opacity-100' : 'opacity-50'} ${self?.sticky ? 'blur-0' : 'blur-sm'} transition-all duration-700 pl-7 h-full w-full`} src={props.slide.image} />
  )
}
