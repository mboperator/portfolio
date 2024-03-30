import React, {useEffect} from "react";

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = React.useState(0);

  const handleScroll = React.useCallback(function handleScroll() {
    window.requestAnimationFrame(() => {
      const currentPosition = document.documentElement.scrollTop || document.body.scrollTop
      setScrollPosition(currentPosition)
      console.info('useScrollPosition', currentPosition);
    })
  }, [setScrollPosition])
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  }, []);
  return {scrollPosition}
}
