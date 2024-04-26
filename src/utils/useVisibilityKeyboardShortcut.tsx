import React from "react";

export function useVisibilityKeyboardShortcut() {
  const [isMinimized, setVisibility] = React.useState(false);

  const toggleVisibility = React.useCallback(function toggleVisibility() {
    setVisibility(!isMinimized);

  }, [setVisibility, isMinimized]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/') {
        toggleVisibility();
      } else if (event.key === "Escape") {
        setVisibility(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleVisibility, isMinimized, setVisibility]);

  return {isMinimized, toggleMeemoVisibility: toggleVisibility, setVisibility}
}
