import useWindowDimensions from "./useWindowDimensions";
import IntrinsicAttributes = React.JSX.IntrinsicAttributes;

export function withBreakpoints<Props>(components: { [key: string]: React.ComponentType<Props>}) {
  return function BreakpointRenderer(props: IntrinsicAttributes & Props) {
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
