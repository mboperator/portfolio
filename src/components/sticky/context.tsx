import {StickyChildPositionState, StickyContextActions, StickyContextState} from "@/components/sticky/types";
import React from "react";

export const StickyContext = React.createContext<StickyContextState & StickyContextActions>({
  children: new Map<string, StickyChildPositionState>(),
  registerChild: (id: string, node: HTMLDivElement) => {
  }
})
