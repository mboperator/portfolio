import React from "react";

export type StickyChild = {
  sticky?: boolean
  stickyOffset?: number;
  height: number;
  absolutePosition: number;
  inViewport?: boolean;
  width: number;
}
export type StickyContextState = {
  children: Map<string, StickyChild>
}
export type StickyContextActions = { registerChild: (id: string, child: StickyChild) => void }
export type StickyContainerProps = React.HTMLProps<any> & { debug: boolean }
