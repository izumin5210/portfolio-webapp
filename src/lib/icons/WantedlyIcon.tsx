import React, { SVGProps } from "react";

const WantedlyIcon = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(function SpeakerDeckIcon(props, ref) {
  return (
    <svg fill="currentColor" viewBox="0 0 328 328" xmlns="http://www.w3.org/2000/svg" ref={ref} {...props}>
      <circle r="38.98" cy="87.11" cx="289.065" />
      <path d="M131.235 198.93c-2.34-1.52-9-10.45-27.42-54.44-1.15-2.76-2.22-5.14-3.23-7.18l-3.77-9.08-32.28-77.95H-.045l32.29 77.95 32.29 78 29.82 72a2.68 2.68 0 0 0 4.94 0l32.45-77.68a1.34 1.34 0 0 0-.51-1.62zM252.215 198.93c-2.34-1.52-9-10.45-27.42-54.44a125.83 125.83 0 0 0-3.24-7.19l-3.75-9.07-32.29-77.95h-64.58l32.29 77.95 32.29 78 29.82 72a2.68 2.68 0 0 0 4.94 0l32.45-77.67a1.36 1.36 0 0 0-.51-1.63z" />
    </svg>
  );
});

export default WantedlyIcon;
