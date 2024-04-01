"use client"
import React, {useEffect} from "react";
import {StickyChild} from "@/components/sticky/types";
import {calculateChildVisibilityState} from "@/components/sticky/calculateChildVisibilityState";
import {StickyContext} from "@/components/sticky/stickyContext";

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
