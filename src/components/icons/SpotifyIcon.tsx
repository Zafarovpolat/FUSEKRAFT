import type { SVGProps } from 'react';

export function SpotifyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
      <path d="M7.5 15s1.25-1 3.5-1 4.5 1 4.5 1M8 12s1.5-1 4-1 4 1 4 1M8.5 9s2-1 3.5-1 4.5 1 4.5 1" />
    </svg>
  );
}
