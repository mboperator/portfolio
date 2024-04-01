"use client"
import React, {useEffect} from "react";
import {StickyChild, StickyContainerProps} from "../types";
import {useStickyContainerState} from "./utils";
import {StickyContext} from "../context";

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
