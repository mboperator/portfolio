import {StickyChild} from "@/components/sticky/types";

export function calculateChildVisibilityState(children: Map<string, StickyChild>, scrollPosition: number, parentContainerEnd: number) {
  const updatedChildren = new Map();
  const childrenArr = Array.from(children.values());
  const viewportHeight = document.documentElement.clientHeight;
  const viewportBounds = {top: scrollPosition, bottom: viewportHeight + scrollPosition}

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
