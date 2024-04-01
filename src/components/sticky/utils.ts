import {StickyChild} from "@/components/sticky/types";

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
  const offsetFromTop = containerBoundingRect.top + document.documentElement.scrollTop
  const parentContainerEnd = offsetFromTop + containerBoundingRect.height;

  const updatedChildren = new Map();
  const childrenArr = Array.from(children.values());
  const viewportBounds = getViewportBounds();
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

export function updateChild(children: Map<string, StickyChild>, id: string, params: any) {
  const childToUpdate = children.get(id);
  children.set(id, {
    ...childToUpdate,
    ...params,
  })
  return children;
}
