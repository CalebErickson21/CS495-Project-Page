/// <reference types="vite/client" />

declare module '*.pptx' {
  const src: string
  export default src
}

// Import svgs
declare module "*.svg?react" {
  import * as React from "react";
  const ReactComponent: React.FC<
    React.SVGProps<SVGSVGElement> & { className?: string; title?: string }
  >;
  export default ReactComponent;
}