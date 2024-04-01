import {StickyChild, StickyContextActions, StickyContextState} from "@/components/sticky/types";
import React from "react";

export const StickyContext = React.createContext<StickyContextState & StickyContextActions>({
  children: new Map(),
  registerChild: (id: string, child: StickyChild) => {
  }
})
