"use client"
import React, {useEffect} from "react";
import {StickyChild, StickyContainerProps} from "@/components/sticky/types";
import {calculateChildVisibilityState, getScrollPosition, getViewportBounds, updateChild} from "@/components/sticky/utils";
import {StickyContext} from "@/components/sticky/stickyContext";

function useStickyContainerState(containerRef: React.RefObject<HTMLDivElement>) {
  const [state, setState] = React.useState({ children: new Map<string, StickyChild>() });

  const registerChild = React.useCallback(function registerChild(id: string, childNode: HTMLDivElement ) {
    const childBoundingRect = childNode.getBoundingClientRect();
    const offsetFromTop = childBoundingRect.top + document.documentElement.scrollTop

    setState(state => ({
      ...state,
      children: updateChild(state.children, id, {
        absolutePosition: offsetFromTop,
        height: childBoundingRect.height,
        width: childBoundingRect.width,
      })
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

  return { registerChild, updateChildPositions, children: state.children }
}

export function StickyContainer(props: StickyContainerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { registerChild, updateChildPositions, children} = useStickyContainerState(containerRef);

  useEffect(() => {
    window.addEventListener('scroll', updateChildPositions);
    window.addEventListener('resize', updateChildPositions);
    updateChildPositions();
    () => {
      window.removeEventListener('scroll', updateChildPositions)
      window.removeEventListener('resize', updateChildPositions);
    }
  }, [updateChildPositions]);

  if (props.debug) {
    console.info('StickyContainerState')
    console.info('Child', Array.from(children.values()))
  }

  return (
    <StickyContext.Provider value={{ children, registerChild }}>
      <div ref={containerRef} {...props} />
    </StickyContext.Provider>
  )
}
