"use client"
import React from "react";
import {Property} from "csstype";
import {StickyChildPositionState} from "../types";
import { useStickyChildReporting } from "./useStickyChildReporting";
import {StickyContext} from "@/components/sticky";

function getStickyStyle(self: StickyChildPositionState| undefined, enabled: boolean) {
  if (!self) { return {} }
  else if (!enabled) {
    return {
      position: 'fixed' as Property.Position,
      top: -9999,
      transform: '',
      right: 0,
      left: 0,
      width: self.width,
      visibility: 'hidden' as Property.Visibility,
      backgroundColor: 'black'
    }
  }
  return {
    position: 'fixed' as Property.Position,
    top: self.sticky ? 0 : -9999,
    transform: self.sticky ? `translateY(${self.stickyOffset}px)` : '',
    right: 0,
    left: 0,
    width: self.width,
    visibility: self.sticky ? 'visible' : 'hidden' as Property.Visibility,
    backgroundColor: 'black'
  }
}

function getNodeStyle(self: StickyChildPositionState | undefined, enabled: boolean) {
  if (self?.sticky && enabled) {
    return { visibility: 'hidden' as Property.Visibility, opacity: 0 }
  } else {
    return { visibility: 'visible' as Property.Visibility, opacity: 1 }
  }
}

export function StickyChild(props: {
  id: string,
  children: any,
  className?: string,
  debug: boolean
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { enabled } = React.useContext(StickyContext);
  const self = useStickyChildReporting(props.id, containerRef);
  const stickyNodeStyle = getStickyStyle(self, enabled);
  const normalNodeStyle = getNodeStyle(self, enabled);

  return (
    <>
      <div className={`${props.className} relative`} style={stickyNodeStyle}>
        {props.children}

        {props.debug && (<div className="absolute right-0 top-20 bg-amber-300">
          <p>{JSON.stringify(self, null, 2)}</p>
        </div>)}
      </div>

      <div ref={containerRef} className={props.className} style={normalNodeStyle}>
        {props.children}
      </div>
    </>
  )
}
