import { useEffect, useRef, useState } from "react";

export function useStickyObserver({ joobs }: { joobs: string[] }) {
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        threshold: [1.0],
      }
    );
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [joobs]);

  return { isSticky, setIsSticky, sentinelRef };
}
