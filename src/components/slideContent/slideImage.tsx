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

export function SlideImage(props: { id: string, slide: Slide, active: boolean }) {
  const {
    imageAnchor = 'center',
    imageSize = 'cover'
  } = props.slide

  return (
    <img
      alt={props.slide.description || 'no-alt'}
      className={`${imageSizes[imageSize]} ${anchorPositions[imageAnchor]} ${props.active ? 'opacity-100' : 'opacity-50'} ${props.active ? 'blur-0' : 'blur-sm'} transition-all duration-700 pl-7 h-full w-full`} src={props.slide.image} />
  )
}