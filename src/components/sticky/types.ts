import React from "react";

export type StickyChildPositionState = {
  sticky?: boolean
  stickyOffset?: number
  height: number
  width: number
  absolutePosition: number
}
export type StickyContextState = {
  children: Map<string, StickyChildPositionState>
  enabled: boolean
}
export type StickyContextActions = { registerChild: (id: string, node: HTMLDivElement) => void }
export type StickyContainerProps = React.HTMLProps<any> & { debug?: boolean, enabled?: boolean }
