import { useEffect, useState } from "react";

type CursorMode = "default" | "hover" | "active" | "text" | "drag" | "disabled";

type CursorPosition = {
  x: number;
  y: number;
};

const DRAG_THRESHOLD = 4;

const getInteractiveMode = (target: EventTarget | null): CursorMode => {
  if (!(target instanceof HTMLElement)) {
    return "default";
  }

  const disabledElement = target.closest(
    "button:disabled, input:disabled, textarea:disabled, select:disabled, [aria-disabled='true'], [data-cursor='disabled']",
  );
  if (disabledElement) {
    return "disabled";
  }

  const textElement = target.closest(
    "input:not([type='checkbox']):not([type='radio']):not([type='button']):not([type='submit']):not([type='reset']):not(:disabled), textarea:not(:disabled), [contenteditable='true']",
  );
  if (textElement) {
    return "text";
  }

  const dragElement = target.closest("[draggable='true'], [data-cursor='drag']");
  if (dragElement) {
    return "drag";
  }

  const clickableElement = target.closest(
    "a[href], button:not(:disabled), [role='button'], [data-cursor='hover'], [data-clickable='true']",
  );
  if (clickableElement) {
    return "hover";
  }

  return "default";
};

const NeoCursor = () => {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  });
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [pointerStart, setPointerStart] = useState<CursorPosition | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("neo-cursor-enabled", enabled);

    return () => {
      document.documentElement.classList.remove("neo-cursor-enabled");
    };
  }, [enabled]);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    document.documentElement.classList.toggle("neo-cursor-reduced-motion", reducedMotion.matches);

    const handlePointerCapability = (event: MediaQueryListEvent) => {
      setEnabled(event.matches);
      document.documentElement.classList.toggle("neo-cursor-enabled", event.matches);
    };

    const handleReducedMotion = (event: MediaQueryListEvent) => {
      document.documentElement.classList.toggle("neo-cursor-reduced-motion", event.matches);
    };

    media.addEventListener("change", handlePointerCapability);
    reducedMotion.addEventListener("change", handleReducedMotion);

    return () => {
      media.removeEventListener("change", handlePointerCapability);
      reducedMotion.removeEventListener("change", handleReducedMotion);
      document.documentElement.classList.remove("neo-cursor-reduced-motion");
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const nextPosition = { x: event.clientX, y: event.clientY };
      setPosition(nextPosition);
      setVisible(true);

      if (isPointerDown && pointerStart) {
        const deltaX = Math.abs(nextPosition.x - pointerStart.x);
        const deltaY = Math.abs(nextPosition.y - pointerStart.y);
        if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
          setIsDragging(true);
        }
      }
    };

    const handleMouseOver = (event: MouseEvent) => {
      setMode((current) => (current === "active" ? current : getInteractiveMode(event.target)));
    };

    const handleMouseDown = (event: MouseEvent) => {
      const start = { x: event.clientX, y: event.clientY };
      setIsPointerDown(true);
      setPointerStart(start);
      setIsDragging(false);

      const nextMode = getInteractiveMode(event.target);
      if (nextMode === "disabled") {
        setMode("disabled");
        return;
      }
      if (nextMode === "text") {
        setMode("text");
        return;
      }
      setMode("active");
    };

    const handleMouseUp = (event: MouseEvent) => {
      setIsPointerDown(false);
      setPointerStart(null);
      setIsDragging(false);
      setMode(getInteractiveMode(event.target));
    };

    const handleMouseLeaveWindow = () => {
      setVisible(false);
      setIsPointerDown(false);
      setPointerStart(null);
      setIsDragging(false);
      setMode("default");
    };

    const handleDragStart = () => setIsDragging(true);
    const handleDragEnd = (event: DragEvent) => {
      setIsDragging(false);
      setMode(getInteractiveMode(event.target));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    window.addEventListener("dragstart", handleDragStart);
    window.addEventListener("dragend", handleDragEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      window.removeEventListener("dragstart", handleDragStart);
      window.removeEventListener("dragend", handleDragEnd);
    };
  }, [enabled, isPointerDown, pointerStart]);

  const activeMode: CursorMode = isDragging ? "drag" : mode;

  if (!enabled) {
    return null;
  }

  return (
    <div
      className={`neo-cursor ${visible ? "is-visible" : ""} mode-${activeMode}`}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      aria-hidden="true"
    >
      <div className="neo-cursor__shell">
        <span className="neo-cursor__layer neo-cursor__layer--shadow" />
        <span className="neo-cursor__layer neo-cursor__layer--main" />
        <span className="neo-cursor__tail" />
        <span className="neo-cursor__drag-lines" />
        <span className="neo-cursor__disabled-cross" />
      </div>
    </div>
  );
};

export default NeoCursor;
