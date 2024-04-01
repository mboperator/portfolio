import React from "react";
import { StickyChildPositionState } from "../types";
import {getScrollPosition, getViewportBounds} from "../utils";

function calculateChildVisibilityState(parentContainer: HTMLDivElement | null, children: Map<string, StickyChildPositionState>) {
  if (parentContainer === null) {
    return children;
  }
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

function updateChild(children: Map<string, StickyChildPositionState>, id: string, params: any) {
  const childToUpdate = children.get(id);
  children.set(id, {
    ...childToUpdate,
    ...params,
  })
  return children;
}

export function useStickyParent(containerRef: React.RefObject<HTMLDivElement>) {
  const [state, setState] = React.useState({ children: new Map<string, StickyChildPositionState>() });

  const registerChild = React.useCallback(function registerChild(id: string, childNode: HTMLDivElement ) {
    const childBoundingRect = childNode.getBoundingClientRect();
    const offsetFromTop = childBoundingRect.top + document.documentElement.scrollTop

    setState(state => ({
      ...state,
      children: updateChild(state.children, id, {
        absolutePosition: offsetFromTop,
        height: childBoundingRect.height,
        width: childBoundingRect.width,
      })
    }))
  }, [setState])

  const updateChildPositions = React.useCallback(function updateChildPositions() {
    window.requestAnimationFrame(() => {
      if (containerRef.current === null) { return; }
      setState(state => ({
        children: calculateChildVisibilityState(containerRef.current, state.children),
      }))
    })
  }, [containerRef])

  return { registerChild, updateChildPositions, children: state.children }
}
