import React, {useEffect} from "react";
import {Property} from "csstype";

type VisibilityInfo = {
  enteredAt?: number
  visible: boolean
}
type StickyChild = {
  sticky?: boolean
  stickyOffset: number;
  height: number;
  absolutePosition: number;
  inViewport?: boolean;
  width: number;
}
type StickyContextState = {
  absolutePosition: number
  inViewport: boolean
  scrollPosition: number
  containerEnd: number
  children: Map<string, StickyChild>
}
type StickyContextActions = { registerChild: (id: string, child: StickyChild) => void }
const StickyContext = React.createContext<StickyContextState & StickyContextActions>({
  absolutePosition: -1,
  inViewport: false,
  scrollPosition: -1,
  containerEnd: -1,
  children: new Map(),
  registerChild: (id: string, child: StickyChild) => {
  }
})

function calculateChildVisibilityState(children: Map<string, StickyChild>, scrollPosition: number, parentContainerEnd: number) {
  const updatedChildren = new Map();
  const childrenArr = Array.from(children.values());
  const viewportHeight = document.documentElement.clientHeight;
  const viewportBounds = {top: scrollPosition, bottom: viewportHeight + scrollPosition}

  const totalHeight = childrenArr.reduce((totalHeight, child) => totalHeight += child.height, 0);

  const isScrollingPastParentContainer = (scrollPosition >= parentContainerEnd - (totalHeight));
  const parentContainerOvershoot = (scrollPosition - (parentContainerEnd - (totalHeight)));

  let accumulatedHeights = 0;
  children.forEach((child, key) => {
    const containerEnd = child.absolutePosition + child.height;
    const inViewport = viewportBounds.bottom > child.absolutePosition && viewportBounds.top < containerEnd;
    updatedChildren.set(key, {
      ...child,
      inViewport,
      sticky: viewportBounds.top + accumulatedHeights >= (child.absolutePosition),
      stickyOffset: isScrollingPastParentContainer ? -parentContainerOvershoot + accumulatedHeights : accumulatedHeights,
    })

    accumulatedHeights += child.height;
  })

  return updatedChildren
}

export function StickyContainer(props: any) {
  const INITIAL_STICKY_STATE = {
    absolutePosition: -1,
    inViewport: false,
    scrollPosition: -1,
    containerEnd: -1,
    children: new Map(),
  }
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [state, setState] = React.useState(INITIAL_STICKY_STATE);

  function registerChild(id: string, child: StickyChild) {
    setState(state => ({
      ...state,
      children: state.children.set(id, child)
    }))
  }

  const measureOffset = React.useCallback(() => {
    window.requestAnimationFrame(() => {
      const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop
      if (containerRef.current) {
        const viewportHeight = document.documentElement.clientHeight;
        const viewportBounds = {top: scrollPosition, bottom: viewportHeight + scrollPosition}
        const containerBoundingRect = containerRef.current.getBoundingClientRect();
        const offsetFromTop = containerBoundingRect.top + document.documentElement.scrollTop
        const containerEnd = offsetFromTop + containerBoundingRect.height;
        const inViewport = viewportBounds.bottom > offsetFromTop && viewportBounds.top < containerEnd;

        setState(state => ({
          ...state,
          absolutePosition: offsetFromTop,
          containerEnd,
          inViewport,
          scrollPosition,
          children: calculateChildVisibilityState(state.children, scrollPosition, containerEnd),
        }))
      }
    })
  }, [containerRef])

  useEffect(() => {
    window.addEventListener('scroll', measureOffset);
    () => window.removeEventListener('scroll', measureOffset)
  }, [measureOffset]);

  if (props.debug) {
    console.info('StickyContainerState', state)
    console.info('Child', Array.from(state.children.values()))
  }

  return (
    <StickyContext.Provider value={{...state, registerChild}}>
      <div ref={containerRef} {...props} />
    </StickyContext.Provider>
  )
}

export function Sticky(props: {
  id: string,
  children: any,
  className: string,
  debug: boolean
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const {absolutePosition, registerChild, children} = React.useContext(StickyContext);
  useEffect(() => {
    if (containerRef.current) {
      const boundingRect = containerRef.current.getBoundingClientRect();
      const offsetFromTop = boundingRect.top + document.documentElement.scrollTop
      const containerEnd = offsetFromTop + boundingRect.height;

      registerChild(props.id, {
        absolutePosition: offsetFromTop,
        height: boundingRect.height,
        stickyOffset: 0,
        width: boundingRect.width,
      })
    }
  }, [containerRef, absolutePosition]);

  const self = children.get(props.id) || {width: 0, sticky: false, stickyOffset: 0};
  const isStuck = self.sticky;
  const stickyOffset = self.stickyOffset
  const stickyStyle = {
    position: 'fixed' as Property.Position,
    top: isStuck ? 0 : -9999,
    transform: isStuck ? `translateY(${stickyOffset}px)` : '',
    right: 0,
    left: 0,
    width: self.width,
  }
  return (
    <>
      <div className={`${props.className} relative`} style={stickyStyle}>
        {props.children}

        {props.debug && (<div className="absolute right-0 top-20 bg-amber-300">
          <p>{JSON.stringify(self, null, 2)}</p>
        </div>)}
      </div>

      <div ref={containerRef} className={props.className} style={{visibility: isStuck ? 'hidden' : 'visible'}}>
        {props.children}
      </div>
    </>
  )
}
