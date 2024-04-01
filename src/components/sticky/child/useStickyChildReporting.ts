import React, {useEffect} from "react";
import { StickyContext } from "../context";

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
