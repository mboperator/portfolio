import {Key} from "react";

export type Technology = String;
type Platform = String;
export type Product = {
  slug: Key
  organization: String
  name: String
  description: String
  platform: Platform[]
  technologies: Technology[]
}
