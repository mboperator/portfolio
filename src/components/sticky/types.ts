export type StickyChild = {
  sticky?: boolean
  stickyOffset: number;
  height: number;
  absolutePosition: number;
  inViewport?: boolean;
  width: number;
}
export type StickyContextState = {
  absolutePosition: number
  inViewport: boolean
  scrollPosition: number
  containerEnd: number
  children: Map<string, StickyChild>
}
export type StickyContextActions = { registerChild: (id: string, child: StickyChild) => void }
