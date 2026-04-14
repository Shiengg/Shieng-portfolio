import { useEffect, useRef, useState } from "react";
import { useIsFetching } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const RouteLoadingOverlay = () => {
  const location = useLocation();
  const isFetching = useIsFetching();
  const isFirstRender = useRef(true);
  const previousLocationKey = useRef(location.key);
  const showDelayTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const [isRouteTransitioning, setIsRouteTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (location.key !== previousLocationKey.current) {
      previousLocationKey.current = location.key;
      const startTransitionTimer = window.setTimeout(() => {
        setIsRouteTransitioning(true);
        setProgress(8);
      }, 0);
      return () => window.clearTimeout(startTransitionTimer);
    }
  }, [location.key]);

  useEffect(() => {
    if (!isRouteTransitioning) return;

    if (isFetching > 0) {
      if (showDelayTimerRef.current === null && !isVisible) {
        showDelayTimerRef.current = window.setTimeout(() => {
          setIsVisible(true);
        }, 100);
      }
      return;
    }

    if (showDelayTimerRef.current !== null) {
      window.clearTimeout(showDelayTimerRef.current);
      showDelayTimerRef.current = null;
    }

    if (!isVisible) {
      const resetTransitionTimer = window.setTimeout(() => {
        setIsRouteTransitioning(false);
        setProgress(0);
      }, 0);
      return () => window.clearTimeout(resetTransitionTimer);
    }

    const completeProgressTimer = window.setTimeout(() => {
      setProgress(100);
    }, 0);
    hideTimerRef.current = window.setTimeout(() => {
      setIsVisible(false);
      setIsRouteTransitioning(false);
      setProgress(0);
      hideTimerRef.current = null;
    }, 180);

    return () => {
      window.clearTimeout(completeProgressTimer);
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };
  }, [isFetching, isRouteTransitioning, isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const progressTimer = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return Math.min(prev + Math.floor(Math.random() * 9) + 3, 90);
      });
    }, 120);

    return () => {
      window.clearInterval(progressTimer);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (showDelayTimerRef.current !== null) {
        window.clearTimeout(showDelayTimerRef.current);
      }
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-6"
      style={{ background: "hsl(var(--neon-yellow))" }}
    >
      <div className="w-full max-w-xl">
        <div className="brutal-border brutal-shadow bg-background text-center py-4 mb-6">
          <p className="font-heading font-bold text-3xl md:text-4xl uppercase">Loading...</p>
        </div>

        <div className="brutal-border brutal-shadow bg-background p-2">
          <div className="h-8 md:h-10 brutal-border bg-background overflow-hidden">
            <div
              className="h-full"
              style={{
                width: `${progress}%`,
                background: "hsl(var(--foreground))",
                transition: "width 120ms linear",
              }}
            />
          </div>
        </div>

        <p className="font-mono font-bold text-right mt-2 text-xl">{progress}%</p>
      </div>
    </div>
  );
};

export default RouteLoadingOverlay;
