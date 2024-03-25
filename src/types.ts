import {Key} from "react";

export type Technology = string;
type Platform = string;
export type Product = {
  slug: Key
  organization: string
  name: string
  description: string
  platform: Platform[]
  technologies: Technology[]
  image?: string
  images?: string[]
  imageAnchor?: string
  imageSize?: string
}
