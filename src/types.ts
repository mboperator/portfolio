import { FunctionComponent, Key } from "react";

export type Technology = string;
type Platform = string;

export type ImageAnchorPosition =
  'center' |
  'left'|
  'bottom'

export type ImageSize = 'cover' | 'contain'

export type Slide = {
  image?: string
  imageAnchor?: ImageAnchorPosition
  imageSize?: ImageSize
  description?: string
  component?: FunctionComponent<{ id: string, slide: Slide, active: boolean }>
}

export type Product = {
  slug: Key
  organization: string
  url?: string
  name: string
  description: string
  coverImage: string
  coverImageAnchor?: ImageAnchorPosition
  coverImageSize?: ImageSize
  platform: Platform[]
  technologies: Technology[]
  slides?: Slide[]
}
