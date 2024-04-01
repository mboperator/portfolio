"use client"
import React, {useEffect} from "react";
import {StickyChild, StickyContainerProps} from "@/components/sticky/types";
import {calculateChildVisibilityState, getScrollPosition, getViewportBounds, updateChild} from "@/components/sticky/utils";
import {StickyContext} from "@/components/sticky/stickyContext";

export function StickyContainer(props: StickyContainerProps) {
  const INITIAL_STICKY_STATE = {
    children: new Map(),
  }
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [state, setState] = React.useState(INITIAL_STICKY_STATE);

  const registerChild = React.useCallback(function registerChild(id: string, child: StickyChild) {
    setState(state => ({
      ...state,
      children: updateChild(state.children, id, child)
    }))
  }, [setState])

  const updateChildPositions = React.useCallback(function updateChildPositions() {
    window.requestAnimationFrame(() => {
      if (containerRef.current === null) { return; }
      setState(state => ({
        children: calculateChildVisibilityState(containerRef.current, state.children),
      }))
    })
  }, [containerRef])

  useEffect(() => {
    window.addEventListener('scroll', updateChildPositions);
    window.addEventListener('resize', updateChildPositions);
    () => {
      window.removeEventListener('scroll', updateChildPositions)
      window.removeEventListener('resize', updateChildPositions);
    }
  }, [updateChildPositions]);

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
