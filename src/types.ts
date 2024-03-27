import {Key} from "react";

export type Technology = string;
type Platform = string;

export type ImageAnchorPosition =
  'center' |
  'left'|
  'bottom'

export type ImageSize = 'cover' | 'contain'

export type Slide = {
  image: string
  imageAnchor?: ImageAnchorPosition
  imageSize?: ImageSize
  description?: string
}

export type Product = {
  slug: Key
  organization: string
  name: string
  description: string
  coverImage: string
  coverImageAnchor?: ImageAnchorPosition
  coverImageSize?: ImageSize
  platform: Platform[]
  technologies: Technology[]
  slides?: Slide[]
}
