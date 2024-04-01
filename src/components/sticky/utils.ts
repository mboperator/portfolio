import {StickyChild} from "@/components/sticky/types";
import React, {useEffect} from "react";
import { StickyContext } from "./stickyContext";

export function getScrollPosition() {
  const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop
  return scrollPosition;
}

export function getViewportBounds() {
  const scrollPosition = getScrollPosition();
  const viewportHeight = document.documentElement.clientHeight;
  const viewportBounds = {top: scrollPosition, bottom: viewportHeight + scrollPosition}
  return viewportBounds;
}

export function calculateChildVisibilityState(parentContainer: HTMLDivElement | null, children: Map<string, StickyChild>) {
  if (parentContainer === null) { return children; }
  const scrollPosition = getScrollPosition();
  const containerBoundingRect = parentContainer.getBoundingClientRect();
  const viewportBounds = getViewportBounds();

  const parentContainerStart = containerBoundingRect.top + document.documentElement.scrollTop
  const parentContainerEnd = parentContainerStart + containerBoundingRect.height;

  const childrenArr = Array.from(children.values());
  const totalHeight = childrenArr.reduce((totalHeight, child) => totalHeight += child.height, 0);
  const heightWithStickyElements = parentContainerEnd - totalHeight
  const isScrollingPastParentContainer = (scrollPosition >= heightWithStickyElements);
  const parentContainerOvershoot = (scrollPosition - heightWithStickyElements);

  let accumulatedSiblingHeights = 0;
  const updatedChildren = new Map();
  children.forEach((child, key) => {
    updatedChildren.set(key, {
      ...child,
      sticky: viewportBounds.top + accumulatedSiblingHeights >= (child.absolutePosition),
      stickyOffset: isScrollingPastParentContainer ? -parentContainerOvershoot + accumulatedSiblingHeights : accumulatedSiblingHeights,
    })
    accumulatedSiblingHeights += child.height;
  })

  return updatedChildren
}

export function updateChild(children: Map<string, StickyChild>, id: string, params: any) {
  const childToUpdate = children.get(id);
  children.set(id, {
    ...childToUpdate,
    ...params,
  })
  return children;
}

export function useStickyChildReporting(id: string, ref: React.RefObject<HTMLDivElement>) {
  const {registerChild, children} = React.useContext(StickyContext);

  const reportToParent = React.useCallback(function registerWithParent() {
    if (!ref.current) {
      return;
    }
    registerChild(id, ref.current);

  }, [ref.current, registerChild])

  useEffect(() => {
    window.addEventListener('resize', reportToParent);
    reportToParent();
    () => window.removeEventListener('resize', reportToParent);
  }, [reportToParent]);

  return children.get(id);
}
