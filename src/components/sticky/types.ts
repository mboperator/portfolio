import React from "react";

export type StickyChild = {
  sticky?: boolean
  stickyOffset?: number;
  height: number;
  width: number;
  absolutePosition: number;
}
export type StickyContextState = {
  children: Map<string, StickyChild>
}
export type StickyContextActions = { registerChild: (id: string, node: HTMLDivElement) => void }
export type StickyContainerProps = React.HTMLProps<any> & { debug?: boolean }
