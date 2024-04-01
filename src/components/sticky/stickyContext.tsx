import {StickyChild, StickyContextActions, StickyContextState} from "@/components/sticky/types";
import React from "react";

export const StickyContext = React.createContext<StickyContextState & StickyContextActions>({
  absolutePosition: -1,
  inViewport: false,
  scrollPosition: -1,
  containerEnd: -1,
  children: new Map(),
  registerChild: (id: string, child: StickyChild) => {
  }
})
