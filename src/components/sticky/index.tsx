"use client"
import React, {useEffect} from "react";
import {Property} from "csstype";
import {StickyContext} from "@/components/sticky/stickyContext";
import { StickyChild } from "./types";

function getStickyStyle(self: StickyChild| undefined) {
  if (!self) { return {} }
  return {
    position: 'fixed' as Property.Position,
      top: self.sticky ? 0 : -9999,
    transform: self.sticky ? `translateY(${self.stickyOffset}px)` : '',
    right: 0,
    left: 0,
    width: self.width,
    visibility: self.sticky ? 'visible' : 'hidden' as Property.Visibility
  }
}

function getNodeStyle(self: StickyChild | undefined) {
  if (self?.sticky) {
    return { visibility: 'hidden' as Property.Visibility, opacity: 0 }
  } else {
    return { visibility: 'visible' as Property.Visibility, opacity: 1 }
  }
}

function useStickyChildReporting(id: string, ref: React.RefObject<HTMLDivElement>) {
  const { registerChild, children} = React.useContext(StickyContext);

  const reportToParent = React.useCallback(function registerWithParent()  {
    if (!ref.current) { return; }
    registerChild(id, ref.current);

  }, [ref.current, registerChild])

  useEffect(() => {
    window.addEventListener('resize', reportToParent);
    reportToParent();
    () => window.removeEventListener('resize', reportToParent);
  }, [reportToParent]);

  return children.get(id);
}

export function Sticky(props: {
  id: string,
  children: any,
  className?: string,
  debug: boolean
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  const self = useStickyChildReporting(props.id, containerRef);
  const stickyNodeStyle = getStickyStyle(self);
  const normalNodeStyle = getNodeStyle(self);

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
