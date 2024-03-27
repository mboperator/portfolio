"use client"
import {Product, Slide} from "@/types";
import {SlideImage as SlidePlaceholder} from "@/components/slideImage";
import React, {useEffect} from "react";
import {useScrollPosition} from "@/components/useScrollPosition";
import {PRODUCTS} from "@/data";
import Image from "next/image";
import {Property} from "csstype";

function SlideDescription(props: { slide: Slide }) {
  return (
    <p key={props.slide.description} className={`sticky pb-7 text-lg text-white`}>
      {props.slide.description}
    </p>
  )
}

function SlideImage(props: { slide: Slide, isVisible: boolean }) {
  return (
    <img
      alt={props.slide.description || 'no-alt'}
      className={`${props.isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity pl-7 object-cover object-${props.slide.imageAnchor || "center"} h-full w-full`} src={props.slide.image} />
  )
}

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
  registerChild: (id: string, child: StickyChild) => {}
})

function calculateChildVisibilityState(children: Map<string, StickyChild>, scrollPosition: number, parentContainerEnd: number) {
  const updatedChildren = new Map();
  const childrenArr = Array.from(children.values());
  const viewportHeight = document.documentElement.clientHeight;
  const viewportBounds = { top: scrollPosition, bottom: viewportHeight + scrollPosition }

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

function StickyContainer(props: any) {
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
        const viewportBounds = { top: scrollPosition, bottom: viewportHeight + scrollPosition }
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
    <StickyContext.Provider value={{ ...state, registerChild }}>
      <div ref={containerRef} {...props} />
    </StickyContext.Provider>
  )
}

function Sticky(props: { id: string, stickyClassName: string, children: any, className: string, debug: boolean }) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { absolutePosition, registerChild, children } = React.useContext(StickyContext);
  useEffect(() => {
    if (containerRef.current) {
      const boundingRect = containerRef.current.getBoundingClientRect();
      const offsetFromTop = boundingRect.top + document.documentElement.scrollTop
      const containerEnd = offsetFromTop + boundingRect.height;

      registerChild(props.id, {
        absolutePosition: offsetFromTop,
        height: boundingRect.height,
        stickyOffset: 0,
      })
    }
  }, [containerRef, absolutePosition]);

  const self = children.get(props.id) || { sticky: false, stickyOffset: 0 };
  const isStuck = self.sticky;
  const stickyOffset = self.stickyOffset
  const stickyStyle = {
    position: 'fixed' as Property.Position,
    top: isStuck ? 0 : -9999,
    transform: isStuck ? `translateY(${stickyOffset}px)` : '',
    right: 0,
    left: 0
  }
  return (
    <>
      <div className={`${props.stickyClassName} relative`} style={stickyStyle}>
        {props.children}

        {props.debug && (<div className="absolute right-0 top-20 bg-amber-300">
          <p>{JSON.stringify(self, null, 2)}</p>
        </div>)}
      </div>

      <div ref={containerRef} className={props.className} style={{ visibility: isStuck ? 'hidden' : 'visible' }}>
        {props.children}
      </div>
    </>
  )
}

export function Portfolio() {
  return (
    <section className="min-h-screen flex flex-col">
      <div>
        {PRODUCTS.map(product => (
          <ProductShowcase key={product.slug} product={product}/>
        ))}
      </div>
    </section>
  );
}

export function SplitLayout(props: any) {
  return (
    <div className="flex flex-row h-lvh">
      <div className="w-1/4 bg-gradient-to-r from-black">
        <Sticky id={props.id} className="px-12 py-7" stickyClassName="px-12 py-7 w-1/4 relative" debug={false}>
          {props.renderMenu()}
        </Sticky>
      </div>

      <div className="min-h-lvh w-3/4">
        {props.renderBody()}
      </div>
    </div>
  )
}


export function ProductShowcase(props: { product: Product }) {
  const { slides = [] } = props.product

  return (
    <StickyContainer className="flex flex-col">
      <SplitLayout
        id="header"
        renderMenu={() => (
          <>
            <h4 className="text-gray-100 mb-3">{props.product.organization.toLowerCase()}</h4>
            <h2 className="text-5xl text-white">{props.product.name.toLowerCase()}</h2>
            <p className="text-lg pt-3 pb-7 text-white">{props.product.description}</p>
          </>
        )}
        renderBody={() =>(
          <SlideImage slide={{ image: props.product.coverImage, imageAnchor: props.product.coverImageAnchor }} isVisible/>
        )}
      />
      {slides.map((slide, index) => (
        <SplitLayout
          key={index}
          id={index}
          renderMenu={() => (
            <SlideDescription key={index} slide={slide} />
          )}
          renderBody={() => (
            <SlidePlaceholder
              key={`${index}--${slide.description}`}
              product={props.product}
              slide={slide}
              onEnterViewport={() => {}}
              onExitViewport={() => {}}
            />
          )}
        />
      ))}
    </StickyContainer>

  );
}
