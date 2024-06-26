"use client"
import React from "react";
import {Property} from "csstype";
import {StickyChildPositionState} from "../types";
import { useStickyChildReporting } from "./useStickyChildReporting";
import {StickyContext} from "@/components/sticky";

function getStickyStyle(self: StickyChildPositionState| undefined) {
  if (!self) { return {} }

  return {
    position: 'fixed' as Property.Position,
    top: self.sticky ? 0 : -9999,
    transform: self.sticky ? `translateY(${self.stickyOffset}px)` : '',
    right: 0,
    left: self.left || 0,
    width: self.width,
    visibility: self.sticky ? 'visible' : 'hidden' as Property.Visibility,
    zIndex: 10,
  }
}

function getNodeStyle(self: StickyChildPositionState | undefined) {
  if (self?.sticky) {
    return "invisible opacity-0"
  } else {
    return "visible opacity-100"
  }
}

type StickyChildProps = {
  id: string,
  children: any,
  className?: string,
  debug?: boolean
}
export function StickyChild(props: StickyChildProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const self = useStickyChildReporting(props.id, containerRef);
  const stickyNodeStyle = getStickyStyle(self);
  const normalNodeStyle = getNodeStyle(self);

  return (
    <>
      <div className={`${props.className} relative backdrop-blur-sm bg-black bg-opacity-40`} style={stickyNodeStyle}>
        {props.children}

        {props.debug && (<div className="absolute right-0 top-20 bg-amber-300">
          <p>{JSON.stringify(self, null, 2)}</p>
        </div>)}
      </div>

      <div ref={containerRef} className={`${props.className} ${normalNodeStyle}`}>
        {props.children}
      </div>
    </>
  )
}
