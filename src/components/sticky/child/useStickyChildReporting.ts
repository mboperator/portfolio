import React, {useEffect} from "react";
import { StickyContext } from "../context";
import { StickyChildPositionState } from "../types";

function checkForUpdates(current: StickyChildPositionState, next: StickyChildPositionState) {
  if (current.sticky == next.sticky && current.stickyOffset === next.stickyOffset) { return false }
  return true;
}

export function useStickyChildReporting(id: string, ref: React.RefObject<HTMLDivElement>) {
  const {registerChild, children} = React.useContext(StickyContext);
  const [self, setSelf] = React.useState<StickyChildPositionState>({

  } as StickyChildPositionState);

  const readFromParent = React.useCallback(() => {
    window.requestAnimationFrame(() => {
      const updated = checkForUpdates({ ... self }, children.get(id) as StickyChildPositionState)
      if (updated) {
        setSelf(state => {
          return {
            ... children.get(id) as StickyChildPositionState
          }
        })
      }
    })
  }, [self, children, setSelf, id])

  const reportToParent = React.useCallback(function registerWithParent() {
    if (!ref.current) {
      return;
    }
    registerChild(id, ref.current);

  }, [ref.current, registerChild])

  useEffect(() => {
    window.addEventListener('resize', reportToParent);
    window.addEventListener('scroll', readFromParent);
    reportToParent();
    readFromParent();
    return () => {
      window.removeEventListener('resize', reportToParent);
      window.removeEventListener('scroll', readFromParent);
    }
  }, [reportToParent, readFromParent]);

  return self;
}
