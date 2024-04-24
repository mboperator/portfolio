"use client"
import React, {useEffect} from "react";
import {StickyContainerProps} from "../types";
import {useStickyParent} from "./useStickyParent";
import {StickyContext} from "../context";

export function StickyParent(props: StickyContainerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { registerChild, updateChildPositions, children} = useStickyParent(containerRef);

  useEffect(() => {
    window.addEventListener('scroll', updateChildPositions);
    window.addEventListener('resize', updateChildPositions);
    updateChildPositions();
    () => {
      window.removeEventListener('scroll', updateChildPositions)
      window.removeEventListener('resize', updateChildPositions);
    }
  }, [updateChildPositions, props.enabled]);

  if (props.debug) {
    console.info('StickyContainerState')
    console.info('Child', Array.from(children.values()))
  }

  return (
    <StickyContext.Provider value={{ children, registerChild, enabled: !!props.enabled }}>
      <div ref={containerRef} {...props} />
    </StickyContext.Provider>
  )
}
