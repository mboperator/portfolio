
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
