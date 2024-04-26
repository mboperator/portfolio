import useWindowDimensions from "@/utils/useWindowDimensions";

export function withBreakpoints(components) {
  return function BreakpointRenderer(props) {
    const { width } = useWindowDimensions();
    let Component = components.default;

    if (width <= 1024) {
      Component = components.md || Component;
      return (<Component {...props} />)
    } else {
      return (<Component {...props} />)
    }
  }
}
