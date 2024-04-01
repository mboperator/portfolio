import React, {useEffect} from "react";
import { StickyContext } from "../context";

function checkForUpdates(current, next) {
  if (current.sticky == next.sticky && current.stickyOffset === next.stickyOffset) { return false }
  return true;
}

export function useStickyChildReporting(id: string, ref: React.RefObject<HTMLDivElement>) {
  const {registerChild, children} = React.useContext(StickyContext);
  const [self, setSelf] = React.useState({});

  const readFromParent = React.useCallback(() => {
    const updated = checkForUpdates({ ... self }, children.get(id))
    if (updated) {
      setSelf(state => {
        return {
        ... children.get(id)
        }
      })
    }
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

  console.info('rerendered', id);
  return self;
}
