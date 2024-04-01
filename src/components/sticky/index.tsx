"use client"
import React, {useEffect} from "react";
import {Property} from "csstype";
import {StickyContext} from "@/components/sticky/stickyContext";

export function Sticky(props: {
  id: string,
  children: any,
  className?: string,
  debug: boolean
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { registerChild, children} = React.useContext(StickyContext);

  const measureSelf = React.useCallback(() => {
    if (!containerRef.current) { return; }
    const boundingRect = containerRef.current.getBoundingClientRect();
    const offsetFromTop = boundingRect.top + document.documentElement.scrollTop

    registerChild(props.id, {
      absolutePosition: offsetFromTop,
      height: boundingRect.height,
      width: boundingRect.width,
    });
  }, [containerRef, registerChild])

  useEffect(() => {
    measureSelf();
    window.addEventListener('resize', measureSelf);
    () => window.removeEventListener('resize', measureSelf);
  }, [measureSelf]);

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
    visibility: isStuck ? 'visible' : 'hidden' as Property.Visibility
  }
  return (
    <>
      <div className={`${props.className} relative`} style={stickyStyle}>
        {props.children}

        {props.debug && (<div className="absolute right-0 top-20 bg-amber-300">
          <p>{JSON.stringify(self, null, 2)}</p>
        </div>)}
      </div>

      <div ref={containerRef} className={props.className} style={{visibility: isStuck ? 'hidden' : 'visible', opacity: isStuck ? 0 : 1 }}>
        {props.children}
      </div>
    </>
  )
}
